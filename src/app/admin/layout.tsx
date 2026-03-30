"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/guests", label: "Guests", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="relative flex min-h-screen bg-paper text-ink">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.10]" />

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-b border-ink/10 flex items-center justify-between px-4 z-40">
        <div>
          <p className="font-serif text-ink text-lg">Vishnu &amp; Surya</p>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-ink/70 hover:text-ink">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-50 w-64 bg-surface/95 backdrop-blur-2xl border-r border-ink/10 flex flex-col py-8 px-4 shadow-[0_20px_60px_rgba(15,18,34,0.08)] transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="mb-10 px-2 flex justify-between items-start">
          <div>
            <p className="font-serif text-ink text-xl">Vishnu &amp; Surya</p>
            <p className="text-ink/50 text-xs mt-1 tracking-widest uppercase">Admin Panel</p>
          </div>
          <button onClick={closeMobileMenu} className="md:hidden p-1 text-ink/50 hover:text-ink -mr-2">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
                ${pathname === href
                  ? "bg-ink text-paper shadow-[0_14px_40px_rgba(15,18,34,0.18)]"
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"}`}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-ink/50 hover:text-rose text-sm transition-colors mt-auto w-full text-left">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 w-full md:w-auto p-4 md:p-8 pt-20 md:pt-8 min-w-0">
        {children}
      </main>
    </div>
  );
}

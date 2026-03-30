"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/guests", label: "Guests", icon: Users },
  // { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <div className="relative flex min-h-screen bg-paper text-ink">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.10]" />
      <aside className="relative w-64 bg-surface/80 backdrop-blur-xl border-r border-ink/10 flex flex-col py-8 px-4 fixed h-full shadow-[0_20px_60px_rgba(15,18,34,0.08)]">
        <div className="mb-10 px-2">
          <p className="font-serif text-ink text-xl">Vishnu &amp; Surya</p>
          <p className="text-ink/50 text-xs mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
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
          className="flex items-center gap-3 px-4 py-3 text-ink/50 hover:text-rose text-sm transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="relative flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Note: Simple hardcoded check for demo purposes
    if (username === "sanu" && password === "wed123") {
      document.cookie = "admin-session=1; path=/";
      toast.success("Welcome back!");
      router.push("/admin");
    } else {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-paper bg-mesh flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface/80 backdrop-blur-xl rounded-2xl p-10 border border-ink/10 shadow-[0_30px_90px_rgba(15,18,34,0.12)]">
        <h1 className="font-serif text-3xl text-ink text-center mb-2">Jismon &amp; Sanu</h1>
        <p className="text-ink/60 text-center text-sm mb-8 tracking-widest uppercase">Admin Login</p>
        <form onSubmit={login} className="space-y-5">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username" required
            className="w-full bg-paper border border-ink/10 rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/60" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required
            className="w-full bg-paper border border-ink/10 rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/60" />
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full bg-gradient-to-b from-gold to-[#b9901f] text-ink py-3 rounded-lg font-medium hover:brightness-105 transition disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

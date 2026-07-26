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
    if (username === "jiya" && password === "wed123") {
      document.cookie = "admin-session=1; path=/";
      toast.success("Welcome back!");
      router.push("/admin");
    } else {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 border border-purple-100 shadow-2xl shadow-purple-900/10">
        <h1 className="font-serif text-3xl text-purple-950 text-center mb-2 font-semibold">Jiya &amp; Jithin</h1>
        <p className="text-purple-800/80 text-center text-xs mb-8 tracking-[0.2em] uppercase font-bold">Admin Login</p>
        <form onSubmit={login} className="space-y-5">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username" required
            className="w-full bg-white border border-purple-200 rounded-xl px-5 py-3 text-purple-950 placeholder:text-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all font-medium" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required
            className="w-full bg-white border border-purple-200 rounded-xl px-5 py-3 text-purple-950 placeholder:text-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all font-medium" />
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:shadow-xl transition disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

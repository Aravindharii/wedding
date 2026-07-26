"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Guest } from "@/lib/types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#D4AF37", "#22c55e", "#ef4444"];

export default function Dashboard() {

  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    getDocs(collection(db, "guests_jiya_jithin")).then(snap =>
      setGuests(snap.docs.map(d => ({ id: d.id, ...d.data() } as Guest)))
    );
  }, []);

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvpStatus === "confirmed").length,
    pending: guests.filter(g => g.rsvpStatus === "pending").length,
    declined: guests.filter(g => g.rsvpStatus === "declined").length,
  };

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Declined", value: stats.declined },
  ];

  const cards = [
    { label: "Total Invited", value: stats.total, color: "border-gold" },
    { label: "Confirmed", value: stats.confirmed, color: "border-green-500" },
    { label: "Pending", value: stats.pending, color: "border-gold/50" },
    { label: "Declined", value: stats.declined, color: "border-rose" },
  ];


  return (
    <div>

      <h1 className="font-serif text-3xl text-ink mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-surface/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-ink/10 shadow-[0_18px_60px_rgba(15,18,34,0.10)] border-l-4 ${c.color}`}>
            <p className="text-ink/60 text-sm">{c.label}</p>
            <p className="font-serif text-4xl text-ink mt-1 tabular-nums">{c.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-surface/80 backdrop-blur rounded-2xl p-6 border border-ink/10 shadow-[0_18px_60px_rgba(15,18,34,0.10)] h-72">
        <p className="text-ink/60 text-sm mb-4">RSVP Breakdown</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
              paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(15,18,34,0.12)", borderRadius: 10, color: "#0f1222" }} />
          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>

  );
}

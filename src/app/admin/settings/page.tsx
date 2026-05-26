"use client";
import { useState } from "react";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SettingsPage() {
  const [config, setConfig] = useState({
    coupleNames: "jismon sanu",
    weddingDate: "2026-04-12",
    venue: "The Grand Ballroom, Kochi",
    venueMapUrl: "https://maps.google.com",
    story: "We met under the stars and fell in love...",
  });

  const save = async () => {
    await setDoc(doc(db, "weddingConfig", "main"), config);
    toast.success("Settings saved!");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl text-ink mb-8">Settings</h1>
      <div className="bg-surface/80 backdrop-blur rounded-2xl p-5 sm:p-8 border border-ink/10 space-y-5 shadow-[0_20px_70px_rgba(15,18,34,0.10)]">
        {[
          { key: "coupleNames", label: "Couple Names" },
          { key: "weddingDate", label: "Wedding Date", type: "date" },
          { key: "venue", label: "Venue" },
          { key: "venueMapUrl", label: "Google Maps URL" },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-ink/60 text-sm mb-2">{f.label}</label>
            <input type={f.type || "text"} value={(config as any)[f.key]}
              onChange={e => setConfig(p => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-paper border border-ink/10 rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-gold/60" />
          </div>
        ))}
        <div>
          <label className="block text-ink/60 text-sm mb-2">Our Story</label>
          <textarea rows={4} value={config.story}
            onChange={e => setConfig(p => ({ ...p, story: e.target.value }))}
            className="w-full bg-paper border border-ink/10 rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-gold/60 resize-none" />
        </div>
        <button onClick={save}
          className="w-full bg-gradient-to-b from-gold to-[#b9901f] text-ink py-3 rounded-xl font-medium hover:brightness-105 transition shadow-[0_14px_40px_rgba(212,175,55,0.22)]">
          Save Settings
        </button>
      </div>
    </div>
  );
}

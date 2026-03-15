"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Guest } from "@/lib/types";
import { toast } from "sonner";
import { Trash2, Plus, Download, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", tableNumber: "" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchGuests = async () => {
    const snap = await getDocs(collection(db, "guests"));
    setGuests(snap.docs.map(d => ({ id: d.id, ...d.data() } as Guest)));
    setLoading(false);
  };

  useEffect(() => { fetchGuests(); }, []);

  const addGuest = async () => {
    if (!form.name.trim()) return toast.error("Name required");

    // Auto-generate URL slug from name
    let baseSlug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;

    // Ensure slug is unique
    let isUnique = false;
    let counter = 1;
    while (!isUnique) {
      const q = query(collection(db, "guests"), where("slug", "==", slug));
      const snap = await getDocs(q);
      if (snap.empty) {
        isUnique = true;
      } else {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    await addDoc(collection(db, "guests"), {
      name: form.name.trim(),
      ...(form.email.trim() ? { email: form.email.trim() } : {}),
      ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
      tableNumber: Number(form.tableNumber) || null,
      slug: slug,
      rsvpStatus: "pending",
      plusOne: false,
      mealPreference: "veg",
      createdAt: serverTimestamp(),
    });
    toast.success("Guest added!");
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", tableNumber: "" });
    fetchGuests();
  };

  const deleteGuest = async (id: string) => {
    await deleteDoc(doc(db, "guests", id));
    toast.success("Guest removed");
    fetchGuests();
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Table", "URL Slug", "RSVP Status"],
      ...guests.map(g => [g.name, g.email || "", g.phone || "", g.tableNumber || "", g.slug, g.rsvpStatus]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv," + encodeURIComponent(csv);
    a.download = "guests.csv";
    a.click();
  };

  const filtered = guests
    .filter(g => filter === "all" || g.rsvpStatus === filter)
    .filter(g => g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.email || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-ink">Guests</h1>
        <div className="flex gap-3">
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-ink/10 text-ink/70 rounded-lg hover:border-gold/60 hover:bg-ink/5 transition">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-gold to-[#b9901f] text-ink rounded-lg text-sm hover:brightness-105 transition shadow-[0_14px_40px_rgba(212,175,55,0.22)]">
            <Plus size={15} /> Add Guest
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="bg-surface border border-ink/10 rounded-lg px-4 py-2 text-ink text-sm flex-1 focus:outline-none focus:border-gold/60" />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="bg-surface border border-ink/10 rounded-lg px-4 py-2 text-ink/80 text-sm focus:outline-none focus:border-gold/60">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="bg-surface/80 backdrop-blur rounded-2xl border border-ink/10 overflow-hidden shadow-[0_20px_70px_rgba(15,18,34,0.10)]">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/10">
            <tr className="text-ink/50 text-left">
              {["Name", "Email", "Invite URL", "Table", "Status", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-ink/50">Loading...</td></tr>
            ) : filtered.map(g => (
              <tr key={g.id} className="border-b border-ink/10 hover:bg-ink/5 transition">
                <td className="px-4 py-3 text-ink">{g.name}</td>
                <td className="px-4 py-3 text-ink/70">{g.email || "—"}</td>
                <td className="px-4 py-3 font-mono text-ink text-xs">
                  <a href={`/${g.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-rose hover:text-ink transition-colors">
                    /{g.slug} <LinkIcon size={12} />
                  </a>
                </td>
                <td className="px-4 py-3 text-ink/70">{g.tableNumber || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${g.rsvpStatus === "confirmed" ? "bg-green-500/15 text-green-700" :
                      g.rsvpStatus === "declined" ? "bg-red-500/15 text-red-700" :
                        "bg-gold/25 text-[#7a5b12]"}`}>
                    {g.rsvpStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteGuest(g.id!)}
                    className="text-ink/40 hover:text-rose transition">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-ink/10 shadow-[0_30px_90px_rgba(15,18,34,0.20)]">
            <h2 className="font-serif text-xl text-ink mb-6">Add Guest</h2>
            <div className="space-y-4">
              {[
                { key: "name", placeholder: "Full Name *" },
                { key: "email", placeholder: "Email (optional)" },
                { key: "phone", placeholder: "Phone (optional)" },
                { key: "tableNumber", placeholder: "Table Number (optional)" },
              ].map(f => (
                <input key={f.key} placeholder={f.placeholder}
                  value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-paper border border-ink/10 rounded-lg px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold/60 text-sm" />
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-ink/10 text-ink/70 text-sm hover:border-gold/60 hover:bg-ink/5 transition">
                Cancel
              </button>
              <button onClick={addGuest}
                className="flex-1 py-2 rounded-lg bg-gradient-to-b from-gold to-[#b9901f] text-ink text-sm hover:brightness-105 transition shadow-[0_14px_40px_rgba(212,175,55,0.22)]">
                Add Guest
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

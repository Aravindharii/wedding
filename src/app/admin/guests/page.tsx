"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Guest } from "@/lib/types";
import { toast } from "sonner";
import { Trash2, Plus, Download, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tableNumber: "",
    inviteType: "both" as "both" | "wedding" | "reception"
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "declined">("all");

  const fetchGuests = async () => {
    const snap = await getDocs(collection(db, "guests"));
    setGuests(snap.docs.map(d => ({ id: d.id, ...d.data() } as Guest)));
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const addGuest = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    // Auto-generate unique slug
    let baseSlug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const q = query(collection(db, "guests"), where("slug", "==", slug));
      const snap = await getDocs(q);
      if (snap.empty) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    await addDoc(collection(db, "guests"), {
      name: form.name.trim(),
      ...(form.email.trim() ? { email: form.email.trim() } : {}),
      ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
      tableNumber: Number(form.tableNumber) || null,
      slug,
      inviteType: form.inviteType,
      rsvpStatus: "pending",
      plusOne: false,
      mealPreference: "veg",
      createdAt: serverTimestamp(),
    });

    setSuccessMessage(`✅ ${form.name} has been added successfully!`);
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", tableNumber: "", inviteType: "both" });
    fetchGuests();
  };

  const deleteGuest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    await deleteDoc(doc(db, "guests", id));
    toast.success("Guest removed");
    fetchGuests();
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Table", "Invite Type", "URL Slug", "RSVP Status"],
      ...guests.map(g => [
        g.name,
        g.email || "",
        g.phone || "",
        g.tableNumber || "",
        g.inviteType || "both",
        g.slug,
        g.rsvpStatus
      ]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv," + encodeURIComponent(csv);
    a.download = "guests.csv";
    a.click();
    toast.success("CSV exported successfully");
  };

  const filteredGuests = guests
    .filter(g => filter === "all" || g.rsvpStatus === filter)
    .filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.email || "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Success Message Banner */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-4xl text-ink">Guests Management</h1>
        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-5 py-2.5 text-sm border border-ink/20 rounded-xl hover:border-gold/50 hover:bg-ink/5 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-b from-gold to-[#b9901f] text-ink font-medium rounded-xl hover:brightness-105 transition shadow-lg"
          >
            <Plus size={16} /> Add New Guest
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="bg-surface border border-ink/10 rounded-xl px-5 py-3 text-ink flex-1 focus:outline-none focus:border-gold/60 placeholder:text-ink/40"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="bg-surface border border-ink/10 rounded-xl px-5 py-3 text-ink/80 focus:outline-none focus:border-gold/60"
        >
          <option value="all">All Guests</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Guests Table */}
      <div className="bg-surface/90 backdrop-blur-xl rounded-3xl border border-ink/10 overflow-hidden shadow-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/10 bg-ink/5">
            <tr className="text-ink/60 text-left">
              {["Name", "Email", "Invite URL", "Type", "Table", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-ink/50">
                  Loading guests...
                </td>
              </tr>
            ) : filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-ink/50">
                  No guests found
                </td>
              </tr>
            ) : (
              filteredGuests.map((g) => (
                <tr key={g.id} className="border-b border-ink/10 hover:bg-ink/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-ink">{g.name}</td>
                  <td className="px-6 py-4 text-ink/70">{g.email || "—"}</td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <a
                      href={`/${g.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-rose hover:text-ink transition-colors group"
                    >
                      /{g.slug}
                      <LinkIcon size={13} className="group-hover:scale-110 transition" />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-ink/70 capitalize">{g.inviteType || "both"}</td>
                  <td className="px-6 py-4 text-ink/70">{g.tableNumber || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                        ${g.rsvpStatus === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : g.rsvpStatus === "declined"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {g.rsvpStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteGuest(g.id!)}
                      className="text-ink/40 hover:text-red-600 transition p-1"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Guest Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/95 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md border border-ink/10"
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Add New Guest</h2>

            <div className="space-y-5">
              <input
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-paper border border-ink/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold"
              />
              <input
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-paper border border-ink/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold"
              />
              <input
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full bg-paper border border-ink/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold"
              />
              <input
                placeholder="Table Number (optional)"
                value={form.tableNumber}
                onChange={(e) => setForm(p => ({ ...p, tableNumber: e.target.value }))}
                className="w-full bg-paper border border-ink/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold"
              />

              <select
                value={form.inviteType}
                onChange={(e) => setForm(p => ({ ...p, inviteType: e.target.value as any }))}
                className="w-full bg-paper border border-ink/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold"
              >
                <option value="both">Both (Wedding + Reception)</option>
                <option value="wedding">Wedding Ceremony Only</option>
                <option value="reception">Reception Only</option>
              </select>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-2xl border border-ink/20 text-ink/70 hover:bg-ink/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={addGuest}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-b from-gold to-[#b9901f] text-ink font-medium hover:brightness-105 transition"
              >
                Add Guest
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
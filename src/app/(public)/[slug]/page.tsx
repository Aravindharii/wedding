"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HeroSection from "@/components/invitation/HeroSection";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import Timeline from "@/components/invitation/Timeline";
import RSVPForm from "@/components/invitation/RSVPForm";

export default function GuestInvitePage() {
  const params = useParams();
  const slugParam = (params as Record<string, string | string[] | undefined>)?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [guestName, setGuestName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug === undefined) return;

    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setGuestName(null);

    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return () => { cancelled = true; };
    }

    getDocs(query(collection(db, "guests_jiya_jithin"), where("slug", "==", slug)))
      .then((snap) => {
        if (cancelled) return;
        if (snap.empty) { setNotFound(true); return; }
        const guest = snap.docs[0]?.data() as { name?: string } | undefined;
        const name = guest?.name?.trim();
        if (!name) { setNotFound(true); return; }
        setGuestName(name);
      })
      .catch(() => { if (!cancelled) setNotFound(true); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-paper flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
          <p className="text-ink/50 text-sm font-sans">Loading your invitation...</p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-paper flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-serif text-ink">Invitation not found</h1>
          <p className="text-ink/60 text-sm font-sans">
            This link may be invalid or expired. Please check the URL or open the main invitation page.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-gold to-[#b9901f] px-4 py-2 text-sm font-medium text-ink hover:brightness-105"
          >
            Go to invitation
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection guestName={guestName ?? undefined} />
      <Timeline />
      <CountdownTimer />
      <RSVPForm guestSlug={slug} guestName={guestName ?? undefined} />
    </main>
  );
}

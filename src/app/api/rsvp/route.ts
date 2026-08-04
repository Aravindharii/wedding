import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const { slug, attending, message } = await req.json();
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing guest slug" }, { status: 400 });
  }

  const snap = await getDocs(query(collection(db, "guests_shahabas_zaira"), where("slug", "==", slug)));
  if (snap.empty) return NextResponse.json({ error: "Guest not found" }, { status: 404 });

  try {
    const guestDoc = snap.docs[0];
    await updateDoc(doc(db, "guests_shahabas_zaira", guestDoc.id), {
      rsvpStatus: attending === "yes" ? "confirmed" : "declined",
      message: message || "",
      rsvpSubmittedAt: serverTimestamp(),
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("RSVP Update Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
  }
}

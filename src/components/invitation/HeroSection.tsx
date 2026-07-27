"use client";

import { motion } from "framer-motion";
import BackgroundSection from "./BackgroundSection";
import CoupleNames from "./CoupleNames";
import EventCard from "./EventCard";

interface HeroSectionProps {
  guestName?: string;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <BackgroundSection>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[92%] md:w-full max-w-3xl mx-auto text-center px-4 md:px-12 py-8 md:py-12 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] my-12 shadow-2xl shadow-purple-900/10 border border-white/50"
      >
        <CoupleNames guestName={guestName} />
        <EventCard />
        <div className="my-8 text-center text-purple-800/80 text-xs md:text-sm font-medium italic">
          Best Compliments from<br />Nithin &amp; Indhu
        </div>
      </motion.div>
    </BackgroundSection>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RECEPTION_DATE = new Date("2026-08-09T18:30:00+05:30");
const NIKAH_DATE = new Date("2026-08-09T11:30:00+05:30");

function getTimeLeft(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

interface CountdownTimerProps {
  desktopBg?: string;
  inviteType?: "wedding" | "both-receptions" | "wedding-reception" | "engagement";
}

export default function CountdownTimer({
  desktopBg = "/bg_islamic.png",
  inviteType = "wedding-reception",
}: CountdownTimerProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  let targetDate = RECEPTION_DATE;
  if (inviteType === "wedding") {
    targetDate = NIKAH_DATE;
  } else {
    // Count down to whichever is sooner and hasn't passed
    targetDate = NIKAH_DATE.getTime() > Date.now() ? NIKAH_DATE : RECEPTION_DATE;
  }

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(targetDate));
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [inviteType]);

  if (!mounted) return <section className="py-32 bg-teal-50" />;

  return (
    <section className="relative py-32 overflow-hidden text-teal-950 min-h-[600px] flex items-center justify-center">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/bg_islamic.png')", filter: "blur(1px)", transform: "scale(1.05)" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url('${desktopBg}')`, filter: "blur(2px)", transform: "scale(1.05)" }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/10 z-0" />

      {/* Soft Vignette */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.40) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 inline-flex flex-col items-center bg-white/70 backdrop-blur-md py-4 md:py-5 px-6 md:px-10 rounded-full shadow-lg border border-white/50"
        >
          <p className="text-teal-800 tracking-[0.4em] text-xs md:text-sm uppercase font-bold">
            Counting Down To The Blessed Day
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Timer Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {Object.entries(time).map(([label, val], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className="relative group"
            >
              <div className="relative flex flex-col items-center justify-center w-28 h-32 md:w-36 md:h-44
                              bg-white/60 backdrop-blur-md border border-teal-200
                              hover:border-teal-400 rounded-3xl overflow-hidden transition-all shadow-lg shadow-teal-900/10">

                <motion.span
                  key={val}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-serif text-6xl md:text-7xl font-semibold tabular-nums text-teal-950 tracking-tighter drop-shadow-sm"
                >
                  {String(val).padStart(2, "0")}
                </motion.span>

                <span className="text-teal-700 text-xs md:text-sm uppercase tracking-[0.25em] mt-3 font-bold">
                  {label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
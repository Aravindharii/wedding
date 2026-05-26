"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-06-14T15:00:00+05:30");
const RECEPTION_DATE = new Date("2026-06-06T18:30:00+05:30");

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
  inviteType?: "wedding" | "both-receptions" | "wedding-reception";
}

export default function CountdownTimer({
  desktopBg = "/sanu3.jpeg",
  inviteType = "both-receptions",
}: CountdownTimerProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  const targetDate = inviteType === "wedding" ? WEDDING_DATE : inviteType === "wedding-reception" ? WEDDING_DATE : RECEPTION_DATE;

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(targetDate));
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [inviteType]);

  if (!mounted) return <section className="py-32 bg-black" />;

  return (
    <section className="relative py-32 overflow-hidden text-white min-h-[600px]">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/sanu3.jpeg')", filter: "grayscale(100%) blur(2px)", transform: "scale(1.05)" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url('${desktopBg}')`, filter: "grayscale(100%) blur(2px)", transform: "scale(1.05)" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 lg:bg-black/65 z-0" />

      {/* Soft Vignette */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-white/90 tracking-[0.4em] text-xs md:text-sm uppercase font-medium">
            Counting Down To The Big Day
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FCEABB]/50 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Timer Cards - Maximum Transparent */}
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
                              bg-transparent backdrop-blur-none border border-white/5
                              hover:border-[#FCEABB]/20 rounded-3xl overflow-hidden transition-all">

                <motion.span
                  key={val}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-serif text-6xl md:text-7xl font-light tabular-nums text-white tracking-tighter drop-shadow-lg"
                >
                  {String(val).padStart(2, "0")}
                </motion.span>

                <span className="text-[#FCEABB]/70 text-xs md:text-sm uppercase tracking-[0.25em] mt-3 font-medium">
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
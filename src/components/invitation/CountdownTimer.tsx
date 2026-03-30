"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-04-28T11:45:00+05:30");

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
  inviteType?: "wedding" | "reception" | "both";
}

export default function CountdownTimer({
  desktopBg = "/timer-desktop.jpg",
  inviteType = "both",
}: CountdownTimerProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  // If "wedding" only, countdown to the wedding date.
  // Otherwise, default to countdown for the reception (the grand public event).
  const targetDate = inviteType === "wedding"
    ? new Date("2026-04-28T11:45:00+05:30")
    : new Date("2026-04-30T18:00:00+05:30");

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(targetDate));
    const t = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return <section className="py-32 bg-black" />;

  return (
    <section className="relative py-32 overflow-hidden text-white">
      {/* Mobile: Portrait 3 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/portrait3.jpeg')" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url('${desktopBg}')` }}
      />

      {/* Dark Tint Vibe Overlay - reduced blur, increased darkness */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-white/90 tracking-[0.4em] text-xs md:text-sm uppercase font-medium">
            Counting Down To The Big Day
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FCEABB]/40 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {Object.entries(time).map(([label, val], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              {/* Dark Tint Timer Cards - reduced massive blur to small blur, heavy dark bg */}
              <div className="relative flex flex-col items-center justify-center w-28 h-32 md:w-36 md:h-44 bg-black/80 backdrop-blur-[4px] rounded-3xl border border-white/10 hover:border-[#FCEABB]/40 transition-all overflow-hidden shadow-2xl">
                <motion.span
                  key={val}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-serif text-6xl md:text-7xl font-light tabular-nums text-[#FFF5E1] drop-shadow-md"
                >
                  {String(val).padStart(2, "0")}
                </motion.span>
                <span className="text-[#FCEABB]/90 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-3 font-medium">
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
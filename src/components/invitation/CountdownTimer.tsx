"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Tuesday | 28 April 2026 11:45 am
const WEDDING_DATE = new Date("2026-04-28T11:45:00+05:30"); // assuming IST timezone

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return <section className="py-24 bg-surface min-h-[400px]" />;

  return (
    <section className="relative py-32 bg-surface text-ink overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Background accents */}
      <div className="absolute inset-0 bg-mesh mix-blend-overlay opacity-60" />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.3]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-coffee-light/20 blur-[150px] rounded-full pointer-events-none origin-center"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none origin-center"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <p className="text-coffee-dark tracking-[0.4em] text-sm md:text-base uppercase font-semibold">
            Counting Down To The Big Day
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {Object.entries(time).map(([label, val], i) => (
            <motion.div key={label}
              initial={{ opacity: 0, scale: 0.8, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
              className="relative group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-[2px] bg-gradient-to-br from-gold/50 via-coffee-light/50 to-gold/50 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 animate-gradient-xy" />
              <div className="absolute -inset-4 bg-gradient-to-b from-gold/20 to-coffee-light/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col items-center justify-center w-28 h-32 md:w-36 md:h-44 glassmorphism rounded-3xl border border-white/50 group-hover:border-gold/40 transition-colors duration-500 overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-150%] rotate-45 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine" />

                <motion.span
                  key={val}
                  initial={{ opacity: 0, y: -15, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="font-serif text-5xl md:text-7xl text-coffee-dark font-semibold tabular-nums mb-2 md:mb-3 drop-shadow-sm pt-2"
                >
                  {String(val).padStart(2, "0")}
                </motion.span>
                <span className="text-coffee-medium text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
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

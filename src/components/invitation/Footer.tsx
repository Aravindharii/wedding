"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-surface text-ink/50 text-center text-sm overflow-hidden py-24 group">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.2]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] w-[200%] md:w-[150%] animate-[shine_4s_linear_infinite_reverse] bg-gradient-to-r from-transparent via-gold/80 to-transparent blur-[1px] opacity-70" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-3xl mx-auto px-4"
      >
        <div className="font-serif text-4xl md:text-5xl text-ink mb-8 tracking-wide drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
          <span className="text-gradient font-semibold">Jiya</span>{" "}
          <span className="text-gold italic mx-2 drop-shadow-md group-hover:rotate-12 inline-block transition-transform duration-500">&amp;</span>{" "}
          <span className="text-gradient font-semibold">Jithin</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-ink/70 mb-12 tracking-[0.25em] uppercase text-[10px] md:text-xs font-semibold">
          <span>August 20, 2026</span>
          <span className="hidden md:inline-block w-[3px] h-[3px] rounded-full bg-mist" />
          <span>Kollam, Kerala</span>
        </div>

        <div className="border-t border-mist/30 pt-10">
          <p className="text-ink/40 italic font-serif text-lg tracking-wide hover:text-gold/60 transition-colors duration-500 cursor-default">
            Designed with immense joy for our most special day
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

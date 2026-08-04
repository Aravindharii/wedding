"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 pt-4 md:pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-in-out ${isScrolled
          ? "bg-white/85 backdrop-blur-2xl px-6 md:px-10 py-3 md:py-4 rounded-full border border-teal-200 shadow-[0_20px_50px_rgba(15,18,34,0.05),0_0_0_1px_rgba(255,255,255,0.8)_inset] w-[98%] md:w-[90%] max-w-4xl"
          : "bg-transparent px-4 md:px-8 py-4 md:py-6 w-full max-w-7xl"
          }`}
      >
        <Link
          href="/"
          className={`font-serif text-2xl md:text-3xl tracking-wider group flex-shrink-0 ${isScrolled ? "text-ink drop-shadow-sm" : "text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            }`}
        >
          <span className={`transition-all duration-500 font-semibold ${isScrolled ? "text-teal-950" : "text-teal-950 drop-shadow-md"}`}>Shahabas</span>
          <span className={`mx-2 text-teal-700 italic font-serif transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-80"}`}>&amp;</span>
          <span className={`transition-all duration-500 font-semibold ${isScrolled ? "text-teal-950" : "text-teal-950 drop-shadow-md"}`}>Zaira</span>
        </Link>

        <div
          className={`flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-500 font-bold ${isScrolled ? "text-teal-900 gap-3 md:gap-8" : "text-teal-900 drop-shadow-md gap-6 md:gap-12"
            }`}
        >
          <a
            href="#schedule"
            className="group relative px-3 py-2 hover:text-teal-700 transition-colors duration-300 rounded-full"
          >
            {isScrolled && (
              <span className="absolute inset-0 bg-teal-100 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
            )}
            <span className="relative z-10 font-bold">Schedule</span>
            {!isScrolled && (
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-teal-500 to-teal-300/50 -translate-x-1/2 group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded-full" />
            )}
          </a>
        </div>
      </motion.nav>
    </div>
  );
}

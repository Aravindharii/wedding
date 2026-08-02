"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  guestName?: string;
  desktopBg?: string;
  inviteType?: "wedding" | "both-receptions" | "wedding-reception" | "engagement";
}

export default function HeroSection({
  guestName,
  desktopBg = "/bg_floral.png",
  inviteType = "wedding",
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWedding = inviteType === "wedding";
  const isEngagement = inviteType === "engagement";
  const isBoth = inviteType === "both-receptions";


  // Preload the mobile portrait image
  useEffect(() => {
    const img = new Image();
    img.src = "/bg_floral.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4 bg-white">
      {/* Mobile Background - Portrait 1 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden transition-opacity duration-400"
        style={{
          backgroundImage: "url('/bg_floral.png')",
          // ADJUST CUSTOM IMAGE SETTINGS BELOW:
          transform: "scale(1.0)", // ZOOM: e.g., "scale(1.1)" for 10% zoom.
          filter: "blur(0px)",     // Keep clean center
          backgroundPosition: "center",
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('${desktopBg}')`,
          // ADJUST CUSTOM IMAGE SETTINGS BELOW:
          transform: "scale(1.0)", // ZOOM
          filter: "blur(2px)",     // BLUR
        }}
      />

      {/* Delicate Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-rose-50/60 z-0 pointer-events-none" />

      {/* Hanging Floral & Bell Garland Overlay */}
      {imageLoaded && (
        <div className="absolute top-0 left-0 w-full flex justify-between md:justify-around px-8 md:px-12 pointer-events-none z-20">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 1.5, type: "spring", bounce: 0.4 }}
              className={`relative flex-col items-center ${i % 2 === 0 ? "h-[120px] md:h-[180px]" : "h-[90px] md:h-[140px]"} ${i === 0 || i === 6 ? 'hidden md:flex' : 'flex'} origin-top`}
            >
              <motion.div
                animate={{ rotate: [-2, 2, -1.5, 1.5, -2] }}
                transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center h-full origin-top"
              >
                {/* The string */}
                <div className="w-[1.5px] h-full bg-gradient-to-b from-amber-300 via-rose-300 to-amber-500 opacity-80" />

                {/* Marigold/Flower knots */}
                <div className="absolute top-[20%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
                <div className="absolute top-[50%] w-3 h-3 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                <div className="absolute top-[80%] w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />

                {/* Golden Bell at bottom */}
                <svg width="28" height="28" viewBox="0 0 24 24" className="absolute -bottom-4 text-amber-500 fill-current drop-shadow-[0_4px_6px_rgba(212,175,55,0.5)]">
                  <path d="M12 2C13.1046 2 14 2.89543 14 4V4.5C17.3137 4.5 20 7.18629 20 10.5V17L22 19V20H2V19L4 17V10.5C4 7.18629 6.68629 4.5 10 4.5V4C10 2.89543 10.8954 2 12 2ZM12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22Z" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading State Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/95 z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: imageLoaded ? 1 : 0.85, scale: imageLoaded ? 1 : 0.98 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-[92%] md:w-full max-w-3xl mx-auto text-center px-4 md:px-12 py-10 md:py-16 flex flex-col items-center bg-white/60 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] my-12 shadow-[0_8px_32px_rgba(194,24,91,0.05)] border border-white/80"
      >
        <div className="py-4 flex flex-col items-center justify-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-rose-800 text-xs md:text-sm tracking-[0.2em] uppercase mb-8 font-semibold leading-relaxed"
          >
            || Sri Ganeshaya Namaha ||<br /><br />
            Cordially invite you and your family on<br />the auspicious occasion of the wedding ceremony of our Elder Son
          </motion.p>
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, duration: 1, type: "spring" }}
            className="font-['var(--font-cursive)',serif] text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl text-rose-900 font-normal tracking-wide drop-shadow-sm whitespace-nowrap"
          >
            Anish. S
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-rose-800/90 text-xs md:text-sm tracking-wide mt-3 mb-2 font-medium uppercase"
          >
            S/o Late Smt. R. Roopavathi & Late Sri P. P. Sekhar
          </motion.p>
          <motion.span
            initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 1.1, type: "spring" }}
            className="font-serif text-3xl md:text-5xl text-rose-400 italic my-6 font-light"
          >
            &amp;
          </motion.span>
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3, duration: 1, type: "spring" }}
            className="font-['var(--font-cursive)',serif] text-[13vw] sm:text-[10vw] md:text-8xl lg:text-9xl text-rose-900 font-normal tracking-wide drop-shadow-sm whitespace-nowrap"
          >
            Revathi. J
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="text-rose-800/90 text-xs md:text-sm tracking-wide mt-3 font-medium uppercase leading-relaxed"
          >
            D/o Smt. Vidyalatha & Sri. Jaykumar. P<br />Medarahalli, Bangalore.
          </motion.p>
        </div>

        {/* Guest Name Section */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
            className="mt-8 md:mt-10 w-full max-w-sm mx-auto text-center relative"
          >
            <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-60" />

            <p
              className="font-serif text-3xl md:text-4xl italic tracking-wide text-rose-950 drop-shadow-sm font-semibold"
            >
              {guestName}
            </p>

            <p className="mt-4 text-rose-700/90 font-medium text-base md:text-lg">
              You are specially invited
            </p>

            <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-60" />
            <div className="absolute inset-0 bg-rose-100/50 blur-3xl rounded-full -z-10" />
          </motion.div>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-1 my-8 md:my-10 opacity-70">
          <span className="text-rose-300 text-[10px]">◈</span>
          <span className="text-rose-400 text-xs animate-pulse">◈</span>
          <span className="text-rose-300 text-[10px]">◈</span>
        </div>

        {/* Date and Time */}
        <div className="mb-8 w-full flex flex-col items-center">
          <p className="text-rose-900 text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-bold text-center leading-loose">
            We invite you to celebrate our love<br />and the beautiful beginning<br />of our forever together
          </p>

        </div>

        <div className="my-8 text-center text-rose-800/70 text-xs md:text-sm font-medium italic">
          Blessings from<br />Smt S. Manjula and Sri S. Shashikumar<br />Prakashnagar, Bengaluru
        </div>
      </motion.div >
    </section >
  );
}
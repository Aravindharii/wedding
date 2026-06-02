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
  desktopBg = "/sanu1.jpeg",
  inviteType = "both-receptions",
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWedding = inviteType === "wedding";
  const isEngagement = inviteType === "engagement";
  const isBoth = inviteType === "both-receptions";


  // Preload the mobile portrait image
  useEffect(() => {
    const img = new Image();
    img.src = "/sanu1.jpeg";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4 bg-black">
      {/* Mobile Background - Portrait 1 */}
      <div
        className="absolute inset-0 bg-cover bg-[position:300%_center] bg-no-repeat lg:hidden transition-opacity duration-400"
        style={{
          backgroundImage: "url('/sanu1.jpeg')",
          opacity: imageLoaded ? 1 : 0.6,
          // ADJUST CUSTOM IMAGE SETTINGS BELOW:
          transform: "scale(1.0)", // ZOOM: e.g., "scale(1.1)" for 10% zoom. (Using scale + bg-cover ensures no unfilled spaces)
          filter: "grayscale(100%) blur(2px)",     // BLUR: e.g., "blur(2px)"
          backgroundPosition: "47% 60%",   // FOCUS AREA: 100% Left-to-Right (Right side), 50% Top-to-Bottom (Center)
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('${desktopBg}')`,
          // ADJUST CUSTOM IMAGE SETTINGS BELOW:
          transform: "scale(1.1)", // ZOOM
          filter: "grayscale(100%) blur(2px)",     // BLUR
        }}
      />

      {/* Dark Overlay - ADJUST DARKNESS BY CHANGING OPACITY BELOW */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-black"
        style={{ opacity: 0.60 }} // DARKNESS: adjust from 0.0 (none) to 1.0 (pitch black)
      />

      {/* Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/75 z-0 pointer-events-none" />

      {/* Loading State Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FCEABB]/30 border-t-[#FCEABB] rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content - Only fully visible after image loads */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.85 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl mx-auto text-center px-4 md:px-8 pb-16 pt-12 flex flex-col items-center"
      >
        <div className="py-8 flex flex-col items-center justify-center w-full">
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-[#FFF5E1] font-normal tracking-wide drop-shadow-2xl">
            Jismon
          </h1>
          <span className="font-serif text-3xl md:text-5xl text-[#FCEABB]/80 italic my-6 font-light">
            &amp;
          </span>
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-[#FFF5E1] font-normal tracking-wide drop-shadow-2xl">
            Sanu
          </h1>
        </div>

        {/* Guest Name Section */}
        {guestName && (
          <div className="mt-12 md:mt-16 w-full max-w-sm mx-auto text-center relative">
            <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-[#FCEABB] to-transparent opacity-60" />

            {/* <p className="text-xs uppercase tracking-[0.4em] text-[#FCEABB]/90 mb-3 font-medium">
              Exclusive Invitation For
            </p> */}

            <p
              className="font-serif text-3xl md:text-4xl italic tracking-wide text-[#FCEABB]"
              style={{
                textShadow: `
                  0 0 8px rgba(252, 234, 187, 0.5),
                  0 0 15px rgba(252, 234, 187, 0.25),
                  0 2px 4px rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              {guestName}
            </p>

            <p className="mt-4 text-[#FCEABB]/80 font-light text-base md:text-lg">
              You are specially invited
            </p>

            <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#FCEABB] to-transparent opacity-60" />

            <div className="absolute inset-0 bg-[#FCEABB]/5 blur-3xl opacity-30 rounded-full -z-10" />
          </div>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-1 my-16 md:my-20 opacity-60">
          <span className="text-[#FCEABB]/50 text-[10px]">◈</span>
          <span className="text-[#FCEABB]/50 text-xs">◈</span>
          <span className="text-[#FCEABB]/50 text-[10px]">◈</span>
        </div>

        {/* Date and Time */}
        <div className="mb-14 flex flex-col items-center">
          <p className="text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase mb-6 font-medium">
            Join Us On
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <div className="text-right">
              <p className="text-white/90 text-sm md:text-base tracking-widest uppercase mb-1 font-light">
                {isEngagement || isBoth ? "Saturday" : "Sunday"}
              </p>
              <p className="text-white/90 text-xs md:text-sm tracking-widest uppercase font-medium">JUN</p>
            </div>
            <div className="w-[1px] h-14 bg-[#FCEABB]/30" />
            <div className="text-6xl md:text-7xl text-[#FFF5E1] font-light font-serif tracking-tight drop-shadow-xl">
              {isEngagement || isBoth ? "06" : "14"}
            </div>
            <div className="w-[1px] h-14 bg-[#FCEABB]/30" />
            <div className="text-left">
              <p className="text-white/90 text-sm md:text-base tracking-widest mb-1 font-light">2026</p>
              <p className="text-white/90 text-xs md:text-sm tracking-widest uppercase font-medium">Kerala</p>
            </div>
          </div>
          <p className="text-[#FCEABB]/90 mt-8 text-sm md:text-base tracking-[0.15em] font-light">
            {isWedding ? "03:00 PM" : isEngagement ? "04:00 PM" : "06:30 PM"}
          </p>
        </div>

        {/* Venue */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Venue
          </p>
          <p className="text-white/95 text-xl md:text-2xl font-serif mb-3 tracking-wide drop-shadow-md">
            {isWedding ? "St Lawrence Church" : isEngagement ? "St Mary's Forane Church" : isBoth ? "Sion Auditorium (Parish Hall)" : "Green Nest Resort"}
          </p>
          <p className="text-white/75 text-sm md:text-base font-light tracking-wide leading-relaxed">
            {isWedding ? (
              <>Palluruthy, Kerala</>
            ) : isEngagement || isBoth ? (
              <>Tripunithura, Kerala</>
            ) : (
              <>Kallanchery, North Kumbalangi<br />Kerala</>
            )}
          </p>
          <a
            href={isWedding
              ? "https://maps.google.com/?q=St+Lawrence+Church+Palluruthy"
              : isEngagement ? "https://maps.google.com/?q=St+Marys+Forane+Church+Tripunithura" : isBoth ? "https://maps.google.com/?q=Sion+Auditorium+Tripunithura" : "https://maps.google.com/?q=Green+Nest+Resort+Kumbalangi"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-[#FCEABB]/80 hover:text-[#FFF5E1] transition-colors text-xs tracking-[0.2em] uppercase border-b border-[#FCEABB]/30 hover:border-[#FFF5E1]/60 pb-1"
          >
            Get Directions ↗
          </a>
        </div>

        {/* Additional Info for Both */}
        {inviteType === "both-receptions" && (
          <div className="space-y-10 text-sm md:text-base font-light w-full max-w-lg mx-auto border-t border-white/10 pt-12">
            <div className="space-y-2">
              <p className="text-white/90 text-xs tracking-widest uppercase mb-3 font-medium">Engagement solemnized on</p>
              <p className="text-white/85 tracking-wide">Saturday, 6th June 2026</p>
              <p className="text-white/70">at St Mary's Forane Church,</p>
              <p className="text-white/70">Tripunithura, Kerala</p>
              <a
                href="https://maps.google.com/?q=St+Marys+Forane+Church+Tripunithura"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#FCEABB]/80 hover:text-[#FFF5E1] transition-colors text-[10px] tracking-[0.15em] uppercase border-b border-[#FCEABB]/30 hover:border-[#FFF5E1]/60 pb-0.5"
              >
                Get Directions ↗
              </a>
            </div>
            <div className="space-y-2 pt-6 border-t border-white/5">
              <p className="text-white/60 italic mb-5 font-serif text-lg">and for dinner thereafter</p>
              <p className="text-white/90 text-xs tracking-widest uppercase mb-3 font-medium">Wedding solemnized on</p>
              <p className="text-white/85 tracking-wide">Sunday, 14th June 2026</p>
              <p className="text-white/70">at St Lawrence Church,</p>
              <p className="text-white/70">Palluruthy, Kerala</p>
              <a
                href="https://maps.google.com/?q=St+Lawrence+Church+Palluruthy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#FCEABB]/80 hover:text-[#FFF5E1] transition-colors text-[10px] tracking-[0.15em] uppercase border-b border-[#FCEABB]/30 hover:border-[#FFF5E1]/60 pb-0.5"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
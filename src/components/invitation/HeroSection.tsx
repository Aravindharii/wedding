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
  desktopBg = "/bg_lavender.png",
  inviteType = "both-receptions",
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWedding = inviteType === "wedding";
  const isEngagement = inviteType === "engagement";
  const isBoth = inviteType === "both-receptions";


  // Preload the mobile portrait image
  useEffect(() => {
    const img = new Image();
    img.src = "/bg_lavender.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4 bg-white">
      {/* Mobile Background - Portrait 1 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden transition-opacity duration-400"
        style={{
          backgroundImage: "url('/bg_lavender.png')",
          // ADJUST CUSTOM IMAGE SETTINGS BELOW:
          transform: "scale(1.0)", // ZOOM: e.g., "scale(1.1)" for 10% zoom. (Using scale + bg-cover ensures no unfilled spaces)
          filter: "blur(1px)",     // BLUR: e.g., "blur(2px)"
          backgroundPosition: "47% 60%",   // FOCUS AREA: 100% Left-to-Right (Right side), 50% Top-to-Bottom (Center)
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

      {/* Light Overlay for Readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-white/20"
      />

      {/* Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-purple-100/40 z-0 pointer-events-none" />

      {/* Loading State Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content - Only fully visible after image loads */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.85 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[92%] md:w-full max-w-3xl mx-auto text-center px-4 md:px-12 py-8 md:py-12 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] my-12 shadow-2xl shadow-purple-900/10 border border-white/50"
      >
        <div className="py-4 flex flex-col items-center justify-center w-full">
          <p className="text-purple-800 text-xs md:text-sm tracking-[0.2em] uppercase mb-8 font-bold leading-relaxed">
            Together with their families,<br />you are joyfully invited to the<br />
            {isBoth && "Engagement & Wedding of"}
            {isEngagement && "Engagement of"}
            {isWedding && "Wedding of"}
          </p>
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-purple-950 font-normal tracking-wide drop-shadow-sm">
            Jiya
          </h1>
          {/* <p className="text-purple-900/80 text-xs md:text-sm tracking-wide mt-3 mb-2 font-semibold">
            D/o Mr. Thomaskutty P C & Mrs. Lissy Thomas
          </p> */}
          <span className="font-serif text-3xl md:text-5xl text-amber-600/80 italic my-4 font-light">
            &amp;
          </span>
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-purple-950 font-normal tracking-wide drop-shadow-sm">
            Jithin
          </h1>
          {/* <p className="text-purple-900/80 text-xs md:text-sm tracking-wide mt-3 font-semibold">
            S/o Mr. John Ghee Varghese & Mrs. Gracy Varghese
          </p> */}
        </div>

        {/* Guest Name Section */}
        {guestName && (
          <div className="mt-8 md:mt-10 w-full max-w-sm mx-auto text-center relative">
            <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60" />

            <p
              className="font-serif text-3xl md:text-4xl italic tracking-wide text-purple-900 font-semibold"
            >
              {guestName}
            </p>

            <p className="mt-4 text-purple-800/90 font-medium text-base md:text-lg">
              You are specially invited
            </p>

            <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60" />
            <div className="absolute inset-0 bg-purple-200/20 blur-3xl rounded-full -z-10" />
          </div>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-1 my-8 md:my-10">
          <span className="text-purple-300 text-[10px]">◈</span>
          <span className="text-amber-500 text-xs">◈</span>
          <span className="text-purple-300 text-[10px]">◈</span>
        </div>

        {/* Date and Time */}
        <div className="mb-8 w-full flex flex-col items-center">
          <p className="text-purple-900 text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-bold text-center">
            We invite you to celebrate our love<br />and the beautiful beginning<br />of our forever together
          </p>

          <div className="flex flex-col gap-12 w-full max-w-lg items-center justify-center relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-300 via-amber-300 to-purple-300 -translate-x-1/2 hidden md:block opacity-50" />

            {/* Engagement */}
            {(isBoth || isEngagement) && (
              <div className="bg-white/80 backdrop-blur-md border border-purple-200 rounded-3xl p-6 md:p-8 w-full shadow-lg shadow-purple-900/5 relative z-10 flex flex-col items-center">
                <p className="text-purple-800 text-xs tracking-widest uppercase mb-6 font-black">Engagement</p>
                <div className="flex items-center justify-center gap-4 md:gap-10">
                  <div className="text-right">
                    <p className="text-purple-950 text-sm md:text-base tracking-widest uppercase mb-1 font-bold">Tuesday</p>
                    <p className="text-purple-900 text-xs md:text-sm tracking-widest uppercase font-bold">AUG</p>
                  </div>
                  <div className="w-[1px] h-12 bg-purple-300" />
                  <div className="text-6xl text-purple-950 font-light font-serif tracking-tight drop-shadow-sm">18</div>
                  <div className="w-[1px] h-12 bg-purple-300" />
                  <div className="text-left">
                    <p className="text-purple-950 text-sm md:text-base tracking-widest mb-1 font-bold">2026</p>
                    <p className="text-purple-900 text-xs md:text-sm tracking-widest uppercase font-bold">11:00 AM</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-purple-200/50 w-full flex flex-col items-center">
                  <p className="text-purple-950 text-lg md:text-xl font-serif mb-2 font-semibold">Bethel Hall</p>
                  <p className="text-purple-800 text-xs md:text-sm font-medium leading-relaxed text-center">
                    St Mary's Church, Thessery,<br />Perambra, Chalakudy.
                  </p>
                </div>
              </div>
            )}

            {/* Wedding */}
{(isBoth || isWedding) && (
  <div className="bg-white/80 backdrop-blur-md border border-purple-200 rounded-3xl p-6 md:p-8 w-full shadow-lg shadow-purple-300/10 relative z-10 flex flex-col items-center">
    <p className="text-purple-800 text-xs tracking-widest uppercase mb-6 font-black italic">
      By the grace of God will be solemnized,
      <br />
      Our Marriage on
    </p>

    <div className="flex items-center justify-center gap-4 md:gap-10">
      <div className="text-right">
        <p className="text-purple-700 text-sm md:text-base tracking-widest uppercase mb-1 font-bold">
          Thursday
        </p>
        <p className="text-purple-500 text-xs md:text-sm tracking-widest uppercase font-bold">
          AUG
        </p>
      </div>

      <div className="w-[1px] h-12 bg-purple-200" />

      <div className="text-6xl text-purple-600 font-light font-serif tracking-tight drop-shadow-sm">
        20
      </div>

      <div className="w-[1px] h-12 bg-purple-200" />

      <div className="text-left">
        <p className="text-purple-700 text-sm md:text-base tracking-widest mb-1 font-bold">
          2026
        </p>
        <p className="text-purple-500 text-xs md:text-sm tracking-widest uppercase font-bold">
          10:30 AM
        </p>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-purple-200/60 w-full flex flex-col items-center">
      <p className="text-purple-800 text-lg md:text-xl font-serif mb-2 font-semibold">
        The CSI Convention Centre
      </p>
      <p className="text-purple-700/80 text-xs md:text-sm font-medium leading-relaxed text-center">
        Q S Road, Chinnakkada,
        <br />
        Kollam.
      </p>
    </div>
  </div>
)}
          </div>
        </div>

        <div className="my-8 text-center text-purple-800/80 text-xs md:text-sm font-medium italic">
          Best Compliments from<br />Jeena & Family, Jissa & Family
        </div>
      </motion.div>
    </section>
  );
}

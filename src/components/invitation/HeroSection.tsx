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
  desktopBg = "/bg_islamic.png",
  inviteType = "wedding-reception",
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isNikah = inviteType === "wedding";
  const isReception = inviteType === "wedding-reception";
  const isBoth = inviteType === "both-receptions";

  // Preload the mobile portrait image
  useEffect(() => {
    const img = new Image();
    img.src = "/bg_islamic.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4 bg-white">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden transition-opacity duration-400"
        style={{
          backgroundImage: "url('/bg_islamic.png')",
          transform: "scale(1.0)",
          filter: "blur(1px)",
          backgroundPosition: "47% 60%",
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('${desktopBg}')`,
          transform: "scale(1.0)",
          filter: "blur(2px)",
        }}
      />

      {/* Light Overlay for Readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-white/20" />

      {/* Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/30 via-transparent to-teal-100/40 z-0 pointer-events-none" />

      {/* Loading State Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-300 border-t-teal-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.85 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[92%] md:w-full max-w-3xl mx-auto text-center px-4 md:px-12 py-8 md:py-12 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] my-12 shadow-2xl shadow-teal-900/10 border border-white/50"
      >
        <div className="py-4 flex flex-col items-center justify-center w-full">

          {/* Arabic Greeting */}
          <p className="font-serif text-3xl md:text-4xl text-teal-800 mb-2" style={{ fontFamily: "serif", direction: "rtl" }}>
            السلام عليكم
          </p>
          <p className="text-teal-700 text-[11px] md:text-xs tracking-wide italic mb-6 font-medium">
            &ldquo;In the name of Allah, the most beneficent, the most merciful&rdquo;
          </p>

          {/* Hosts */}
          <p className="text-teal-900 text-xs md:text-sm font-bold mb-1">
            Shamsudheen P.H. &amp; Shameela Shamsudheen
          </p>
          <p className="text-teal-700 text-[11px] md:text-xs mb-4 font-medium">
            Pattana Parambu, Nettoor
          </p>
          <p className="text-teal-800/80 text-[11px] md:text-xs tracking-wide leading-relaxed mb-6 max-w-sm">
            Delighted to have your esteemed presence and mindful blessings on the very
            auspicious occasion of the joyous wedding reception ceremony honouring our
            beloved son.
          </p>

          {/* Groom */}
          <h1 className="font-['var(--font-cursive)',serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-teal-950 font-normal tracking-wide drop-shadow-sm leading-tight break-words w-full">
            Shahabas Shamsudheen
          </h1>
          <p className="text-teal-800/80 text-[11px] md:text-xs tracking-wide mt-3 mb-1 font-medium leading-relaxed">
            Grand S/o. (Late) N.A. Hydrose &amp; Fathima Hydrose
          </p>
          <p className="text-teal-800/80 text-[11px] md:text-xs tracking-wide mb-5 font-medium leading-relaxed">
            (Late) K.B. Mohammed &amp; Suhara Beevi Mohammed
          </p>

          <span className="font-serif text-3xl md:text-5xl text-amber-600/80 italic my-3 font-light">
            &amp;
          </span>

          {/* Bride */}
          <h1 className="font-['var(--font-cursive)',serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-teal-950 font-normal tracking-wide drop-shadow-sm leading-tight break-words w-full">
            Zaira Zainudheen
          </h1>
          <p className="text-teal-800/80 text-[11px] md:text-xs tracking-wide mt-3 mb-1 font-medium leading-relaxed">
            D/o. Mr. Zainudheen P.K. &amp; Mrs. Hazeena Zainudheen
          </p>
          <p className="text-teal-800/80 text-[11px] md:text-xs tracking-wide mb-6 font-medium leading-relaxed">
            Parana House, Chullickal, Kochi
          </p>

          {/* Insha Allah */}
          <p className="font-serif text-xl md:text-2xl text-teal-700 italic mb-2">
            Insha Allah
          </p>
        </div>

        {/* Guest Name Section */}
        {guestName && (
          <div className="mt-8 md:mt-10 w-full max-w-sm mx-auto text-center relative">
            <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-teal-300 to-transparent opacity-60" />

            <p className="font-serif text-3xl md:text-4xl italic tracking-wide text-teal-900 font-semibold">
              {guestName}
            </p>

            <p className="mt-4 text-teal-800/90 font-medium text-base md:text-lg">
              You are specially invited
            </p>

            <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-teal-300 to-transparent opacity-60" />
            <div className="absolute inset-0 bg-teal-200/20 blur-3xl rounded-full -z-10" />
          </div>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-1 my-8 md:my-10">
          <span className="text-teal-300 text-[10px]">◈</span>
          <span className="text-amber-500 text-xs">◈</span>
          <span className="text-teal-300 text-[10px]">◈</span>
        </div>

        {/* Event Details */}
        <div className="mb-8 w-full flex flex-col items-center">
          <p className="text-teal-900 text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-bold text-center">
            Wedding Reception
          </p>

          <div className="flex flex-col gap-8 w-full max-w-lg items-center justify-center relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-300 via-amber-300 to-teal-300 -translate-x-1/2 hidden md:block opacity-50" />

            {/* Nikah */}
            {(isBoth || isNikah || isReception) && (
              <div className="bg-white/80 backdrop-blur-md border border-teal-200 rounded-3xl p-6 md:p-8 w-full shadow-lg shadow-teal-900/5 relative z-10 flex flex-col items-center">
                <p className="text-teal-800 text-xs tracking-widest uppercase mb-6 font-black">Nikah</p>
                <div className="flex items-center justify-center gap-4 md:gap-10">
                  <div className="text-right">
                    <p className="text-teal-950 text-sm md:text-base tracking-widest uppercase mb-1 font-bold">Sunday</p>
                    <p className="text-teal-900 text-xs md:text-sm tracking-widest uppercase font-bold">AUG</p>
                  </div>
                  <div className="w-[1px] h-12 bg-teal-300" />
                  <div className="text-6xl text-teal-950 font-light font-serif tracking-tight drop-shadow-sm">9</div>
                  <div className="w-[1px] h-12 bg-teal-300" />
                  <div className="text-left">
                    <p className="text-teal-950 text-sm md:text-base tracking-widest mb-1 font-bold">2026</p>
                    <p className="text-teal-900 text-xs md:text-sm tracking-widest uppercase font-bold">11:30 AM</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-teal-200/50 w-full flex flex-col items-center">
                  <p className="text-teal-950 text-lg md:text-xl font-serif mb-2 font-semibold">Town Hall, Mattancherry</p>
                </div>
              </div>
            )}

            {/* Wedding Reception */}
            {(isBoth || isReception) && (
              <div className="bg-white/80 backdrop-blur-md border border-teal-200 rounded-3xl p-6 md:p-8 w-full shadow-lg shadow-teal-300/10 relative z-10 flex flex-col items-center">
                <p className="text-teal-800 text-xs tracking-widest uppercase mb-6 font-black italic">
                  Wedding Reception
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-10">
                  <div className="text-right">
                    <p className="text-teal-700 text-sm md:text-base tracking-widest uppercase mb-1 font-bold">Sunday</p>
                    <p className="text-teal-500 text-xs md:text-sm tracking-widest uppercase font-bold">AUG</p>
                  </div>

                  <div className="w-[1px] h-12 bg-teal-200" />
                  <div className="text-6xl text-teal-600 font-light font-serif tracking-tight drop-shadow-sm">9</div>
                  <div className="w-[1px] h-12 bg-teal-200" />

                  <div className="text-left">
                    <p className="text-teal-700 text-sm md:text-base tracking-widest mb-1 font-bold">2026</p>
                    <p className="text-teal-500 text-xs md:text-sm tracking-widest uppercase font-bold">6:30 PM</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-teal-200/60 w-full flex flex-col items-center">
                  <p className="text-teal-800 text-lg md:text-xl font-serif mb-2 font-semibold">
                    Nettoor Mahallu Auditorium
                  </p>
                  <p className="text-teal-700/80 text-xs md:text-sm font-medium leading-relaxed text-center">
                    Nettoor
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Best Compliments */}
        <div className="my-8 text-center text-teal-800/80 text-xs md:text-sm font-medium italic">
          With Best Compliments from<br />
          Nazeer P.H., Shahafan Shamsudheen &amp; Shaheen Shamsudheen<br />
          <span className="not-italic font-semibold text-teal-900">Ph: 8547922272, 7012189990</span>
        </div>
      </motion.div>
    </section>
  );
}

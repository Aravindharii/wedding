"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  guestName?: string;
  desktopBg?: string;
  inviteType?: "wedding" | "reception" | "both";
}

export default function HeroSection({
  guestName,
  desktopBg = "/back1.jpeg",
  inviteType = "both",
}: HeroSectionProps) {
  const isWedding = inviteType === "wedding";
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-[position:35%_center] bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/portrait1.jpeg')" }}
      />

      {/* Desktop Background Layers */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block opacity-40 blur-3xl scale-110"
        style={{ backgroundImage: `url('${desktopBg}')` }}
      />
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url('${desktopBg}')` }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />

      {/* Foreground Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, type: "spring", damping: 28 }}
        className="relative z-10 w-full max-w-3xl mx-auto text-center px-4 md:px-8 pb-16 pt-12 flex flex-col items-center"
      >
        {/* Names */}
        <div className="py-8 flex flex-col items-center justify-center w-full">
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-[#FFF5E1] font-normal tracking-wide drop-shadow-2xl">
            Vishnu
          </h1>
          <span className="font-serif text-3xl md:text-5xl text-[#FCEABB]/80 italic my-6 font-light">
            &amp;
          </span>
          <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-[#FFF5E1] font-normal tracking-wide drop-shadow-2xl">
            Surya
          </h1>
        </div>

        {/* Guest Name Section */}
        {guestName && (
          <div className="mt-20 pt-10 w-full max-w-sm mx-auto text-center relative">
            <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-[#FCEABB] to-transparent opacity-60" />

            <p className="text-xs uppercase tracking-[0.4em] text-[#FCEABB]/90 mb-3 font-medium">
              Exclusive Invitation
            </p>

            {/* Guest Name with very slight glow */}
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

            {/* Very subtle background glow layer */}
            <div className="absolute inset-0 bg-[#FCEABB]/5 blur-3xl opacity-30 rounded-full -z-10" />
          </div>
        )}

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-1 mb-12 opacity-60">
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
                {isWedding ? "Tuesday" : "Thursday"}
              </p>
              <p className="text-white/90 text-xs md:text-sm tracking-widest uppercase font-medium">APR</p>
            </div>
            <div className="w-[1px] h-14 bg-[#FCEABB]/30" />
            <div className="text-6xl md:text-7xl text-[#FFF5E1] font-light font-serif tracking-tight drop-shadow-xl">
              {isWedding ? "28" : "30"}
            </div>
            <div className="w-[1px] h-14 bg-[#FCEABB]/30" />
            <div className="text-left">
              <p className="text-white/90 text-sm md:text-base tracking-widest mb-1 font-light">2026</p>
              <p className="text-white/90 text-xs md:text-sm tracking-widest uppercase font-medium">Kerala</p>
            </div>
          </div>
          <p className="text-[#FCEABB]/90 mt-8 text-sm md:text-base tracking-[0.15em] font-light">
            {isWedding ? "11:45 AM – 12:10 PM" : "06:00 PM – 09:30 PM"}
          </p>
        </div>

        {/* Venue */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Venue
          </p>
          <p className="text-white/95 text-xl md:text-2xl font-serif mb-3 tracking-wide drop-shadow-md">
            {isWedding ? "Srinikethan Auditorium" : "Shoba Auditorium"}
          </p>
          <p className="text-white/75 text-sm md:text-base font-light tracking-wide leading-relaxed">
            {isWedding ? (
              <>Karukachal Manimala Rd,<br />Karukachal, Kerala</>
            ) : (
              <>Thiruvankulam - Chottanikkara Rd,<br />Tripunithura, Kerala</>
            )}
          </p>
          <a
            href={isWedding ? "https://share.google/govYaRqQc09cvuAoL" : "https://share.google/6hGeEEN8z4F4He5JK"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-[#FCEABB]/80 hover:text-[#FFF5E1] transition-colors text-[10px] md:text-xs tracking-[0.2em] uppercase border-b border-[#FCEABB]/30 hover:border-[#FFF5E1]/60 pb-1"
          >
            Get Directions ↗
          </a>
        </div>

        {/* Other Wedding Info */}
        <div className="space-y-10 text-sm md:text-base font-light w-full max-w-lg mx-auto border-t border-white/10 pt-12">
          {inviteType === "both" && (
            <div className="space-y-2">
              <p className="text-white/60 italic mb-5 font-serif text-lg">and for dinner thereafter</p>
              <p className="text-white/90 text-xs tracking-widest uppercase mb-3 font-medium">Wedding solemnized on</p>
              <p className="text-white/85 tracking-wide">Tuesday, 28th April 2026</p>
              <p className="text-white/70">at Srinikethan Auditorium,</p>
              <p className="text-white/70">Karukachal, Kerala</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
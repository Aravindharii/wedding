"use client";

import { motion } from "framer-motion";

interface CoupleNamesProps {
  guestName?: string;
}

export default function CoupleNames({ guestName }: CoupleNamesProps) {
  return (
    <>
      <div className="py-4 flex flex-col items-center justify-center w-full">
        <p className="text-purple-800 text-xs md:text-sm tracking-[0.2em] uppercase mb-8 font-bold leading-relaxed">
          Together with their families,<br />you are joyfully invited to the<br />
          Wedding of
        </p>
        <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-purple-950 font-normal tracking-wide drop-shadow-sm">
          Jithin
        </h1>
        <p className="text-purple-900/80 text-xs md:text-sm tracking-wide mt-3 font-semibold">
          S/o Mr. John Ghee Varghese & Mrs. Gracy Varghese
        </p>
        <span className="font-serif text-3xl md:text-5xl text-amber-600/80 italic my-4 font-light">
          &amp;
        </span>
        <h1 className="font-['var(--font-cursive)',serif] text-7xl sm:text-8xl md:text-9xl text-purple-950 font-normal tracking-wide drop-shadow-sm">
          Jiya
        </h1>
        <p className="text-purple-900/80 text-xs md:text-sm tracking-wide mt-3 mb-2 font-semibold">
          D/o Mr. Thomaskutty P C & Mrs. Lissy Thomas
        </p>
      </div>

      {guestName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-10 w-full max-w-sm mx-auto text-center relative"
        >
          <div className="h-[1px] w-24 mx-auto mb-6 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60" />
          <p className="font-serif text-3xl md:text-4xl italic tracking-wide text-purple-900 font-semibold">
            {guestName}
          </p>
          <p className="mt-4 text-purple-800/90 font-medium text-base md:text-lg">
            You are specially invited
          </p>
          <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-purple-200/20 blur-3xl rounded-full -z-10" />
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-1 my-8 md:my-10">
        <span className="text-purple-300 text-[10px]">&#9670;</span>
        <span className="text-amber-500 text-xs">&#9670;</span>
        <span className="text-purple-300 text-[10px]">&#9670;</span>
      </div>
    </>
  );
}

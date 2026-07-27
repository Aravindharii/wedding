"use client";

interface EventCardProps {
  showDecorativeTitle?: boolean;
}

export default function EventCard({
  showDecorativeTitle = false,
}: EventCardProps) {
  return (
    <div className="mb-10 w-full flex flex-col items-center">
      <p className="text-purple-900 text-[11px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-bold text-center leading-6 max-w-xs sm:max-w-none">
        We invite you to celebrate our love
        <br />
        and the beautiful beginning
        <br />
        of our forever together
      </p>

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-purple-200 rounded-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 shadow-lg shadow-purple-900/5 flex flex-col items-center">
          {/* Title */}
          {showDecorativeTitle ? (
            <div className="flex items-center gap-3 mb-8">
              <span className="text-purple-400 text-[10px]">&#9670;</span>
              <p className="text-purple-800 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-black">
                MARRIAGE
              </p>
              <span className="text-purple-400 text-[10px]">&#9670;</span>
            </div>
          ) : (
            <p className="text-purple-800 text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-8 font-black">
              MARRIAGE
            </p>
          )}

          {/* Date */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-10 w-full">
            <div className="text-right">
              <p className="text-purple-950 text-[10px] sm:text-sm md:text-base tracking-[0.18em] uppercase mb-1 font-bold">
                THURSDAY
              </p>
              <p className="text-purple-900 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase font-bold">
                AUG
              </p>
            </div>

            <div className="w-px h-8 sm:h-12 bg-purple-300" />

            <div className="text-5xl sm:text-6xl md:text-7xl text-purple-950 font-light font-serif tracking-tight drop-shadow-sm leading-none">
              20
            </div>

            <div className="w-px h-8 sm:h-12 bg-purple-300" />

            <div className="text-left">
              <p className="text-purple-950 text-[10px] sm:text-sm md:text-base tracking-[0.15em] mb-1 font-bold">
                2026
              </p>
              <p className="text-purple-900 text-[10px] sm:text-xs md:text-sm tracking-[0.08em] uppercase font-bold">
                10:30 AM
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-purple-200/50 w-full flex flex-col items-center">
            <p className="text-purple-950 text-xl sm:text-2xl md:text-3xl font-serif font-semibold mb-3 text-center">
              The CSI Convention Centre
            </p>

            <p className="text-purple-800 text-[11px] sm:text-xs md:text-sm leading-relaxed font-medium text-center">
              Q S Road, Chinnakkada,
              <br />
              Kollam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
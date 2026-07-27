"use client";

import { useState, useEffect, type ReactNode } from "react";

interface BackgroundSectionProps {
  bgImage?: string;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
}

export default function BackgroundSection({
  bgImage = "/bg_lavender.png",
  children,
  className = "",
  overlayClassName = "",
}: BackgroundSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setImageLoaded(true);
  }, [bgImage]);

  return (
    <section className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-4 bg-white ${className}`}>
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden transition-opacity duration-400"
        style={{
          backgroundImage: `url('${bgImage}')`,
          transform: "scale(1.0)",
          filter: "blur(1px)",
          backgroundPosition: "47% 60%",
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('${bgImage}')`,
          transform: "scale(1.0)",
          filter: "blur(2px)",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-white/20" />
      <div className={`absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-purple-100/40 z-0 pointer-events-none ${overlayClassName}`} />

      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {children}
    </section>
  );
}

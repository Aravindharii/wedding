"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

export default function HeroSection({ guestName }: { guestName?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 6 + 2;
      return {
        key: `particle-${i}`,
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        x: (Math.random() - 0.5) * 120,
      };
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-paper via-surface to-mist pt-20"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 80, 0],
          y: [0, -80, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coffee-light/40 rounded-full blur-[120px] mix-blend-multiply"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 80, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[150px] mix-blend-multiply"
      />

      <div className="absolute inset-0 bg-mesh mix-blend-overlay opacity-60" />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.3]" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute rounded-full bg-gradient-to-tr from-gold to-white shadow-[0_0_10px_rgba(212,175,55,0.6)]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -1000],
              x: [0, p.x, 0],
              opacity: [0, 1, 0, 1, 0],
              scale: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", damping: 20 }}
          className="relative glassmorphism rounded-3xl p-10 md:p-16 w-full max-w-3xl overflow-hidden group shadow-[0_30px_100px_rgba(212,175,55,0.1)]"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine" />

          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white/70 backdrop-blur px-5 py-2 shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
              <span className="h-2 w-2 rounded-full bg-coffee-medium animate-heartbeat" />
              <p className="text-ink/80 tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold">
                With immense joy
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-col items-center justify-center my-8"
          >
            <h1 className="font-serif text-7xl md:text-9xl text-gradient tracking-tighter drop-shadow-sm font-semibold">
              Vishnu
            </h1>
            <span className="font-serif text-5xl md:text-7xl text-coffee-medium italic my-1 md:-my-6 z-10 drop-shadow-sm">
              &
            </span>
            <h1 className="font-serif text-7xl md:text-9xl text-gradient tracking-tighter drop-shadow-sm font-semibold">
              Surya
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 space-y-3"
          >
            <p className="text-coffee-dark text-2xl md:text-3xl font-serif italic max-w-xl mx-auto drop-shadow-sm">
              {guestName ? (
                <>
                  Dear <strong className="text-coffee-dark font-semibold">{guestName}</strong>, we invite you and your family to celebrate with us.
                </>
              ) : (
                "We invite you to celebrate with us."
              )}
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto my-6" />
            <p className="text-ink font-medium text-lg md:text-xl font-serif italic">
              Tuesday, 28 April 2026
            </p>
            <p className="text-ink/60 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
              Srinikethan Auditorium · Karukachal
            </p>
          </motion.div>
        </motion.div>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, type: "spring" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 60px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.2) inset"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative mt-16 inline-flex items-center justify-center px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase overflow-hidden
            bg-surface text-coffee-dark border border-gold/50 shadow-[0_15px_40px_rgba(212,175,55,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10 flex items-center gap-3">
            RSVP Now
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              →
            </motion.span>
          </span>
        </motion.a>

        <motion.a
          href="#schedule"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-ink/50 text-xs tracking-[0.3em] uppercase group"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 group-hover:text-gold transition-colors"
          >
            Explore <span className="text-gold group-hover:translate-y-1 transition-transform">↓</span>
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}

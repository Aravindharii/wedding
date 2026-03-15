"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useRef } from "react";

const events = [
  {
    title: "The Wedding",
    date: "Tuesday | 28 April 2026",
    subDate: "(1201 Medam 15)",
    time: "Muhurtham: 11:45 AM to 12:10 PM",
    desc: "and for lunch thereafter",
    venue: "Srinikethan Auditorium",
    address: "Karukachal Manimala Rd, Karukachal, Kerala",
  },
  {
    title: "Wedding Reception",
    date: "Thursday | 30 April 2026",
    subDate: "",
    time: "Time: 6:00 PM to 9:30 PM",
    desc: "Join us for an evening of celebration.",
    venue: "Shoba Auditorium, Thiruvankulam",
    address: "Thiruvankulam - Chottanikkara Rd, Thrippunithura, Kerala",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <section id="schedule" className="relative py-32 px-4 bg-mist max-w-none" ref={containerRef}>
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 -z-10 bg-grid-soft opacity-[0.2]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-coffee-dark mb-6">Celebrations</h2>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-coffee-medium/50" />
            <p className="text-coffee-medium tracking-[0.3em] text-sm uppercase font-semibold">Join us in our joy</p>
            <div className="h-px w-12 bg-gradient-to-r from-coffee-medium/50 to-transparent" />
          </div>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden bg-coffee-dark/5 rounded-full">
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-transparent via-gold to-coffee-medium"
            />
          </div>

          <div className="space-y-16 md:space-y-32">
            {events.map((e, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[39px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-surface rounded-full border-4 border-mist z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-2 md:mt-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-coffee-medium"
                    />
                    <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-20" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 pl-24 md:pl-0' : 'md:pl-16 pl-24 md:pr-0'}`}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative glassmorphism rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(62,39,35,0.08)] hover:shadow-[0_30px_80px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden border border-coffee-light/20 hover:border-gold/30 bg-white/40"
                    >
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-coffee-light/30 to-gold/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                      <h3 className="relative z-10 font-serif text-3xl md:text-4xl text-coffee-dark mb-6">{e.title}</h3>

                      <div className="relative z-10 space-y-6 text-coffee-dark/80">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-gold/10 text-gold shadow-inner mt-1 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-ink text-lg">{e.date}</p>
                            {e.subDate && <p className="text-sm italic opacity-80">{e.subDate}</p>}
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-gold/10 text-gold shadow-inner mt-1 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-ink text-lg">{e.time}</p>
                            <p className="text-sm opacity-80">{e.desc}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-gold/10 text-gold shadow-inner mt-1 shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-ink text-lg">{e.venue}</p>
                            <p className="text-sm leading-relaxed opacity-80">{e.address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-coffee-medium/10 relative z-10">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(e.venue + " " + e.address)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-coffee-medium hover:text-gold transition-colors group/link"
                        >
                          View on Map
                          <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

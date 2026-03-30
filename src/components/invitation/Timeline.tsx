"use client";
import { motion, useScroll, useSpring } from "framer-motion";
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
    mapLink: "https://share.google/govYaRqQc09cvuAoL",
  },
  {
    title: "Wedding Reception",
    date: "Thursday | 30 April 2026",
    subDate: "",
    time: "Time: 6:00 PM to 9:30 PM",
    desc: "Join us for an evening of celebration.",
    venue: "Shoba Auditorium, Thiruvankulam",
    address: "Thiruvankulam - Chottanikkara Rd, Thrippunithura, Kerala",
    mapLink: "https://share.google/6hGeEEN8z4F4He5JK",
  },
];

interface TimelineProps {
  desktopBg?: string;
  inviteType?: "wedding" | "reception" | "both";
}

export default function Timeline({
  desktopBg = "/timeline-desktop.jpg",
  inviteType = "both",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const displayedEvents = events.filter((e) => {
    if (inviteType === "both") return true;
    if (inviteType === "wedding") return e.title === "The Wedding";
    if (inviteType === "reception") return e.title === "Wedding Reception";
    return true;
  });

  return (
    <section id="schedule" className="relative py-32 px-4 overflow-hidden bg-black" ref={containerRef}>
      {/* Mobile: Portrait 2 - custom positioning */}
      <div
        className="absolute inset-0 bg-cover bg-[position:25%_center] bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/portrait2.jpeg')" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url('${desktopBg}')` }}
      />

      {/* Dark Tint Vibe Overlay for readable typography without cards */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
            <span className="text-[#FCEABB] text-[10px] font-medium">◈</span>
            <span className="text-[#FCEABB] text-xs font-medium">◈</span>
            <span className="text-[#FCEABB] text-[10px] font-medium">◈</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#FFF5E1] tracking-wide drop-shadow-lg font-light mb-6">
            Celebrations
          </h2>
          <p className="text-white/90 tracking-[0.3em] text-xs uppercase font-medium">Join us in our joy</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFF5E1]/80 to-[#FCEABB]/60 -translate-x-1/2"
          />

          <div className="space-y-24 md:space-y-36">
            {displayedEvents.map((e, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", bounce: 0.1, duration: 1 }}
                  className={`relative flex flex-col md:flex-row gap-10 md:gap-16 ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Elegant Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border border-[#FCEABB]/80 rotate-45 z-10 mt-6 shadow-[0_0_15px_rgba(252,234,187,0.3)]" />

                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-16 md:pl-0`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="transition-all duration-500 py-2"
                    >
                      <h3 className="font-serif text-3xl md:text-5xl text-[#FFF5E1] font-light tracking-wide drop-shadow-md mb-8">
                        {e.title}
                      </h3>

                      <div className={`space-y-6 text-white/80 font-light text-sm md:text-base flex flex-col ${isEven ? "md:items-end" : "md:items-start"}`}>

                        {/* Date */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
                          <div className="flex-col mt-1.5 opacity-60 hidden md:flex"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div className="md:hidden mt-1.5 opacity-60"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div>
                            <p className="text-white/95 tracking-widest uppercase text-xs md:text-sm font-medium">{e.date}</p>
                            {e.subDate && <p className="text-white/80 text-[10px] md:text-xs tracking-widest mt-2 font-medium">{e.subDate}</p>}
                          </div>
                        </div>

                        {/* Time */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
                          <div className="flex-col mt-1.5 opacity-60 hidden md:flex"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div className="md:hidden mt-1.5 opacity-60"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div>
                            <p className="text-[#FCEABB]/90 tracking-wider font-serif italic text-base md:text-lg">{e.time}</p>
                            <p className="text-white/80 text-xs mt-2 tracking-wide font-medium">{e.desc}</p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse" : "flex-row"}`}>
                          <div className="flex-col mt-1.5 opacity-60 hidden md:flex"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div className="md:hidden mt-1.5 opacity-60"><span className="text-[10px] text-[#FCEABB]">◈</span></div>
                          <div>
                            <p className="text-white/90 tracking-wide font-medium">{e.venue}</p>
                            <p className="text-white/90 text-xs leading-relaxed mt-2 font-medium">{e.address}</p>
                            {e.mapLink && (
                              <a
                                href={e.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-[#FCEABB]/70 hover:text-[#FFF5E1] transition-colors text-[10px] uppercase tracking-[0.15em] border-b border-[#FCEABB]/20 hover:border-[#FFF5E1]/50 pb-0.5"
                              >
                                View Map ↗
                              </a>
                            )}
                          </div>
                        </div>

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
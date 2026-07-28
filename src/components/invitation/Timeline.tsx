"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    title: "Engagement",
    date: "18 | 8 | 2026 | Tuesday",
    subDate: "",
    time: "11:00 AM Onwards",
    desc: "Join us to celebrate the beginning.",
    venue: "Bethel Hall",
    address: "St Mary's Church, Thessery, Perambra P.O, 680689, Chalakudy",
    mapLink: "https://maps.google.com/?q=St+Marys+Forane+Church+Thessery",
  },
  {
    title: "Marriage",
    date: "20 August 2026 | Thursday",
    subDate: "By the grace of God will be solemnized",
    time: "10:30 AM",
    desc: "and for celebrations thereafter.",
    venue: "The CSI Convention Centre",
    address: "Q S Road, Chinnakkada, Kollam",
    mapLink: "https://maps.google.com/?q=CSI+Convention+Centre+Kollam",
  },
];

interface TimelineProps {
  desktopBg?: string;
  inviteType?: string;
}

export default function Timeline({
  desktopBg = "/bg_lavender.png",
  inviteType = "both-receptions",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const displayedEvents = events.filter((e) => {
    if (inviteType === "engagement") return e.title === "Engagement";
    if (inviteType === "wedding" || inviteType === "wedding-reception") return e.title === "Marriage";
    return true;
  });

  return (
    <section id="schedule" className="relative py-32 px-4 overflow-hidden bg-purple-50" ref={containerRef}>
      {/* Mobile background removed or adjusted */}
      <div
        className="absolute inset-0 bg-cover bg-[position:25%_center] bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/bg_lavender.png')", filter: "blur(2px) hue-rotate(280deg)", transform: "scale(1.05)" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: `url('${desktopBg}')`,
          backgroundPosition: "20% 50%",
          filter: "blur(4px) hue-rotate(280deg)",
          transform: "scale(1.15)"
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-xl mx-auto bg-white/70 backdrop-blur-md py-6 md:py-8 px-6 md:px-12 rounded-[2rem] shadow-xl border border-white/50 w-[90%] md:w-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-purple-300 text-[10px] font-medium">◈</span>
            <span className="text-amber-500 text-xs font-medium">◈</span>
            <span className="text-purple-300 text-[10px] font-medium">◈</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-purple-950 tracking-wide drop-shadow-sm font-semibold mb-6">
            Celebrations
          </h2>
          <p className="text-purple-800/80 tracking-[0.3em] text-xs uppercase font-bold">Join us in our joy</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-purple-200 -translate-x-1/2" />
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 to-amber-500 -translate-x-1/2"
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
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-purple-400 rotate-45 z-10 mt-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />

                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 text-left ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="transition-all duration-500 py-2 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5"
                    >
                      <h3 className="font-serif text-3xl md:text-4xl text-purple-900 font-semibold tracking-wide drop-shadow-sm mb-6">
                        {e.title}
                      </h3>

                      {/* All content rows now start with flex-row and text-left on mobile */}
                      <div className={`space-y-5 text-purple-950 font-medium text-sm md:text-base flex flex-col items-start ${isEven ? "md:items-end" : "md:items-start"}`}>
                        {/* Date */}
                        <div className={`flex gap-4 w-full max-w-sm flex-row text-left ${isEven ? "md:flex-row-reverse md:text-right" : "md:flex-row"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="flex-1">
                            <p className="text-purple-950 tracking-widest uppercase text-xs md:text-sm font-bold">{e.date}</p>
                            {e.subDate && <p className="text-purple-800 text-[10px] md:text-xs tracking-widest mt-2 font-bold italic">{e.subDate}</p>}
                          </div>
                        </div>

                        {/* Time */}
                        <div className={`flex gap-4 w-full max-w-sm flex-row text-left ${isEven ? "md:flex-row-reverse md:text-right" : "md:flex-row"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="flex-1">
                            <p className="text-amber-600 tracking-wider font-serif text-base md:text-lg font-semibold">{e.time}</p>
                            <p className="text-purple-900/80 text-xs mt-1 tracking-wide font-medium">{e.desc}</p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className={`flex gap-4 w-full max-w-sm flex-row text-left ${isEven ? "md:flex-row-reverse md:text-right" : "md:flex-row"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="flex-1">
                            <p className="text-purple-950 tracking-wide font-bold">{e.venue}</p>
                            <p className="text-purple-900/80 text-xs leading-relaxed mt-1 font-medium">{e.address}</p>
                            {e.mapLink && (
                              <a
                                href={e.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-purple-600 hover:text-purple-800 transition-colors text-[10px] font-bold uppercase tracking-[0.15em] border-b border-purple-300 hover:border-purple-500 pb-0.5"
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
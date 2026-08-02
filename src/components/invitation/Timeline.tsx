"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    title: "Marriage",
    date: "30 August 2026 | Sunday",
    subDate: "The auspicious occasion of the wedding ceremony",
    time: "10:30 AM Onwards",
    desc: "Join us in our joy.",
    venue: "AKSHARA BANQUET & LAWNS",
    address: "No. 5, GD Avenue, Kempapura Rd, Chikkabanavara, Kempapura, Bangalore 560090",
    mapLink: "https://maps.google.com/?q=Akshara+Banquet+And+Lawns+Bangalore",
  },
];

interface TimelineProps {
  desktopBg?: string;
  inviteType?: string;
}

export default function Timeline({
  desktopBg = "/bg_krishna.png",
  inviteType = "wedding",
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
    <section id="schedule" className="relative py-32 px-4 overflow-hidden bg-rose-50/50" ref={containerRef}>
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-[position:25%_center] bg-no-repeat lg:hidden opacity-30 mix-blend-multiply"
        style={{ backgroundImage: "url('/bg_floral.png')", filter: "blur(0px)", transform: "scale(1.05)" }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hidden lg:block opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url('${desktopBg}')`,
          backgroundPosition: "20% 50%",
          transform: "scale(1.05)"
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-0" />

      {/* Hanging Flowers - Left Side */}
      <div className="absolute left-0 top-0 z-0 hidden lg:block">
        <div className="relative">
          {/* Flower Branch 1 */}
          <div className="absolute -left-8 top-10">
            <div className="flex flex-col items-center">
              <div className="w-px h-16 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-1 -mt-1">
                <div className="w-3 h-3 rounded-full bg-rose-200/40 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-rose-300/30 animate-pulse delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-rose-200/40 animate-pulse delay-150"></div>
              </div>
              <div className="flex gap-2 mt-1">
                <div className="w-2 h-4 rounded-full bg-rose-300/20 rotate-12"></div>
                <div className="w-2 h-5 rounded-full bg-rose-400/20 -rotate-6"></div>
                <div className="w-2 h-4 rounded-full bg-rose-300/20 rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Flower Branch 2 */}
          <div className="absolute -left-12 top-48">
            <div className="flex flex-col items-center">
              <div className="w-px h-20 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-2 -mt-1">
                <div className="w-4 h-4 rounded-full bg-pink-200/40 animate-pulse delay-100"></div>
                <div className="w-5 h-5 rounded-full bg-rose-300/30 animate-pulse delay-200"></div>
                <div className="w-4 h-4 rounded-full bg-pink-200/40 animate-pulse delay-300"></div>
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-2 h-6 rounded-full bg-rose-300/20 rotate-12"></div>
                <div className="w-2 h-7 rounded-full bg-rose-400/20 -rotate-6"></div>
                <div className="w-2 h-5 rounded-full bg-rose-300/20 rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Flower Branch 3 */}
          <div className="absolute -left-6 top-96">
            <div className="flex flex-col items-center">
              <div className="w-px h-24 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-2 -mt-1">
                <div className="w-5 h-5 rounded-full bg-rose-200/30 animate-pulse delay-150"></div>
                <div className="w-4 h-4 rounded-full bg-pink-300/30 animate-pulse delay-300"></div>
                <div className="w-5 h-5 rounded-full bg-rose-200/30 animate-pulse delay-450"></div>
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-2 h-6 rounded-full bg-rose-300/20 rotate-12"></div>
                <div className="w-2 h-8 rounded-full bg-rose-400/20 -rotate-6"></div>
                <div className="w-2 h-6 rounded-full bg-rose-300/20 rotate-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hanging Flowers - Right Side */}
      <div className="absolute right-0 top-0 z-0 hidden lg:block">
        <div className="relative">
          {/* Flower Branch 4 */}
          <div className="absolute -right-8 top-20">
            <div className="flex flex-col items-center">
              <div className="w-px h-16 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-1 -mt-1">
                <div className="w-3 h-3 rounded-full bg-rose-200/40 animate-pulse delay-200"></div>
                <div className="w-4 h-4 rounded-full bg-rose-300/30 animate-pulse delay-100"></div>
                <div className="w-3 h-3 rounded-full bg-rose-200/40 animate-pulse"></div>
              </div>
              <div className="flex gap-2 mt-1">
                <div className="w-2 h-4 rounded-full bg-rose-300/20 -rotate-12"></div>
                <div className="w-2 h-5 rounded-full bg-rose-400/20 rotate-6"></div>
                <div className="w-2 h-4 rounded-full bg-rose-300/20 -rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Flower Branch 5 */}
          <div className="absolute -right-12 top-64">
            <div className="flex flex-col items-center">
              <div className="w-px h-20 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-2 -mt-1">
                <div className="w-4 h-4 rounded-full bg-pink-200/40 animate-pulse delay-300"></div>
                <div className="w-5 h-5 rounded-full bg-rose-300/30 animate-pulse delay-150"></div>
                <div className="w-4 h-4 rounded-full bg-pink-200/40 animate-pulse delay-450"></div>
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-2 h-6 rounded-full bg-rose-300/20 -rotate-12"></div>
                <div className="w-2 h-7 rounded-full bg-rose-400/20 rotate-6"></div>
                <div className="w-2 h-5 rounded-full bg-rose-300/20 -rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Flower Branch 6 */}
          <div className="absolute -right-6 top-[28rem]">
            <div className="flex flex-col items-center">
              <div className="w-px h-24 bg-gradient-to-b from-rose-300/60 to-transparent"></div>
              <div className="flex gap-2 -mt-1">
                <div className="w-5 h-5 rounded-full bg-rose-200/30 animate-pulse delay-450"></div>
                <div className="w-4 h-4 rounded-full bg-pink-300/30 animate-pulse delay-300"></div>
                <div className="w-5 h-5 rounded-full bg-rose-200/30 animate-pulse delay-150"></div>
              </div>
              <div className="flex gap-3 mt-1">
                <div className="w-2 h-6 rounded-full bg-rose-300/20 -rotate-12"></div>
                <div className="w-2 h-8 rounded-full bg-rose-400/20 rotate-6"></div>
                <div className="w-2 h-6 rounded-full bg-rose-300/20 -rotate-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Corner Flowers */}
      <div className="absolute bottom-0 left-0 z-0 hidden lg:block">
        <div className="relative">
          <div className="absolute -left-4 bottom-8">
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-rose-200/30 animate-pulse delay-100"></div>
                <div className="w-5 h-5 rounded-full bg-pink-300/30 animate-pulse delay-200"></div>
                <div className="w-4 h-4 rounded-full bg-rose-200/30 animate-pulse delay-300"></div>
              </div>
              <div className="w-px h-12 bg-gradient-to-t from-rose-300/60 to-transparent -mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-0 hidden lg:block">
        <div className="relative">
          <div className="absolute -right-4 bottom-8">
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-rose-200/30 animate-pulse delay-300"></div>
                <div className="w-5 h-5 rounded-full bg-pink-300/30 animate-pulse delay-150"></div>
                <div className="w-4 h-4 rounded-full bg-rose-200/30 animate-pulse delay-450"></div>
              </div>
              <div className="w-px h-12 bg-gradient-to-t from-rose-300/60 to-transparent -mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-xl mx-auto bg-white/70 backdrop-blur-md py-6 md:py-8 px-6 md:px-12 rounded-[2rem] shadow-[0_8px_32px_rgba(194,24,91,0.05)] border border-white/80 w-[90%] md:w-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6 opacity-70">
            <span className="text-rose-300 text-[10px] font-medium">◈</span>
            <span className="text-rose-400 text-xs font-medium animate-pulse">◈</span>
            <span className="text-rose-300 text-[10px] font-medium">◈</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-rose-950 tracking-wide drop-shadow-sm font-semibold mb-6">
            Celebrations
          </h2>
          <p className="text-rose-800/80 tracking-[0.3em] text-xs uppercase font-bold">Join us in our joy</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-rose-200 -translate-x-1/2" />
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-400 via-rose-500 to-rose-400 -translate-x-1/2"
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
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-rose-400 rotate-45 z-10 mt-6 shadow-[0_0_15px_rgba(244,63,94,0.3)]" />

                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-16 md:pl-0`}>
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(244, 63, 94, 0.05)" }}
                      className="transition-all duration-500 py-2 bg-white/70 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-900/5"
                    >
                      <h3 className="font-serif text-3xl md:text-4xl text-rose-900 font-semibold tracking-wide drop-shadow-sm mb-6">
                        {e.title}
                      </h3>

                      <div className={`space-y-5 text-rose-950 font-medium text-sm md:text-base flex flex-col ${isEven ? "md:items-end" : "md:items-start"}`}>
                        {/* Date */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse text-right" : "flex-row text-left"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div>
                            <p className="text-rose-950 tracking-widest uppercase text-xs md:text-sm font-bold">{e.date}</p>
                            {e.subDate && <p className="text-rose-800 text-[10px] md:text-xs tracking-widest mt-2 font-bold italic">{e.subDate}</p>}
                          </div>
                        </div>

                        {/* Time */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse text-right" : "flex-row text-left"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div>
                            <p className="text-amber-600 tracking-wider font-serif text-base md:text-lg font-semibold">{e.time}</p>
                            <p className="text-rose-900/80 text-xs mt-1 tracking-wide font-medium">{e.desc}</p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className={`flex gap-4 max-w-sm ${isEven ? "md:flex-row-reverse text-right" : "flex-row text-left"}`}>
                          <div className="flex-col mt-1.5 hidden md:flex"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div className="md:hidden mt-1.5"><span className="text-[10px] text-amber-500">◈</span></div>
                          <div>
                            <p className="text-rose-950 tracking-wide font-bold">{e.venue}</p>
                            <p className="text-rose-900/80 text-xs leading-relaxed mt-1 font-medium">{e.address}</p>
                            {e.mapLink && (
                              <a
                                href={e.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-rose-600 hover:text-rose-800 transition-colors text-[10px] font-bold uppercase tracking-[0.15em] border-b border-rose-300 hover:border-rose-500 pb-0.5"
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
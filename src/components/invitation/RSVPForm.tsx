"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SendHorizontal, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  attending: z.enum(["yes", "no"]),
  plusOne: z.boolean().optional(),
  mealPreference: z.enum(["veg", "non-veg", "vegan"]),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RSVPForm({
  guestSlug,
  guestName,
}: {
  guestSlug?: string;
  guestName?: string;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      attending: "yes",
      mealPreference: "veg",
      plusOne: false,
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!guestSlug) return;
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: guestSlug, ...data }),
      });
      if (res.ok) {
        setIsSuccess(true);
        toast.success("RSVP submitted! We can't wait to see you.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Something went wrong");
      }
    } catch {
      toast.error("Network error, please try again.");
    }
  };

  return (
    <section id="rsvp" className="relative py-32 bg-mist px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.25]" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold/20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-coffee-light/40 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-xl mx-auto drop-shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-coffee-dark mb-6">RSVP</h2>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-coffee-medium/30" />
            <p className="text-coffee-medium tracking-[0.3em] text-[10px] md:text-sm uppercase font-semibold">
              {guestName ? `For ${guestName} & family` : "Use your personal link"}
            </p>
            <div className="h-px w-8 bg-gradient-to-r from-coffee-medium/30 to-transparent" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!guestSlug ? (
            <motion.div
              key="no-slug"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="glassmorphism p-12 rounded-3xl border border-white/40 shadow-[0_30px_80px_rgba(62,39,35,0.12)] text-center relative overflow-hidden bg-white/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10" />
              <p className="relative z-10 text-coffee-dark/80 max-w-md mx-auto text-lg font-light leading-relaxed">
                Please use your personal invitation link <br />
                <span className="inline-block mt-4 px-4 py-2 bg-white/50 rounded-lg font-mono text-sm tracking-widest text-gold border border-gold/20 shadow-inner">
                  /your-name
                </span> <br /><span className="inline-block mt-4">to RSVP.</span>
              </p>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="glassmorphism p-16 rounded-3xl border border-gold/30 shadow-[0_30px_100px_rgba(212,175,55,0.2)] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] bg-white/30"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-gold to-[#b9901f] rounded-full flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-3xl font-serif text-coffee-dark mb-4">Thank You!</h3>
              <p className="text-coffee-dark/70 text-lg font-light border-t border-coffee-medium/10 pt-6">Your RSVP has been securely recorded.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
              className="group space-y-8 glassmorphism p-8 md:p-14 rounded-[2rem] shadow-[0_40px_100px_rgba(62,39,35,0.12)] border border-white/50 hover:border-gold/30 transition-colors duration-500 relative overflow-hidden bg-white/30"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/30 transition-colors duration-700" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-coffee-light/50 blur-[80px] rounded-full pointer-events-none group-hover:bg-coffee-light/70 transition-colors duration-700" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8">
                <div className="group/input">
                  <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-coffee-dark/70 mb-3 ml-2">
                    <span className="w-1 h-3 bg-gold rounded-full" /> Will you attend?
                  </label>
                  <div className="relative">
                    <select {...register("attending")} className="w-full appearance-none bg-surface/80 backdrop-blur border border-coffee-medium/10 rounded-2xl px-6 py-4 text-coffee-dark outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all shadow-inner relative z-10">
                      <option value="yes">Yes, with pleasure!</option>
                      <option value="no">Regretfully decline</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60 z-20">▼</div>
                  </div>
                </div>

                <div className="group/input">
                  <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-coffee-dark/70 mb-3 ml-2">
                    <span className="w-1 h-3 bg-coffee-medium rounded-full" /> Meal Preference
                  </label>
                  <div className="relative">
                    <select {...register("mealPreference")} className="w-full appearance-none bg-surface/80 backdrop-blur border border-coffee-medium/10 rounded-2xl px-6 py-4 text-coffee-dark outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all shadow-inner relative z-10">
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60 z-20">▼</div>
                  </div>
                </div>
              </div>

              <label className="relative z-10 flex items-center gap-5 text-sm text-coffee-dark/80 cursor-pointer p-5 bg-surface/60 backdrop-blur rounded-2xl border border-coffee-medium/5 hover:border-gold/40 hover:bg-surface/80 transition-all shadow-[0_8px_30px_rgba(62,39,35,0.04)] group/check">
                <div className="relative flex items-center justify-center shrink-0">
                  <input type="checkbox" {...register("plusOne")} className="peer appearance-none w-7 h-7 border-2 border-gold/40 rounded-lg bg-white/50 checked:bg-gold checked:border-gold transition-all cursor-pointer shadow-inner" />
                  <svg className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="font-medium tracking-wide">I am bringing a +1</span>
              </label>

              <div className="relative z-10 group/input">
                <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-coffee-dark/70 mb-3 ml-2">
                  <span className="w-1 h-3 bg-coffee-dark/30 rounded-full" /> Message for the couple
                </label>
                <textarea {...register("message")} rows={4} placeholder="Leave your wishes..."
                  className="w-full bg-surface/80 backdrop-blur border border-coffee-medium/10 rounded-2xl px-6 py-5 text-coffee-dark outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all shadow-inner resize-none placeholder:text-coffee-dark/30" />
              </div>

              <motion.button type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(212,175,55,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 w-full overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-gold via-[#b9901f] to-gold bg-[length:200%_auto] text-white py-5 rounded-2xl font-bold tracking-[0.2em] uppercase shadow-[0_15px_30px_rgba(212,175,55,0.25)] transition-all disabled:opacity-70 disabled:cursor-not-allowed group/btn hover:animate-shine"
              >
                {/* Shine effect on button */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shine_1.5s_ease-in-out_infinite]" />

                <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
                  {isSubmitting ? "Submitting..." : (
                    <>Send RSVP <SendHorizontal className="w-5 h-5" /></>
                  )}
                </span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

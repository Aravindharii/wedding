"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SendHorizontal, CheckCircle2, CalendarCheck, CalendarX } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  attending: z.enum(["yes", "no"]),
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
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      attending: "yes",
      message: "",
    },
  });

  const handleAttendingSelect = (value: "yes" | "no") => {
    setAttending(value);
    setValue("attending", value);
  };

  const onSubmit = async (data: FormData) => {
    if (!guestSlug) {
      toast.error("Invalid invitation link");
      return;
    }
    if (!attending) {
      toast.error("Please let us know if you'll be attending");
      return;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: guestSlug, ...data }),
      });

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Thank you! Your RSVP has been recorded.");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to submit RSVP");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <section id="rsvp" className="relative py-28 md:py-32 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Background - Portrait on Mobile, Same Image on Desktop with lighter overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/portrait4.jpeg')" }}
      />

      {/* Light Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/75 z-0" />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-[#FFF5E1] mb-4">RSVP</h2>
          {guestName && (
            <p className="text-[#FCEABB]/80 text-sm md:text-base tracking-wide">
              Dear {guestName},
            </p>
          )}
          <p className="text-white/70 mt-2 text-sm">Please let us know if you can join us</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!guestSlug ? (
            /* No Slug State */
            <motion.div
              key="no-slug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-white/80 text-lg leading-relaxed">
                Please use your personal invitation link to RSVP.
              </p>
            </motion.div>
          ) : isSuccess ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="text-center py-16"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#FCEABB] to-amber-500 rounded-full flex items-center justify-center mb-8 shadow-xl">
                <CheckCircle2 className="w-11 h-11 text-black" />
              </div>
              <h3 className="text-3xl font-serif text-[#FFF5E1] mb-3">Thank You!</h3>
              <p className="text-white/70 text-lg">Your response has been recorded.</p>
              <p className="text-white/60 mt-2">We look forward to celebrating with you.</p>
            </motion.div>
          ) : (
            /* Main Form */
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Attendance Selection */}
              <div>
                <label className="block text-[#FCEABB]/80 text-xs uppercase tracking-widest mb-4 pl-1">
                  Will you be attending?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleAttendingSelect("yes")}
                    className={`py-5 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-3 ${attending === "yes"
                        ? "bg-[#FCEABB] text-black shadow-lg"
                        : "bg-white/10 hover:bg-white/15 border border-white/20 text-white"
                      }`}
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Yes, I'll be there
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAttendingSelect("no")}
                    className={`py-5 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-3 ${attending === "no"
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-white/10 hover:bg-white/15 border border-white/20 text-white"
                      }`}
                  >
                    <CalendarX className="w-5 h-5" />
                    Sorry, can't make it
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !attending}
                whileHover={{ scale: attending ? 1.02 : 1 }}
                whileTap={{ scale: attending ? 0.97 : 1 }}
                className={`w-full py-5 rounded-2xl font-semibold tracking-wider uppercase flex items-center justify-center gap-3 transition-all ${attending
                    ? "bg-gradient-to-r from-[#FCEABB] to-amber-500 text-black shadow-lg hover:shadow-xl"
                    : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Confirm RSVP <SendHorizontal className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {!attending && (
                <p className="text-center text-white/50 text-xs">
                  Please select Yes or No to continue
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
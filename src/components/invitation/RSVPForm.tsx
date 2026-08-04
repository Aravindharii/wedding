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
    <section id="rsvp" className="relative py-28 md:py-32 px-4 overflow-hidden min-h-screen flex items-center bg-teal-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-teal-100 z-0" />

      {/* Subtle Accent Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-200/50 via-white/10 to-transparent opacity-80 z-0" />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-teal-900 mb-4">RSVP</h2>
          {guestName && (
            <p className="text-teal-800 text-sm md:text-base tracking-wide font-medium">
              Dear {guestName},
            </p>
          )}
          <p className="text-teal-950/80 mt-2 text-sm font-medium">Please let us know if you can join us</p>
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
              <p className="text-teal-950/80 text-lg leading-relaxed">
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
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-300 to-teal-600 rounded-full flex items-center justify-center mb-8 shadow-xl">
                <CheckCircle2 className="w-11 h-11 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-teal-900 mb-3">Jazakallah Khair!</h3>
              <p className="text-teal-800/80 text-lg">Your response has been recorded.</p>
              <p className="text-teal-700/70 mt-2">We look forward to celebrating with you.</p>
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
                <label className="block text-teal-900 text-xs uppercase tracking-widest mb-4 pl-1 font-bold">
                  Will you be attending?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleAttendingSelect("yes")}
                    className={`py-5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-3 border ${attending === "yes"
                      ? "bg-teal-600 border-teal-600 text-white shadow-lg"
                      : "bg-white/60 hover:bg-white border-teal-200 text-teal-900"
                      }`}
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Yes, I&apos;ll be there
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAttendingSelect("no")}
                    className={`py-5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-3 border ${attending === "no"
                      ? "bg-teal-900 border-teal-900 text-white shadow-lg"
                      : "bg-white/60 hover:bg-white border-teal-200 text-teal-900"
                      }`}
                  >
                    <CalendarX className="w-5 h-5" />
                    Sorry, can&apos;t make it
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !attending}
                whileHover={{ scale: attending ? 1.02 : 1 }}
                whileTap={{ scale: attending ? 0.97 : 1 }}
                className={`w-full py-5 rounded-xl font-bold tracking-wider uppercase flex items-center justify-center gap-3 transition-all ${attending
                  ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-teal-100 text-teal-300 cursor-not-allowed"
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
                <p className="text-center text-teal-700/80 text-xs font-bold">
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

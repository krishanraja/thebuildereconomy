/**
 * @file NotifyForm.tsx
 * @description Inline email capture. Writes to the `subscribers` table and fires
 * the send-welcome-email edge function. Used in the Hero and the Subscribe block
 * so the launch list gets built on-page instead of bouncing people off-site.
 *
 * Tone-aware: "onDark" sits on the ink hero, "onLight" sits on a mint/cream block.
 * A duplicate signup (unique-violation 23505) is treated as success, not an error.
 */

import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

const emailSchema = z.string().trim().email().max(255);

type Tone = "onDark" | "onLight";

interface NotifyFormProps {
  tone?: Tone;
  buttonLabel?: string;
  doneLabel?: string;
  className?: string;
}

export const NotifyForm = ({
  tone = "onDark",
  buttonLabel = "Notify me",
  doneLabel = "You're on the list. Check your inbox.",
  className = "",
}: NotifyFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const onDark = tone === "onDark";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage("That email doesn't look right.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { error } = await supabase
        .from("audience_contacts")
        .insert({ email: parsed.data, source: "builder_economy" });
      // 23505 = unique violation. Already on the list, which is a success for the user.
      if (error && error.code !== "23505") throw error;

      // Welcome email is best-effort. A delivery hiccup shouldn't fail the signup.
      void supabase.functions
        .invoke("send-welcome-email", { body: { email: parsed.data } })
        .catch((err) => logger.error("welcome email failed", { error: String(err) }));

      setStatus("done");
    } catch (err) {
      logger.error("subscribe failed", { error: String(err) });
      setStatus("error");
      setMessage("Something broke on our end. Try again in a moment.");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 ${onDark ? "text-mint" : "text-ink"} ${className}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            onDark ? "bg-mint text-ink" : "bg-ink text-cream"
          }`}
        >
          <Check className="h-5 w-5" />
        </span>
        <span className="text-base font-medium">{doneLabel}</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className={`w-full max-w-md ${className}`} noValidate>
      <div
        className={`flex items-stretch border-2 ${
          onDark ? "border-cream/40 bg-cream/5" : "border-ink bg-cream"
        }`}
      >
        <label htmlFor={`notify-${tone}`} className="sr-only">
          Email address
        </label>
        <input
          id={`notify-${tone}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@email.com"
          className={`min-h-[52px] w-full bg-transparent px-4 text-base outline-none ${
            onDark
              ? "text-cream placeholder:text-cream/40"
              : "text-ink placeholder:text-ink/40"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`group flex shrink-0 items-center gap-2 px-5 text-base font-semibold transition-colors disabled:opacity-70 ${
            onDark ? "bg-mint text-ink hover:bg-butter" : "bg-ink text-cream hover:bg-coral"
          }`}
        >
          {status === "loading" ? "Sending" : buttonLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <AnimatePresence>
        {status === "error" && message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-2 text-sm ${onDark ? "text-coral" : "text-ink/80"}`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};

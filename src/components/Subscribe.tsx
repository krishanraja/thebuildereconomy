/**
 * @file Subscribe.tsx
 * @description Closing email-capture band. Mint block, ink type, inline NotifyForm
 * (onLight) writing to the subscribers table. Second on-page capture point after
 * the hero, sitting just above the footer.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NotifyForm } from "./NotifyForm";

export const Subscribe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="block-mint relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          className="eyebrow text-ink/70 mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-10 bg-ink" />
          <span>Before it's loud</span>
        </motion.div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-end">
          <motion.h2
            className="display-serif text-ink text-[clamp(2.25rem,5.25vw,4.75rem)] leading-[1.02] text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Hear the first episode before anyone else.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-ink/80 leading-relaxed mb-6">
              One email when Ep. 01 lands. After that, one most weeks: who we talked
              to, what they built, what actually worked. Unsubscribe whenever.
            </p>
            <NotifyForm tone="onLight" buttonLabel="Notify me" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

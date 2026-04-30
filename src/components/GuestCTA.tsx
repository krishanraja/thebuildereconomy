/**
 * @file GuestCTA.tsx
 * @description The loudest block on the site. Coral background, oversized ink
 * display serif, magnetic cream button, rotating butter "APPLY" badge.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { MagneticButton } from "./MagneticButton";

interface GuestCTAProps {
  onApplyClick: () => void;
}

export const GuestCTA = ({ onApplyClick }: GuestCTAProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="block-coral relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-44 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            className="eyebrow text-ink mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-10 bg-ink" />
            <span>Be on the show</span>
          </motion.div>

          <motion.h2
            className="display-serif text-ink text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Built something that actually <span className="italic">works</span>?
            <br />
            Come talk about it.
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-ink/85 leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We book builders shipping real products with AI — and willing to be honest about what it actually took. No keynote-speak. No victory laps. The receipts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <MagneticButton strength={0.5}>
              <Button
                size="lg"
                onClick={onApplyClick}
                className="rounded-none bg-cream text-ink hover:bg-cream hover:-translate-y-1 hover:shadow-brutal transition-all px-10 py-7 text-lg font-semibold"
              >
                Apply
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Rotating badge */}
        <motion.div
          className="hidden md:flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <RotatingBadge />
        </motion.div>
      </div>
    </section>
  );
};

const RotatingBadge = () => {
  const text = "· APPLY TO BE A GUEST · APPLY TO BE A GUEST ";
  const chars = text.split("");
  const radius = 130;
  const angleStep = 360 / chars.length;

  return (
    <div className="relative w-[360px] h-[360px] flex items-center justify-center">
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 360 360" className="w-full h-full">
          <defs>
            <path
              id="rotating-circle"
              d="M 180,180 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
            />
          </defs>
          <text className="display-serif" fill="hsl(var(--butter))" fontSize="22" letterSpacing="6">
            <textPath href="#rotating-circle" startOffset="0">
              {text + text}
            </textPath>
          </text>
        </svg>
      </div>
      {/* Center disc */}
      <div className="relative w-[180px] h-[180px] rounded-full bg-ink flex items-center justify-center">
        <span className="display-serif italic text-butter text-5xl">→</span>
      </div>
    </div>
  );
};

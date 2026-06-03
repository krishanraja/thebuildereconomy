/**
 * @file Testimonials.tsx
 * @description Mint-deep block. Single horizontally auto-scrolling marquee of
 * large pull quotes in display serif. Speed scales with scroll velocity.
 * Pauses on hover.
 */

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string | null;
};

const BASE_DURATION = 50;

export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [3, 1, 3], { clamp: true });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("be_testimonials")
        .select("*")
        .eq("featured", true)
        .limit(10);
      if (error) throw error;
      return data as Testimonial[];
    },
    enabled: isInView,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const unsub = factor.on("change", (v) => {
      track.style.animationDuration = `${BASE_DURATION / Math.max(0.5, v)}s`;
    });
    return () => unsub();
  }, [factor]);

  if (!testimonials || testimonials.length === 0) return null;

  const duplicated = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="block-mint-deep relative overflow-hidden grain">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-12">
        <motion.div
          className="eyebrow text-butter mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-10 bg-butter" />
          <span>What people are saying</span>
        </motion.div>
        <motion.h2
          className="display-serif text-cream text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
        >
          The receipts.
        </motion.h2>
      </div>

      <div className="group pb-24 md:pb-36">
        <div
          ref={trackRef}
          className="marquee-track flex whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${BASE_DURATION}s linear infinite` }}
        >
          {duplicated.map((t, i) => {
            const highlighted = highlightQuote(t.quote);
            return (
              <figure
                key={`${t.id}-${i}`}
                className="flex-none w-[80vw] md:w-[60vw] lg:w-[44vw] mx-6 md:mx-10 max-w-[820px]"
              >
                <blockquote className="display-serif text-cream text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] whitespace-normal">
                  <span className="text-butter mr-2">&ldquo;</span>
                  {highlighted}
                  <span className="text-butter ml-1">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-6 small-caps text-xs text-cream/70">
                  {t.author}
                  {t.role && <span className="text-cream/50"> · {t.role}</span>}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * Highlight the longest 1–3 word phrase that doesn't span more than 22 chars
 * with a butter swipe. Heuristic, not perfect, but punchier than uniform copy.
 */
const highlightQuote = (quote: string): React.ReactNode => {
  const words = quote.split(" ");
  if (words.length < 6) return quote;
  // Pick the noun-y middle phrase: 2-3 words near the centre.
  const start = Math.max(2, Math.floor(words.length / 2) - 1);
  const phraseLen = Math.min(3, Math.max(1, Math.min(words.length - start, 2)));
  const before = words.slice(0, start).join(" ");
  const phrase = words.slice(start, start + phraseLen).join(" ");
  const after = words.slice(start + phraseLen).join(" ");
  return (
    <>
      {before}{" "}
      <span className="swipe-butter italic text-ink">{phrase}</span>{" "}
      {after}
    </>
  );
};

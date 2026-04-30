/**
 * Horizontal auto-scrolling marquee. Used between sections as an editorial river.
 * Speed scales with scroll velocity (signature colinandsamir interaction).
 * Each Nth item gets a butter highlight pill for accent.
 */

import { useEffect, useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export type MarqueeTone = "ink" | "ink-deep" | "mint" | "mint-deep" | "cream" | "coral";

interface MarqueeRiverProps {
  items: string[];
  tone?: MarqueeTone;
  speed?: "slow" | "normal" | "fast";
  highlightEvery?: number;
  serif?: boolean;
  className?: string;
}

const toneClass: Record<MarqueeTone, string> = {
  ink: "block-ink",
  "ink-deep": "block-ink-deep",
  mint: "block-mint",
  "mint-deep": "block-mint-deep",
  cream: "block-cream",
  coral: "block-coral",
};

const baseDuration: Record<NonNullable<MarqueeRiverProps["speed"]>, number> = {
  slow: 60,
  normal: 32,
  fast: 18,
};

export const MarqueeRiver = ({
  items,
  tone = "ink",
  speed = "normal",
  highlightEvery = 5,
  serif = false,
  className = "",
}: MarqueeRiverProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Map velocity → speed multiplier (1 = base, faster while scrolling)
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [3, 1, 3], { clamp: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const unsub = velocityFactor.on("change", (v) => {
      track.style.animationDuration = `${baseDuration[speed] / Math.max(0.5, v)}s`;
    });
    return () => unsub();
  }, [velocityFactor, speed]);

  const duplicated = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden py-5 border-y border-current/10 ${toneClass[tone]} ${className}`}>
      <div
        ref={trackRef}
        className="marquee-track flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${baseDuration[speed]}s linear infinite`,
        }}
      >
        {duplicated.map((item, i) => {
          const isHighlight = highlightEvery > 0 && i % highlightEvery === highlightEvery - 1;
          return (
            <span
              key={`${item}-${i}`}
              className={`inline-flex items-center mx-6 ${
                serif ? "display-serif text-3xl md:text-5xl" : "small-caps text-sm md:text-base font-semibold"
              }`}
            >
              {isHighlight ? <span className="swipe-butter">{item}</span> : item}
              <span className="ml-6 opacity-40">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

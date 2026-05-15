/**
 * Section reveal wrapper. Clip-path mask wipe on enter.
 * Replaces the default y/opacity reveal with a sweeping cinematic wipe.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up";
  once?: boolean;
}

const initialClip: Record<NonNullable<RevealBlockProps["direction"]>, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
};

export const RevealBlock = ({
  children,
  className = "",
  delay = 0,
  direction = "left",
  once = true,
}: RevealBlockProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: initialClip[direction] }}
      animate={inView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: initialClip[direction] }}
      transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

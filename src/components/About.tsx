/**
 * @file About.tsx
 * @description Mint block. Sticky-pin layout: oversized pull quote on the left,
 * body copy scrolls past on the right. Butter highlighter on "factory".
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Img } from "@/lib/images";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="block-mint relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* Eyebrow */}
        <motion.div
          className="eyebrow mb-12 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-10 bg-ink" />
          <span>The show</span>
        </motion.div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          {/* Display pull-quote */}
          <motion.h2
            className="display-serif text-ink text-[clamp(2rem,4.75vw,4.25rem)] leading-[1.02] text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Creator Economy gave everyone a camera.
            <br />
            The Builder Economy gives everyone a{" "}
            <span className="swipe-butter italic">factory</span>.
          </motion.h2>

          {/* Right: body + sticky-pin sidekick */}
          <div className="md:pt-8">
            {/* Drop-in image slot. Save a JPG to /public/ship.jpg (recommended
                1000x1250, portrait orientation) and it renders here. Until then,
                a mint-deep "SHIP" plate stands in. */}
            <div className="md:sticky md:top-24 hidden md:block mb-8 aspect-[4/5] max-w-[280px]">
              <Img
                src="/ship.jpg"
                alt="A builder shipping"
                fallbackTone="mint-deep"
                fallbackLabel="SHIP"
                wrapperClassName="absolute inset-0 shadow-brutal"
                className="absolute inset-0 w-full h-full object-cover shadow-brutal"
              />
            </div>

            <motion.div
              className="space-y-6 text-lg md:text-xl leading-relaxed text-ink/85 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                For the first time, the gap between idea and shipped product is almost zero. AI didn&apos;t just change what you can build. It changed who gets to build it.
              </p>
              <p className="font-medium text-ink">
                First-time founders. Solo operators. People who&apos;ve never written a line of code.
              </p>
              <p>
                They&apos;re shipping, growing, and quietly rewriting what entrepreneurship looks like. Each episode, we sit down with one of them and go deep on how they&apos;re actually doing it.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

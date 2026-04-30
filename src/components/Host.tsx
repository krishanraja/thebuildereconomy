/**
 * @file Host.tsx
 * @description Cream block. Two-column with parallax portrait that scales 1→1.05
 * on scroll. Butter eyebrow, coral hover-underline on links.
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import krishHeadshot from "@/assets/krish-headshot.png";
import { Img } from "@/lib/images";
import { Button } from "./ui/button";
import { MagneticButton } from "./MagneticButton";

export const Host = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={ref} className="block-cream relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-center">
        {/* Portrait column */}
        <motion.div
          className="relative aspect-[4/5] w-full max-w-[480px] mx-auto md:mx-0"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            style={{ scale: portraitScale, y: portraitY }}
            className="absolute inset-0 overflow-hidden border-[6px] border-ink shadow-brutal-mint reduce-motion-static"
          >
            <Img
              src="/images/host/krish-portrait.jpg"
              fallbackSrc={krishHeadshot}
              alt="Krish Raja"
              fallbackTone="ink"
              fallbackLabel="KRISH"
              wrapperClassName="absolute inset-0"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <span className="absolute -bottom-3 -right-3 small-caps text-[10px] bg-butter text-ink px-2 py-1 z-10">
            HOST · 2026
          </span>
        </motion.div>

        {/* Bio column */}
        <div>
          <motion.div
            className="eyebrow text-coral mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-10 bg-coral" />
            <span>Your host</span>
          </motion.div>

          <motion.h2
            className="display-serif text-ink text-[clamp(3rem,8vw,7rem)] leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Krish<br />Raja.
          </motion.h2>

          <motion.div
            className="space-y-5 text-lg md:text-xl leading-relaxed text-ink/85 max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p>
              AI product builder. Advisor to some of the largest companies on earth on how to use AI without lighting money on fire. Founder of Mindmaker, where he runs 1:1 AI decision sprints for senior leaders at Series B and up.
            </p>
            <p>
              He&apos;s shipped AI products, engines, and clones — and spent years across the table from executives making decisions that don&apos;t make it into the press release.
            </p>
          </motion.div>

          <motion.p
            className="display-serif italic text-ink text-2xl md:text-3xl mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            The Builder Economy is where those conversations go{" "}
            <span className="relative inline-block group">
              <span>public</span>
              <span className="absolute left-0 right-0 -bottom-1 h-1 bg-coral origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <MagneticButton>
              <Button
                asChild
                className="rounded-none bg-ink text-cream hover:bg-ink hover:-translate-y-0.5 hover:shadow-brutal-mint transition-all px-7 py-6 text-base font-semibold"
              >
                <a
                  href="https://www.linkedin.com/in/krish-raja/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Connect on LinkedIn
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

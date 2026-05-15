/**
 * @file Hero.tsx
 * @description Editorial hero. Ink block, oversized display serif, magnetic CTAs,
 * mint highlighter swipe behind the payoff word. Right column reserves an
 * editorial cover that falls back to a butter Episode 01 plate until a real
 * portrait or cover image is dropped in.
 */

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import spotifyLogo from "@/assets/spotify-logo.png";
import youtubeLogo from "@/assets/youtube-logo.png";
import { MagneticButton } from "./MagneticButton";
import { Img } from "@/lib/images";

interface HeroProps {
  onApplyClick: () => void;
}

const headlineLineOneWords = ["Anyone", "can", "build", "now."];
const headlineLineTwoWords = ["This", "is", "what", "they're", "building."];

const wordVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 22, stiffness: 180 },
  },
};

const lineContainer = (delayChildren: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren },
  },
});

export const Hero = ({ onApplyClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen block-ink overflow-hidden grain">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-36 pb-16 md:pb-20 grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 items-end min-h-screen">
        {/* Left: type column */}
        <div className="relative">
          {/* Eyebrow */}
          <motion.div
            className="eyebrow text-butter mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-px w-10 bg-butter" />
            <span>A new podcast · launching 2026</span>
          </motion.div>

          {/* Display headline. Sized to fit the viewport without sprawling. */}
          <motion.h1
            className="display-serif text-cream text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02] mb-3 text-balance"
            variants={lineContainer(0.55)}
            initial="hidden"
            animate="visible"
          >
            {headlineLineOneWords.map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariants}>
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            className="display-serif text-cream/70 text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.02] mb-10 md:mb-12 text-balance"
            variants={lineContainer(0.85)}
            initial="hidden"
            animate="visible"
          >
            {headlineLineTwoWords.map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariants}>
                {w}
              </motion.span>
            ))}
          </motion.h2>

          {/* Sub */}
          <motion.p
            className="max-w-xl text-lg md:text-xl text-cream/80 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            A weekly conversation with the founders, solo operators and first-timers
            shipping real businesses with AI. Hosted by Krish Raja.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 md:gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <div className="relative group">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-none bg-mint text-ink hover:bg-mint hover:-translate-y-0.5 hover:shadow-brutal-cream transition-all px-7 py-6 text-base font-semibold cursor-not-allowed opacity-90"
                  disabled
                >
                  <img src={spotifyLogo} alt="" className="mr-2 h-5 w-auto" />
                  Listen on Spotify
                </Button>
              </MagneticButton>
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 small-caps text-[10px] text-butter opacity-0 group-hover:opacity-100 transition-opacity">
                Coming soon
              </span>
            </div>

            <div className="relative group">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-none bg-cream text-ink hover:bg-cream hover:-translate-y-0.5 hover:shadow-brutal-mint transition-all px-7 py-6 text-base font-semibold cursor-not-allowed opacity-90"
                  disabled
                >
                  <img src={youtubeLogo} alt="" className="mr-2 h-5 w-auto" />
                  Watch on YouTube
                </Button>
              </MagneticButton>
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 small-caps text-[10px] text-butter opacity-0 group-hover:opacity-100 transition-opacity">
                Coming soon
              </span>
            </div>

            <MagneticButton>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-none border-b-2 border-cream/30 hover:border-coral text-cream hover:bg-transparent hover:text-coral px-2 py-6 text-base"
                onClick={onApplyClick}
              >
                Apply to be a guest
                <ArrowUpRight className="ml-1 h-5 w-5" />
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <a
              href="https://live.themindmaker.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 small-caps text-xs text-cream/60 hover:text-mint transition-colors"
            >
              Join the community
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Right: editorial cover slot */}
        <motion.div
          className="hidden md:block relative aspect-[4/5] w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Drop-in image slot. Save a JPG to /public/hero.jpg (recommended
              1600x2000, portrait orientation) and it renders here automatically.
              Until then, the butter "01" plate stands in. */}
          <Img
            src="/hero.jpg"
            alt="The Builder Economy episode one cover"
            fallbackTone="butter"
            fallbackLabel="01"
            wrapperClassName="absolute inset-0 border-[6px] border-ink"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute -bottom-3 -left-3 small-caps text-[10px] bg-butter text-ink px-2 py-1">
            EP. 01 · 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * @file Hero.tsx
 * @description Editorial hero — ink block, oversized display serif, magnetic CTAs,
 * mint highlighter swipe behind the keyword. Right column reserved for an
 * editorial portrait that falls back to a typographic poster when the image
 * isn't dropped in yet.
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

const headlineTopWords = ["Everyone", "can"];
const headlineKeyword = "build";
const headlineRest = ["now."];
const headlineLineTwo = ["The", "good", "ones", "know", "how."];

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
            <span>A podcast for the people building with AI</span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 md:mb-10"
          >
            <img
              src="/builder3.png"
              alt="The Builder Economy"
              className="h-24 md:h-36 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>

          {/* Display headline — line 1 */}
          <motion.h1
            className="display-serif text-cream text-[clamp(3rem,9vw,8.5rem)] mb-2"
            variants={lineContainer(0.55)}
            initial="hidden"
            animate="visible"
          >
            {headlineTopWords.map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariants}>
                {w}
              </motion.span>
            ))}
            <motion.span className="inline-block mr-[0.15em]" variants={wordVariants}>
              <span className="swipe-mint italic text-ink font-bold">{headlineKeyword}</span>
            </motion.span>
            {headlineRest.map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariants}>
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Display headline — line 2 */}
          <motion.h2
            className="display-serif text-cream/70 text-[clamp(2rem,6vw,5.5rem)] mb-10 md:mb-14"
            variants={lineContainer(0.85)}
            initial="hidden"
            animate="visible"
          >
            {headlineLineTwo.map((w, i) => (
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
            The show for the operators turning ideas into shipped products — and saying out loud how they actually did it.
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

        {/* Right: editorial portrait slot */}
        <motion.div
          className="hidden md:block relative aspect-[4/5] w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Img
            src="/images/hero/hero-portrait.jpg"
            alt="The Builder Economy portrait"
            fallbackTone="ink-deep"
            fallbackLabel="THE / BUILDER / ECONOMY"
            wrapperClassName="absolute inset-0 border border-cream/15"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute -bottom-3 -left-3 small-caps text-[10px] bg-butter text-ink px-2 py-1">
            EP. 01 — 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
};

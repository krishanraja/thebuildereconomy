/**
 * @file Hero.tsx
 * @description Main hero section with podcast branding, cinematic tagline reveal, and CTAs.
 * @dependencies framer-motion, Button, logo assets, brand icons
 */

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";
import spotifyLogo from "@/assets/spotify-logo.png";
import youtubeLogo from "@/assets/youtube-logo.png";
import { WhoBuilds } from "./WhoBuilds";
import heroBackground from "@/assets/hero-background.gif";

interface HeroProps {
  onApplyClick: () => void;
}

const taglineWords = "Welcome to the era of AI-enabled builders.".split(" ");

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 20, stiffness: 200 },
  },
};

export const Hero = ({ onApplyClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <img
        src={heroBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        loading="eager"
        fetchPriority="low"
        aria-hidden="true"
      />
      
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
            src={logo} 
            alt="The Builder Economy" 
            className="w-full max-w-[150px] md:max-w-[19rem] mx-auto"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        
        {/* Word-by-word cinematic title reveal */}
        <motion.h1
          className="mt-8 mb-2 text-3xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto"
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {taglineWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${word === "AI-enabled" ? "text-gradient" : ""}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Spotify button */}
          <div className="relative group w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary/50 text-primary-foreground px-8 py-6 text-lg cursor-not-allowed opacity-80"
              disabled
            >
              <img src={spotifyLogo} alt="Spotify" className="mr-2 h-5 w-auto" />
              Listen on Spotify
            </Button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border-2 border-primary px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none">
              <span className="text-primary font-semibold">Coming Soon</span>
            </div>
          </div>

          {/* YouTube button */}
          <div className="relative group w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary/50 text-primary-foreground px-8 py-6 text-lg cursor-not-allowed opacity-80"
              disabled
            >
              <img src={youtubeLogo} alt="YouTube" className="mr-2 h-5 w-auto" />
              Watch on YouTube
            </Button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border-2 border-primary px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none">
              <span className="text-primary font-semibold">Coming Soon</span>
            </div>
          </div>
          
          {/* Apply button */}
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            onClick={onApplyClick}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Apply to Be a Guest
          </Button>
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="https://live.themindmaker.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Join the Community
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WhoBuilds />
      </div>
    </section>
  );
};

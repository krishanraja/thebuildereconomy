/**
 * @file Hero.tsx
 * @description Main hero section with podcast branding, tagline, and CTAs.
 * @dependencies framer-motion, Button, logo assets
 */

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Music2, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBackground from "@/assets/hero-background.gif";

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero = ({ onApplyClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBackground})` }}
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
            className="w-full max-w-[120px] md:max-w-[19rem] mx-auto"
          />
        </motion.div>
        
        <motion.p
          className="-mt-8 mb-2 text-lg md:text-2xl font-bold text-gradient max-w-3xl mx-auto tracking-normal leading-tight"
          style={{ textShadow: '0 2px 20px hsl(var(--glow-primary) / 0.2)', lineHeight: '1.2' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="hidden md:inline">Conversations to inspire a new era where everyone builds with AI.</span>
          <span className="md:hidden">Conversations to inspire a new era<br />where everyone builds with AI.</span>
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative group">
            <Button
              size="lg"
              className="bg-primary/50 text-primary-foreground px-8 py-6 text-lg cursor-not-allowed opacity-80"
              disabled
            >
              <Music2 className="mr-2 h-5 w-5" />
              Listen on Spotify
            </Button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border-2 border-primary px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none">
              <span className="text-primary font-semibold">Coming Soon</span>
            </div>
          </div>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            onClick={onApplyClick}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Apply to Be a Guest
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

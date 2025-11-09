import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Music2, MessageSquare } from "lucide-react";

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero = ({ onApplyClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to The Builder Economy
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Conversations with the pioneers building the next era of intelligence
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 glow-effect text-lg px-8 py-6"
            onClick={() => window.open("https://open.spotify.com", "_blank")}
          >
            <Music2 className="mr-2 h-5 w-5" />
            Listen on Spotify
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
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

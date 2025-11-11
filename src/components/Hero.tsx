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
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto space-y-2"
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
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
        
        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Conversations with the pioneers building the next era of intelligence
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            className="bg-primary hover:bg-primary/90 glow-effect px-4 py-2"
            onClick={() => window.open("https://open.spotify.com", "_blank")}
          >
            <Music2 className="mr-2 h-4 w-4" />
            Listen on Spotify
          </Button>
          
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-4 py-2"
            onClick={onApplyClick}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Apply to Be a Guest
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

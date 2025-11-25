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
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Conversations to inspire a new era where everyone builds with AI.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect px-8 py-6 text-lg"
            onClick={() => window.open("https://open.spotify.com", "_blank")}
          >
            <Music2 className="mr-2 h-5 w-5" />
            Listen on Spotify
          </Button>
          
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

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Music2, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero = ({ onApplyClick }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden py-12">
      <div className="absolute inset-0 gradient-mesh" />
      
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto space-y-6"
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
            className="w-full max-w-2xl mx-auto -mt-6"
          />
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Conversations with the pioneers building the next era of intelligence
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 glow-effect text-lg px-6 py-4"
            onClick={() => window.open("https://open.spotify.com", "_blank")}
          >
            <Music2 className="mr-2 h-5 w-5" />
            Listen on Spotify
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 text-lg px-6 py-4"
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

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Mail, ArrowUpRight } from "lucide-react";

export const Subscribe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glow-effect rounded-2xl p-12 bg-card/50 backdrop-blur border border-primary/20">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join The <span className="text-gradient">Builder Circle</span>
          </h2>

          <p className="text-muted-foreground mb-8">
            Get exclusive insights, early access to episodes, and join a community
            of pioneers building the future with AI.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 glow-effect px-8 py-6 text-lg"
          >
            <a
              href="https://live.themindmaker.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Now
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

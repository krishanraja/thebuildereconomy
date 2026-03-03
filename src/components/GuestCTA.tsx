import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface GuestCTAProps {
  onApplyClick: () => void;
}

export const GuestCTA = ({ onApplyClick }: GuestCTAProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          Want to be on the <span className="text-gradient">show</span>?
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          We're booking builders who are turning ideas into real products with AI — and can talk honestly about what it took. If you're building something worth talking about, apply below.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            onClick={onApplyClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg glow-effect"
          >
            Apply to Be a Guest
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

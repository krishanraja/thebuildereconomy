import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          About the <span className="text-gradient">Builder Economy</span>
        </h2>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          The Builder Economy explores how AI, automation, and human creativity merge 
          to form the next wave of innovation. Join us as we sit down with founders, 
          creators, and visionaries who are shaping the future where humans and AI build side by side.
        </p>
      </motion.div>
    </section>
  );
};

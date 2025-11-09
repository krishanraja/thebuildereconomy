import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const tags = [
  "Founders",
  "Creators",
  "Investors",
  "Futurists",
  "Builders",
  "Engineers",
  "Designers",
  "Researchers",
  "Innovators",
  "Visionaries"
];

export const WhoBuilds = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Who <span className="text-gradient">Builds Here</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-full 
                         text-primary font-semibold hover:bg-primary/20 hover:scale-105 
                         transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

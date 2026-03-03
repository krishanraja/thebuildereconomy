import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10"
          variants={itemVariants}
        >
          About the <span className="text-gradient">Show</span>
        </motion.h2>

        <motion.p
          className="text-xl text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          The Creator Economy gave everyone a camera and mic. The Builder Economy gives everyone a digital factory.
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          For the first time, the gap between idea and reality is almost nothing. AI hasn't just changed what you can build — it's changed who can build it. First-time founders. Solo operators. People with zero engineering background. They're shipping products, growing companies, and rewriting what entrepreneurship looks like.
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground leading-relaxed"
          variants={itemVariants}
        >
          The Builder Economy is the show that documents this era. Every week, we sit down with the people building it — and go deep on how they're actually doing it.
        </motion.p>
      </motion.div>
    </section>
  );
};

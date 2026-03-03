import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, User } from "lucide-react";
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

const photoVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const Host = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="grid md:grid-cols-[280px_1fr] gap-10 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Host photo placeholder */}
          <motion.div
            variants={photoVariants}
            className="mx-auto md:mx-0 w-64 h-64 md:w-[280px] md:h-[320px] rounded-2xl bg-card/60 border border-primary/20 flex items-center justify-center"
          >
            <User className="w-20 h-20 text-muted-foreground/40" />
          </motion.div>

          {/* Bio */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-2"
              variants={itemVariants}
            >
              Your Host
            </motion.h2>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-gradient mb-6"
              variants={itemVariants}
            >
              Krish Raja
            </motion.h3>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-4"
              variants={itemVariants}
            >
              AI product builder, AI &amp; data advisor to the largest businesses, and Founder of Mindmaker, where he runs 1:1 AI decision sprints for senior leaders at Series B+ companies.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-4"
              variants={itemVariants}
            >
              He's built and shipped multiple AI products, engines, clones and systems — and spent years sitting across the table from executives navigating decisions that don't make it into the press release.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/90 font-medium italic mb-6"
              variants={itemVariants}
            >
              The Builder Economy is where those conversations go public.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                variant="outline"
                className="border-primary/40 hover:bg-primary/10"
              >
                <a
                  href="https://www.linkedin.com/in/krish-raja/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

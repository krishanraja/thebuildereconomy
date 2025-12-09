/**
 * @file animations.ts
 * @description Centralized animation variants for Framer Motion.
 * Import and reuse these across components for consistency.
 * 
 * @usage
 * import { fadeInUp, staggerContainer } from '@/lib/animations';
 * <motion.div variants={fadeInUp} initial="initial" animate="animate">
 */

import type { Variants, Transition } from 'framer-motion';

/**
 * Standard transition configurations
 */
export const transitions = {
  fast: { duration: 0.15, ease: 'easeOut' } as Transition,
  normal: { duration: 0.3, ease: 'easeOut' } as Transition,
  slow: { duration: 0.8, ease: 'easeOut' } as Transition,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
} as const;

/**
 * Fade in from bottom
 * Common for section entries and hero elements
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.slow,
  },
};

/**
 * Fade in only (no movement)
 * For subtle appearances
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: transitions.slow,
  },
};

/**
 * Scale in with fade
 * For modals and overlays
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.normal,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: transitions.fast,
  },
};

/**
 * Slide in from right
 * For sidebars and drawers
 */
export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { 
    x: 0,
    transition: transitions.normal,
  },
  exit: { 
    x: '100%',
    transition: transitions.fast,
  },
};

/**
 * Slide in from left
 * For navigation drawers
 */
export const slideInLeft: Variants = {
  initial: { x: '-100%' },
  animate: { 
    x: 0,
    transition: transitions.normal,
  },
  exit: { 
    x: '-100%',
    transition: transitions.fast,
  },
};

/**
 * Stagger container for child animations
 * Apply to parent, children will animate in sequence
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger item (use with staggerContainer)
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.normal,
  },
};

/**
 * Hover scale effect
 * For interactive cards and buttons
 */
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.fast,
};

/**
 * In-view animation trigger config
 * For scroll-triggered animations
 */
export const inViewConfig = {
  once: true,
  margin: '-100px',
} as const;

/**
 * Hero section delays (in seconds)
 * Staggered appearance for hero elements
 */
export const heroDelays = {
  container: 0.2,
  logo: 0.4,
  tagline: 0.6,
  buttons: 0.8,
} as const;

export default {
  transitions,
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInRight,
  slideInLeft,
  staggerContainer,
  staggerItem,
  hoverScale,
  inViewConfig,
  heroDelays,
};

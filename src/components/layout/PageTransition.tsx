
import React from 'react';
import { motion } from 'framer-motion';

type PageTransitionProps = {
  children: React.ReactNode;
};

// Variants for the page transition animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Staggered animation for children
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      <motion.div variants={containerVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;

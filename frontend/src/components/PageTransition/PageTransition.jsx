import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const reducedPageVariants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.35,
};

function PageTransition({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedPageVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={prefersReducedMotion ? { duration: 0 } : pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;

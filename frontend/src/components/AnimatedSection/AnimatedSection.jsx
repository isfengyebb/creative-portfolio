import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay: prefersReducedMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;

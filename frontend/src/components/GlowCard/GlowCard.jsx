import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

function GlowCard({ children, className = '' }) {
  return (
    <motion.div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all',
        'hover:border-primary/30 hover:shadow-md hover:shadow-primary/5',
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

export default GlowCard;

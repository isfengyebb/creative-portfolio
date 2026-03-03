import { motion } from 'framer-motion';
import styles from './GlowCard.module.css';

function GlowCard({ children, className = '', glowColor = 'primary' }) {
  const glowClass = styles[`glow-${glowColor}`] || '';

  return (
    <motion.div
      className={`${styles.card} ${glowClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

export default GlowCard;

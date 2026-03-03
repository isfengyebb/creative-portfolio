import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SkillBar.module.css';

function SkillBar({ name, level, color = 'primary' }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const colorVar = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    pink: 'var(--color-pink)',
  };

  return (
    <div ref={ref} className={styles.skillBar}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.level}>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ backgroundColor: colorVar[color] }}
        />
      </div>
    </div>
  );
}

export default SkillBar;

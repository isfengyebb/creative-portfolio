import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SkillBar.module.css';

function SkillBar({ name, level, color = 'primary' }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const colorVar = {
    primary: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
    accent: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
    pink: 'linear-gradient(90deg, var(--color-rose), #fb7185)',
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
          style={{ background: colorVar[color] }}
        />
      </div>
    </div>
  );
}

export default SkillBar;

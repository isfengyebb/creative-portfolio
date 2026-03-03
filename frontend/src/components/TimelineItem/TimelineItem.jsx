import AnimatedSection from '../AnimatedSection';
import styles from './TimelineItem.module.css';

function TimelineItem({
  title,
  subtitle,
  period,
  description,
  isLast = false,
}) {
  return (
    <AnimatedSection className={styles.item}>
      <div className={styles.marker}>
        <div className={styles.dot} />
        {!isLast && <div className={styles.line} />}
      </div>
      <div className={styles.content}>
        <span className={styles.period}>{period}</span>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </AnimatedSection>
  );
}

export default TimelineItem;

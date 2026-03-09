import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '../../lib/utils';

const colorClasses = {
  primary: 'from-primary to-primary/60',
  accent: 'from-accent to-accent/60',
  pink: 'from-pink-500 to-pink-400',
};

function SkillBar({ name, level, color = 'primary' }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            colorClasses[color] || colorClasses.primary
          )}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default SkillBar;

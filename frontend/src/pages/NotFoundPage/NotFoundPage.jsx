import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import PageTransition from '../../components/PageTransition';

const generateStars = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

function NotFoundPage() {
  const { t } = useTranslation();
  const [stars] = useState(generateStars);

  return (
    <PageTransition>
      <main className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden">
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-foreground/30"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: star.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
          <motion.div
            className="flex items-center text-8xl font-bold tracking-tight md:text-9xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <span className="text-foreground/80">4</span>
            <motion.span
              className="mx-2 rounded-full bg-primary px-4 py-2 text-primary-foreground"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(124, 58, 237, 0.4)',
                  '0 0 60px rgba(124, 58, 237, 0.8)',
                  '0 0 20px rgba(124, 58, 237, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              0
            </motion.span>
            <span className="text-foreground/80">4</span>
          </motion.div>

          <motion.h1
            className="text-2xl font-semibold text-foreground md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t('notFound.title')}
          </motion.h1>

          <motion.p
            className="max-w-md text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {t('notFound.message')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button asChild size="lg">
              <Link to="/">
                {t('notFound.goHome')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}

export default NotFoundPage;
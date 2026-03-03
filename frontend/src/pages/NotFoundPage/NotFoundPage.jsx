import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';
import PageTransition from '../../components/PageTransition';
import styles from './NotFoundPage.module.css';

const generateStars = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

function NotFoundPage() {
  const [stars] = useState(generateStars);

  return (
    <PageTransition>
      <ParticleBackground />
      <main className={styles.page}>
        <div className={styles.stars}>
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className={styles.star}
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

        <div className={styles.content}>
          <motion.div
            className={styles.errorCode}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <span className={styles.four}>4</span>
            <motion.span
              className={styles.zero}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(108, 92, 231, 0.4)',
                  '0 0 60px rgba(108, 92, 231, 0.8)',
                  '0 0 20px rgba(108, 92, 231, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              0
            </motion.span>
            <span className={styles.four}>4</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            迷失在宇宙中
          </motion.h1>

          <motion.p
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            你访问的页面似乎已经漂浮到了未知的星际空间
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/" className={styles.homeLink}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                返回地球
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}

export default NotFoundPage;

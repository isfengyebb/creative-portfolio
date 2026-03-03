import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';
import PageTransition from '../../components/PageTransition';
import AnimatedSection from '../../components/AnimatedSection';
import { useProfileData } from '../../hooks/useProfileData';
import styles from './HomePage.module.css';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function HomePage() {
  const { profile, loading, error } = useProfileData();
  const prefersReducedMotion = usePrefersReducedMotion();

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 },
    },
  };

  if (loading) {
    return (
      <PageTransition>
        <div className={styles.loading}>加载中...</div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className={styles.error}>加载失败: {error}</div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ParticleBackground />
      <main className={styles.hero}>
        <div className={styles.container}>
          <AnimatedSection>
            <motion.div
              className={styles.avatarWrapper}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className={styles.avatar}
              />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h1 className={styles.name}>{profile.name}</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <motion.h2
              className={styles.title}
              variants={typingVariants}
              initial="hidden"
              animate="visible"
            >
              {(profile?.title || '').split('').map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
              <motion.span
                className={styles.cursor}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              >
                |
              </motion.span>
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <p className={styles.subtitle}>{profile.subtitle}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className={styles.bio}>{profile.bio}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.7}>
            <div className={styles.highlights}>
              {profile.highlights.map((item, index) => (
                <motion.span
                  key={index}
                  className={styles.highlight}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <div className={styles.socialLinks}>
              {profile.social.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  Icon && (
                    <motion.a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      title={item.platform}
                    >
                      <Icon size={24} />
                    </motion.a>
                  )
                );
              })}
              <motion.a
                href={`mailto:${profile.email}`}
                className={styles.socialLink}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.95 }}
                title="Email"
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </PageTransition>
  );
}

export default HomePage;

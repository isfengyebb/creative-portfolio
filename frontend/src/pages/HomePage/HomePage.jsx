import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        <div className={styles.loading}>{t('loading')}</div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className={styles.error}>
          {t('loadingFailed')} {error}
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ParticleBackground />
      <main className={styles.hero}>
        <div className={styles.container}>

          {/* ─── 左栏：头像 ─── */}
          <AnimatedSection>
            <div className={styles.left}>
              <motion.div
                className={styles.avatarWrapper}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
              >
                <div className={styles.orbitContainer}>
                  <div className={styles.orbitRingOuter}>
                    <div className={`${styles.orbitDot} ${styles.orbitDotPurple}`} />
                  </div>
                  <div className={styles.orbitRingMiddle}>
                    <div className={`${styles.orbitDot} ${styles.orbitDotCyan}`} />
                  </div>
                </div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className={styles.avatar}
                />
              </motion.div>

              <motion.div
                className={styles.statusRow}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className={styles.statusDot} />
                <span>Available</span>
              </motion.div>

              {profile.location && (
                <motion.div
                  className={styles.location}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  📍 {profile.location}
                </motion.div>
              )}
            </div>
          </AnimatedSection>

          {/* ─── 右栏：内容 ─── */}
          <div className={styles.right}>
            <AnimatedSection delay={0.15}>
              <span className={styles.label}>// hello world</span>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <h1 className={styles.name}>{profile.name}</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <motion.div
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
                <span className={styles.cursor} />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={styles.divider} />
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <p className={styles.subtitle}>{profile.subtitle}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <p className={styles.bio}>{profile.bio}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.55}>
              <div className={styles.highlights}>
                {profile.highlights.map((item, index) => (
                  <motion.span
                    key={index}
                    className={styles.highlight}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>▸</span>
                    {item}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={item.platform}
                      >
                        <Icon size={18} />
                      </motion.a>
                    )
                  );
                })}
                <motion.a
                  href={`mailto:${profile.email}`}
                  className={styles.socialLink}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Email"
                >
                  <FaEnvelope size={18} />
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

export default HomePage;

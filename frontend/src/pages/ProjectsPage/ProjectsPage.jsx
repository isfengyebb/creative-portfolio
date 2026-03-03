import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import PageTransition from '../../components/PageTransition';
import AnimatedSection from '../../components/AnimatedSection';
import GlowCard from '../../components/GlowCard';
import { useProjectsData } from '../../hooks/useProjectsData';
import styles from './ProjectsPage.module.css';

const CATEGORY_KEYS = [
  { key: 'all', i18nKey: 'projects.all' },
  { key: 'frontend', i18nKey: 'projects.frontend' },
  { key: 'backend', i18nKey: 'projects.backend' },
  { key: 'fullstack', i18nKey: 'projects.fullstack' },
  { key: 'tools', i18nKey: 'projects.tools' },
];

function ProjectsPage() {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjectsData();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
        <div className={styles.error}>{t('loadingFailed')} {error}</div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className={styles.page}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.pageTitleWrapper}>
              <span className={styles.pageTitleLabel}>// portfolio</span>
              <h1 className={styles.pageTitle}>{t('projects.title')}</h1>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className={styles.filters}>
              {CATEGORY_KEYS.map((cat) => (
                <motion.button
                  key={cat.key}
                  className={`${styles.filterBtn} ${
                    activeCategory === cat.key ? styles.active : ''
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(cat.i18nKey)}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 0.1}>
                  <GlowCard className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.image}
                      />
                      {project.featured && (
                        <span className={styles.featured}>{t('projects.featured')}</span>
                      )}
                    </div>
                    <div className={styles.content}>
                      <h3 className={styles.title}>{project.title}</h3>
                      <p className={styles.description}>{project.description}</p>
                      <div className={styles.tags}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={styles.links}>
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            whileHover={{ scale: 1.1 }}
                            title={t('projects.viewSource')}
                          >
                            <FaGithub size={18} />
                          </motion.a>
                        )}
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            whileHover={{ scale: 1.1 }}
                            title={t('projects.liveDemo')}
                          >
                            <FaExternalLinkAlt size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}

export default ProjectsPage;

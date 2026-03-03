import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import PageTransition from '../../components/PageTransition';
import AnimatedSection from '../../components/AnimatedSection';
import GlowCard from '../../components/GlowCard';
import { useProjectsData } from '../../hooks/useProjectsData';
import styles from './ProjectsPage.module.css';

const categories = [
  { key: 'all', label: '全部' },
  { key: 'frontend', label: '前端' },
  { key: 'backend', label: '后端' },
  { key: 'fullstack', label: '全栈' },
  { key: 'tools', label: '工具' },
];

function ProjectsPage() {
  const { projects, loading, error } = useProjectsData();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
      <main className={styles.page}>
        <div className={styles.container}>
          <AnimatedSection>
            <h1 className={styles.pageTitle}>作品集</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className={styles.filters}>
              {categories.map((cat) => (
                <motion.button
                  key={cat.key}
                  className={`${styles.filterBtn} ${
                    activeCategory === cat.key ? styles.active : ''
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.label}
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
                        <span className={styles.featured}>精选</span>
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
                            title="查看源码"
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
                            title="在线演示"
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

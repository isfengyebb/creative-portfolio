import { useTranslation } from 'react-i18next';
import PageTransition from '../../components/PageTransition';
import AnimatedSection from '../../components/AnimatedSection';
import TimelineItem from '../../components/TimelineItem';
import SkillBar from '../../components/SkillBar';
import GlowCard from '../../components/GlowCard';
import { useResumeData } from '../../hooks/useResumeData';
import styles from './ResumePage.module.css';

const categoryColors = {
  frontend: 'primary',
  backend: 'accent',
  devops: 'pink',
  tools: 'primary',
  design: 'accent',
};

const CATEGORY_I18N_KEYS = {
  frontend: 'resume.categories.frontend',
  backend: 'resume.categories.backend',
  devops: 'resume.categories.devops',
  tools: 'resume.categories.tools',
  design: 'resume.categories.design',
};

function ResumePage() {
  const { t } = useTranslation();
  const { resume, loading, error } = useResumeData();

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

  const groupedSkills = resume.skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <PageTransition>
      <main className={styles.page}>
        <div className={styles.container}>

          <AnimatedSection>
            <div className={styles.pageTitleWrapper}>
              <span className={styles.pageTitleLabel}>// about me</span>
              <h1 className={styles.pageTitle}>{t('resume.title')}</h1>
            </div>
          </AnimatedSection>

          {/* ─── 两栏：教育 + 经验 ─── */}
          <div className={styles.layout}>
            {/* 教育背景 */}
            <section className={styles.section}>
              <AnimatedSection>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>01</span>
                  <h2 className={styles.sectionTitle}>{t('resume.education')}</h2>
                </div>
              </AnimatedSection>
              <div className={styles.timeline}>
                {resume.education.map((edu, index) => (
                  <TimelineItem
                    key={edu.id}
                    title={edu.school}
                    subtitle={edu.degree}
                    period={edu.period}
                    description={edu.description}
                    isLast={index === resume.education.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* 工作经历 */}
            <section className={styles.section}>
              <AnimatedSection>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNum}>02</span>
                  <h2 className={styles.sectionTitle}>{t('resume.experience')}</h2>
                </div>
              </AnimatedSection>
              <div className={styles.timeline}>
                {resume.experience.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    title={exp.position}
                    subtitle={exp.company}
                    period={exp.period}
                    description={
                      exp.highlights && (
                        <ul className={styles.highlights}>
                          {exp.highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )
                    }
                    isLast={index === resume.experience.length - 1}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* ─── 技能 ─── */}
          <section className={styles.skillsSection}>
            <AnimatedSection>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>{t('resume.skills')}</h2>
              </div>
            </AnimatedSection>
            <div className={styles.skillsGrid}>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <AnimatedSection key={category} delay={0.1}>
                  <GlowCard className={styles.skillCard}>
                    <h3 className={styles.skillCategory}>
                      {t(CATEGORY_I18N_KEYS[category] || category)}
                    </h3>
                    {skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={categoryColors[category]}
                      />
                    ))}
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </section>

        </div>
      </main>
    </PageTransition>
  );
}

export default ResumePage;

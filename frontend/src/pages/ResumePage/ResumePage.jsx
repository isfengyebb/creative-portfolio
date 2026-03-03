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

function ResumePage() {
  const { resume, loading, error } = useResumeData();

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

  const groupedSkills = resume.skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryLabels = {
    frontend: '前端开发',
    backend: '后端开发',
    devops: 'DevOps',
    tools: '工具',
    design: '设计',
  };

  return (
    <PageTransition>
      <main className={styles.page}>
        <div className={styles.container}>
          <AnimatedSection>
            <h1 className={styles.pageTitle}>我的简历</h1>
          </AnimatedSection>

          <section className={styles.section}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>教育背景</h2>
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

          <section className={styles.section}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>工作经历</h2>
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

          <section className={styles.section}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>专业技能</h2>
            </AnimatedSection>
            <div className={styles.skillsGrid}>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <AnimatedSection key={category} delay={0.2}>
                  <GlowCard className={styles.skillCard}>
                    <h3 className={styles.skillCategory}>
                      {categoryLabels[category] || category}
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

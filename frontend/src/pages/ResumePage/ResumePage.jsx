import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import PageTransition from '../../components/PageTransition';
import TimelineItem from '../../components/TimelineItem';
import SkillBar from '../../components/SkillBar';
import GlowCard from '../../components/GlowCard';
import { useResumeData } from '../../hooks/useResumeData';

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
        <div className="flex min-h-[60vh] items-center justify-center text-lg text-muted-foreground">
          {t('loading')}
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] items-center justify-center text-lg text-destructive">
          {t('loadingFailed')} {error}
        </div>
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
      <main className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-5xl px-4 py-16">
          {/* Decorative Borders */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-1 size-full overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          </div>

          {/* Page Title */}
          <div className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards mb-12 text-center duration-500">
            <span className="font-mono text-sm text-accent">// about me</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              {t('resume.title')}
            </h1>
          </div>

          {/* Education & Experience Grid */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education */}
            <section>
              <div className="fade-in slide-in-from-bottom-4 animate-in fill-mode-backwards mb-6 flex items-center gap-3 duration-500">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  01
                </span>
                <h2 className="text-xl font-semibold">{t('resume.education')}</h2>
              </div>
              <div className="space-y-0">
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

            {/* Experience */}
            <section>
              <div className="fade-in slide-in-from-bottom-4 animate-in fill-mode-backwards mb-6 flex items-center gap-3 duration-500">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  02
                </span>
                <h2 className="text-xl font-semibold">{t('resume.experience')}</h2>
              </div>
              <div className="space-y-0">
                {resume.experience.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    title={exp.position}
                    subtitle={exp.company}
                    period={exp.period}
                    description={
                      exp.highlights && (
                        <ul className="ml-4 list-disc space-y-1">
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

          {/* Skills */}
          <section className="mt-16">
            <div className="fade-in slide-in-from-bottom-4 animate-in fill-mode-backwards mb-8 flex items-center gap-3 duration-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                03
              </span>
              <h2 className="text-xl font-semibold">{t('resume.skills')}</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <GlowCard key={category}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(CATEGORY_I18N_KEYS[category] || category)}
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={categoryColors[category]}
                      />
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>
        </section>
      </main>
    </PageTransition>
  );
}

export default ResumePage;

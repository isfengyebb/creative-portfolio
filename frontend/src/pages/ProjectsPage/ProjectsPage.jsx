import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import PageTransition from '../../components/PageTransition';
import { useProjectsData } from '../../hooks/useProjectsData';

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

  return (
    <PageTransition>
      <main className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-5xl px-4 py-16">
          {/* Decorative Borders */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[-1] size-full overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          </div>

          {/* Page Title */}
          <div className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards mb-12 text-center duration-500">
            <span className="font-mono text-sm text-accent">{'// portfolio'}</span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              {t('projects.title')}
            </h1>
          </div>

          {/* Filter Buttons */}
          <div className="fade-in slide-in-from-bottom-4 animate-in fill-mode-backwards mb-8 flex flex-wrap justify-center gap-2 duration-500">
            {CATEGORY_KEYS.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.key)}
                className="rounded-full"
              >
                {t(cat.i18nKey)}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    'group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all',
                    'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
                  )}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                        {t('projects.featured')}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-lime-500/25 bg-lime-500/10 px-2 py-0.5 text-xs font-medium text-lime-600 dark:text-lime-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-4 flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'ghost', size: 'sm' }),
                            'gap-1.5'
                          )}
                          title={t('projects.viewSource')}
                        >
                          <FaGithub className="size-4" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'ghost', size: 'sm' }),
                            'gap-1.5'
                          )}
                          title={t('projects.liveDemo')}
                        >
                          <FaExternalLinkAlt className="size-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}

export default ProjectsPage;

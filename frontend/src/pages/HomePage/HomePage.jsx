import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { ArrowRightIcon, RocketIcon } from 'lucide-react';
import { Button, buttonVariants } from '../../components/ui/button';
import { InfiniteSlider } from '../../components/ui/infinite-slider';
import { cn } from '../../lib/utils';
import PageTransition from '../../components/PageTransition';
import { useProfileData } from '../../hooks/useProfileData';

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
};

const techLogos = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Vue', icon: '💚' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
];

function HomePage() {
  const { t } = useTranslation();
  const { profile, loading, error } = useProfileData();

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
      <main className="relative flex w-full flex-col">
        {/* Hero Section */}
        <section className="mx-auto w-full">
          {/* Top Shades */}
          <div
            aria-hidden="true"
            className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
          >
            <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
          </div>

          {/* X Bold Faded Borders */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mx-auto hidden min-h-screen w-full lg:block"
          >
            <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
            <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col items-center justify-center gap-6 pt-24 pb-16">
            {/* X Content Faded Borders */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-1 size-full overflow-hidden"
            >
              <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
              <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
              <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
              <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
            </div>

            {/* Status Badge */}
            <Link
              to="/resume"
              className={cn(
                'group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow',
                'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out'
              )}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">{t('home.available')}</span>
              <span className="block h-5 border-l" />
              <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
            </Link>

            {/* Avatar */}
            <motion.div
              className={cn(
                'fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out'
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-24 w-24 rounded-full border-2 border-primary/50 object-cover shadow-lg"
                />
              </div>
            </motion.div>

            {/* Name */}
            <h1
              className={cn(
                'fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl font-bold tracking-tight delay-200 duration-500 ease-out md:text-5xl lg:text-6xl',
                'bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent'
              )}
            >
              {profile.name}
            </h1>

            {/* Title */}
            <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-md animate-in fill-mode-backwards text-center text-lg font-medium text-foreground/80 tracking-wider delay-300 duration-500 ease-out md:text-xl">
              {profile.title}
            </p>

            {/* Subtitle */}
            <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-lg animate-in fill-mode-backwards text-center text-base text-muted-foreground delay-400 duration-500 ease-out">
              {profile.subtitle}
            </p>

            {/* Bio */}
            <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-xl animate-in fill-mode-backwards text-center text-sm text-muted-foreground/80 leading-relaxed delay-500 duration-500 ease-out">
              {profile.bio}
            </p>

            {/* Highlights */}
            <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-wrap items-center justify-center gap-2 fill-mode-backwards pt-2 delay-600 duration-500 ease-out">
              {profile.highlights.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/25 bg-lime-500/10 px-3 py-1 text-xs font-medium text-lime-600 dark:text-lime-400"
                >
                  <span>▸</span>
                  {item}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="fade-in slide-in-into-view-10 flex animate-in relative z-20 flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-4 delay-700 duration-500 ease-out">
              <Button className="rounded-full" size="lg" variant="secondary" asChild>
                <a href="https://github.com/isfengyebb">
                  <FaEnvelope className="mr-2 size-4" />
                  {t('home.contactMe')}
                </a>
              </Button>
              <Button className="rounded-full" size="lg" asChild>
                <Link to="/projects">
                  {t('home.viewWork')}
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="fade-in slide-in-from-bottom-10 flex animate-in relative z-20 items-center gap-2 fill-mode-backwards pt-2 delay-800 duration-500 ease-out">
              {profile.social.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  Icon && (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'icon' }),
                        'rounded-full'
                      )}
                      title={item.platform}
                    >
                      <Icon size={18} />
                    </a>
                  )
                );
              })}
            </div>
          </div>
        </section>

        {/* LogoCloud Section */}
        <section className="relative border-t pt-6 pb-10">
          <h2 className="text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
            {t('home.techStack')} <span className="text-foreground">{t('home.expert')}</span>
          </h2>
          <div className="relative z-10 mx-auto mt-4 max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
            <InfiniteSlider gap={42} reverse speed={80} speedOnHover={200}>
              {techLogos.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

export default HomePage;

import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../constants';
import { cn } from '../../lib/utils';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear}{' '}
          <span className="font-medium text-foreground">Feng&apos;s Space</span>
          . {t('footer.builtWith')}.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            to={ROUTES.HOME}
            className={cn(
              'text-sm text-muted-foreground transition-colors',
              'hover:text-foreground'
            )}
          >
            {t('nav.home')}
          </Link>
          <Link
            to={ROUTES.RESUME}
            className={cn(
              'text-sm text-muted-foreground transition-colors',
              'hover:text-foreground'
            )}
          >
            {t('nav.resume')}
          </Link>
          <Link
            to={ROUTES.PROJECTS}
            className={cn(
              'text-sm text-muted-foreground transition-colors',
              'hover:text-foreground'
            )}
          >
            {t('nav.projects')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

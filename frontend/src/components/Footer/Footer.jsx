import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../constants';
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          &copy; {currentYear}{' '}
          <span className={styles.footerHighlight}>Feng's Space</span>
          . {t('footer.builtWith')}.
        </p>
        <nav className={styles.footerLinks}>
          <Link to={ROUTES.HOME} className={styles.footerLink}>
            {t('nav.home')}
          </Link>
          <Link to={ROUTES.RESUME} className={styles.footerLink}>
            {t('nav.resume')}
          </Link>
          <Link to={ROUTES.PROJECTS} className={styles.footerLink}>
            {t('nav.projects')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

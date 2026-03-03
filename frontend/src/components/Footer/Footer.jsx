import { Link } from 'react-router';
import { ROUTES } from '../../constants';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          &copy; {currentYear}{' '}
          <span className={styles.footerHighlight}>Feng's Space</span>
          . Built with React & creativity.
        </p>
        <nav className={styles.footerLinks}>
          <Link to={ROUTES.HOME} className={styles.footerLink}>
            首页
          </Link>
          <Link to={ROUTES.RESUME} className={styles.footerLink}>
            简历
          </Link>
          <Link to={ROUTES.PROJECTS} className={styles.footerLink}>
            作品集
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

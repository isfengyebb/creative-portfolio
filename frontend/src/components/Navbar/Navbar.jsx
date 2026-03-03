import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '../../constants';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './Navbar.module.css';

function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const navbarClass = `${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`;
  const hamburgerClass = `${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`;

  return (
    <>
      <nav className={navbarClass}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.logo}>
            Feng's Space
          </Link>

          <div className={styles.navRight}>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                  >
                    {t(link.label)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <LanguageSwitcher />
          </div>

          <div className={styles.mobileActions}>
            <LanguageSwitcher />
            <button
              className={hamburgerClass}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={t('nav.toggleMenu')}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
            }
            onClick={closeMobile}
          >
            {t(link.label)}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Navbar;

import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router';
import { NAV_LINKS } from '../../constants';
import styles from './Navbar.module.css';

function Navbar() {
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
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={hamburgerClass}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="切换菜单"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
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
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Navbar;

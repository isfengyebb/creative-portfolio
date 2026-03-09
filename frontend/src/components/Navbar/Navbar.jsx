'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '../../lib/utils';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { useScroll } from '../ui/use-scroll';
import { NAV_LINKS } from '../../constants';
import LanguageSwitcher from '../LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMobile = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="hover:bg-accent rounded-md p-2 text-lg font-semibold tracking-tight"
        >
          Feng&apos;s Space
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.filter((link) => link.path !== '/demo').map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  isActive && 'bg-accent text-accent-foreground'
                )
              }
            >
              {t(link.label)}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('nav.toggleMenu')}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-2">
        <div className="grid gap-y-2">
          {NAV_LINKS.filter((link) => link.path !== '/demo').map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={closeMobile}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: 'ghost',
                    className: 'justify-start',
                  }),
                  isActive && 'bg-accent text-accent-foreground'
                )
              }
            >
              {t(link.label)}
            </NavLink>
          ))}
        </div>
      </MobileMenu>
    </header>
  );
}

function MobileMenu({ open, children, className }) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden'
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-4',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Navbar;

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './ui/Logo';
import { NAV_LINKS, CONTACT, VERIFIED } from '../data/company';

/**
 * Navbar. Transparent over the Home hero (dark), condensing to a solid WHITE
 * bar after scroll. On inner pages (no full-height hero) it is solid from the
 * top. Link/logo colours flip with the background for contrast.
 */
export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const phoneReady = VERIFIED.contact && CONTACT.phoneHref;

  // On a solid (white) bar, text is dark; over the hero it's light.
  const onLight = scrolled;

  return (
    <header
      id="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled
          ? 'border-b border-line bg-canvas/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className={`shell flex items-center justify-between py-4 md:py-5 ${
          onLight ? 'text-ink' : 'text-warm'
        }`}
        aria-label="Primary"
      >
        <Link to="/" className="shrink-0" aria-label="VIP Transport — home">
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-sans text-sm transition-colors duration-300 ${
                    isActive
                      ? onLight
                        ? 'text-brand'
                        : 'text-brand'
                      : onLight
                        ? 'text-graphite hover:text-ink'
                        : 'text-steel hover:text-warm'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          {phoneReady && (
            <a
              href={CONTACT.phoneHref}
              className={`flex items-center gap-2 text-sm transition-colors ${
                onLight ? 'text-ink hover:text-brand' : 'text-warm hover:text-brand'
              }`}
            >
              <Phone size={16} />
              {CONTACT.phone}
            </a>
          )}
          <Link to="/contact" className="btn-primary !px-5 !py-3 text-xs">
            Get Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center md:hidden ${
            onLight ? 'text-ink' : 'text-warm'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-400 ease-cinematic md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="shell flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className="block py-3 font-display text-2xl text-ink transition-colors hover:text-brand"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-3">
            <Link to="/contact" className="btn-primary w-full justify-center">
              Request a Quote
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

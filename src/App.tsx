import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ContactPage } from './pages/ContactPage';
import { NotFound } from './pages/NotFound';
import { ScrollTrigger } from './lib/gsap';
import { scrollToInstant, scrollToSmooth } from './lib/lenis';

// We handle scroll position ourselves on every navigation.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * On every route change: jump to the top of the new page (through Lenis, so
 * its remembered position is reset too), then refresh ScrollTrigger once the
 * new page has laid out. If the link has a #hash, scroll to that section.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  // Layout effect: runs before paint, so the new page never flashes mid-scroll.
  useLayoutEffect(() => {
    scrollToInstant(0);
  }, [pathname]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (el) scrollToSmooth(el, -90);
      else scrollToInstant(0); // re-assert top after pinned sections re-measure
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* Old URLs keep working. */}
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/capabilities" element={<Navigate to="/services" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

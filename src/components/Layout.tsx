import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './ui/ScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import { useCardGlow } from '../hooks/useCardGlow';

export function Layout() {
  const reducedMotion = useReducedMotion();
  useLenis(!reducedMotion);
  useCardGlow();

  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

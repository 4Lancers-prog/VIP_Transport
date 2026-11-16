import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-canvas pt-24">
      <div className="shell">
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-ink">
          Off the <span className="neon-text">route.</span>
        </h1>
        <p className="mt-6 max-w-md text-graphite">
          The page you’re looking for isn’t here. Let’s get you back on the road.
        </p>
        <Link to="/" className="btn-primary mt-9">
          <ChevronLeft size={18} strokeWidth={2.5} /> Back to home
        </Link>
      </div>
    </section>
  );
}

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionIntro } from '../ui/SectionIntro';
import { FAQS } from '../../data/company';

/** Accordion FAQ. Answers expand with a smooth grid-row transition. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const list = useScrollReveal<HTMLDivElement>({ kind: 'up', selector: '[data-faq]', stagger: 0.07, y: 30 });
  const base = useId();

  return (
    <section className="relative border-t border-line bg-cream py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIntro label="FAQ" lines={['Frequently asked', 'questions']}>
            <p>Quick answers about our transportation, distribution and fuel logistics services.</p>
          </SectionIntro>
        </div>

        <div ref={list} className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const id = `${base}-${i}`;
            return (
              <div key={f.q} data-faq>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-lg transition-colors duration-300 md:text-xl ${isOpen ? 'text-brand' : 'text-ink group-hover:text-brand'}`}>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color,color] duration-500 ease-cinematic ${
                        isOpen ? 'rotate-45 border-brand bg-brand text-black' : 'border-line text-brand'
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={id}
                  role="region"
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-cinematic ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-graphite">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

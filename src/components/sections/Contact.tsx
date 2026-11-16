import { useState, type FormEvent, type ReactNode } from 'react';
import { Send, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionIntro } from '../ui/SectionIntro';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CONTACT, REQUIREMENT_TYPES } from '../../data/company';

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  pickup: string;
  delivery: string;
  goods: string;
  date: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: REQUIREMENT_TYPES[0],
  pickup: '',
  delivery: '',
  goods: '',
  date: '',
  message: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'preview';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
const ACCESS_KEY = import.meta.env.VITE_CONTACT_ACCESS_KEY?.trim();

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Enter your full name.';
    if (!form.phone.trim() && !form.email.trim()) {
      next.phone = 'Add a phone or email so we can reply.';
      next.email = 'Add a phone or email so we can reply.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'That email doesn’t look right.';
    }
    if (form.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(form.phone)) {
      next.phone = 'That phone number doesn’t look right.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    if (!ENDPOINT) {
      setStatus('preview');
      setServerMsg(
        'Your details validated correctly. Delivery isn’t connected yet — set VITE_CONTACT_ENDPOINT to start receiving these.',
      );
      return;
    }

    setStatus('submitting');
    setServerMsg('');
    try {
      const payload: Record<string, string> = { ...form };
      if (ACCESS_KEY) payload.access_key = ACCESS_KEY;
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        setStatus('error');
        setServerMsg('Something went wrong sending your inquiry. Please try again or contact us directly.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Network error — your inquiry didn’t send. Please try again or reach us directly.');
    }
  }

  const formRef = useScrollReveal<HTMLFormElement>({ kind: 'up', selector: ':scope > *', stagger: 0.05, y: 24 });

  return (
    <section id="quote" className="relative bg-canvas py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIntro label="Request a quote" lines={['Get a free', 'transportation quote']}>
            <p>
              Tell us a little about your requirements so that our team can understand your needs and
              respond accordingly.
            </p>
          </SectionIntro>
          <a href={CONTACT.phoneHref} className="text-link mt-8">
            <Phone size={16} /> Prefer to talk? Call {CONTACT.phone}
          </a>
        </div>

        <div className="neon-card p-6 hover:!translate-y-0 md:p-10">
          {status === 'success' ? (
            <SuccessCard onReset={() => setStatus('idle')} />
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required error={errors.name}>
                <input className={inputCls(!!errors.name)} value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Company Name">
                <input className={inputCls(false)} value={form.company} onChange={(e) => update('company', e.target.value)} autoComplete="organization" />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input className={inputCls(!!errors.email)} value={form.email} onChange={(e) => update('email', e.target.value)} inputMode="email" autoComplete="email" />
              </Field>
              <Field label="Contact Number" error={errors.phone}>
                <input className={inputCls(!!errors.phone)} value={form.phone} onChange={(e) => update('phone', e.target.value)} inputMode="tel" autoComplete="tel" />
              </Field>
              <Field label="Service Required" group className="sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {REQUIREMENT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={form.service === t}
                      onClick={() => update('service', t)}
                      className={`rounded-sm border px-4 py-2.5 text-sm transition-[color,background-color,border-color,box-shadow] duration-300 ${
                        form.service === t
                          ? 'border-brand bg-brand text-black shadow-[0_0_18px_rgba(193,154,51,0.45)]'
                          : 'border-line text-graphite hover:border-brand/60 hover:text-ink'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Pickup Location">
                <input className={inputCls(false)} value={form.pickup} onChange={(e) => update('pickup', e.target.value)} />
              </Field>
              <Field label="Delivery Location">
                <input className={inputCls(false)} value={form.delivery} onChange={(e) => update('delivery', e.target.value)} />
              </Field>
              <Field label="Type of Goods / Requirement">
                <input className={inputCls(false)} value={form.goods} onChange={(e) => update('goods', e.target.value)} />
              </Field>
              <Field label="Expected Service Date">
                <input type="date" className={inputCls(false)} value={form.date} onChange={(e) => update('date', e.target.value)} />
              </Field>
              <Field label="Message / Additional Details" error={errors.message} className="sm:col-span-2">
                <textarea rows={4} className={inputCls(!!errors.message)} value={form.message} onChange={(e) => update('message', e.target.value)} />
              </Field>

              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full justify-center sm:w-auto" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Submit Your Enquiry <Send size={17} />
                    </>
                  )}
                </button>

                {(status === 'preview' || status === 'error') && (
                  <p role="alert" className={`mt-4 flex items-start gap-2 text-sm ${status === 'error' ? 'text-red-400' : 'text-brand'}`}>
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {serverMsg}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full flex-col items-start justify-center p-4">
      <CheckCircle2 size={44} className="text-brand drop-shadow-[0_0_12px_rgba(193,154,51,0.8)]" />
      <h3 className="mt-5 font-display text-2xl text-ink">Enquiry submitted.</h3>
      <p className="mt-3 max-w-sm text-graphite">
        Thank you. Your requirement is with our team, and we’ll contact you to
        discuss the next steps.
      </p>
      <button onClick={onReset} className="btn-ghost mt-7">
        Send another
      </button>
    </div>
  );
}

function Field({
  label,
  group,
  required,
  error,
  className = '',
  children,
}: {
  label: string;
  group?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  const Tag = group ? 'div' : 'label';
  return (
    <Tag className={`block ${className}`} {...(group ? { role: 'group', 'aria-label': label } : {})}>
      <span className="mb-2 block text-xs uppercase tracking-eyebrow text-graphite">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </Tag>
  );
}

function inputCls(hasError: boolean): string {
  return [
    'w-full rounded-sm border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-graphite/60 [color-scheme:light]',
    'transition-[border-color,box-shadow] duration-300 focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(193,154,51,0.15)]',
    hasError ? 'border-red-500/70' : 'border-line',
  ].join(' ');
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChatCircleDots,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MapPin,
  PaperPlaneRight,
  Phone,
  WarningCircle,
} from '@phosphor-icons/react';
import { Button } from '../components/Button';
import { TextArea, TextInput } from '../components/Inputs';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { Reveal, StaggerGroup, StaggerItem } from '../components/visual/Reveal';
import { Tag } from '../components/Tag';
import { siteData } from '../content/siteData';
import { cn } from '../utils/cn';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SUBJECT_CHIPS = [
  'Co-op / internship',
  'Project collab',
  'Quick question',
  'Saying hi',
] as const;

const rowLinkClass =
  'group flex cursor-pointer items-center justify-between rounded-2xl border-b border-line py-5 transition-[padding,background] duration-500 ease-premium hover:bg-[color:var(--accent-soft)]/30 lg:hover:px-2';

function formatProfileUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

export const ContactPage: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = React.useState<FormStatus>('idle');

  const successHeadingRef = React.useRef<HTMLHeadingElement | null>(null);
  const NAME_FIELD_ID = 'contact-name';

  React.useEffect(() => {
    if (status !== 'success') return;
    const id = window.requestAnimationFrame(() => successHeadingRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(id);
  }, [status]);

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    const msg = message.trim();
    if (!msg) {
      next.message = 'Please enter a message.';
    } else if (msg.length < 5) {
      next.message = 'Message needs at least 5 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const resetFormFields = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus((s) => (s === 'error' ? 'idle' : s));
    if (!validate()) return;

    setStatus('submitting');
    const form = event.currentTarget;
    const fd = new FormData(form);
    const encoded = new URLSearchParams();
    fd.forEach((value, key) => encoded.append(key, value.toString()));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });
      if (response.ok) {
        resetFormFields();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleSendAnother = () => {
    setStatus('idle');
    resetFormFields();
    window.requestAnimationFrame(() =>
      document.getElementById(NAME_FIELD_ID)?.focus({ preventScroll: true })
    );
  };

  return (
    <PageTransition>
      <div className="container-page space-y-20 pb-24">
        <Reveal as="section">
          <SectionHeader
            number="04"
            eyebrow="GET IN TOUCH"
            title="Let's talk — about co-ops, projects, or just curious questions."
            description="Replies usually within 24 hours during the school week. I'm in Toronto (EST)."
            size="lg"
          />
        </Reveal>

        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-muted">
                01 — Direct lines
              </p>
              <div className="mt-4 border-t border-line">
                <a href={`mailto:${siteData.contact.email}`} className={rowLinkClass}>
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[color:var(--accent-soft)]/25 text-fg"
                      aria-hidden
                    >
                      <EnvelopeSimple weight="regular" className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        Email
                      </span>
                      <span className="block truncate font-display text-xl font-light text-fg tabular">
                        {siteData.contact.email}
                      </span>
                    </span>
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-elev transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  >
                    <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </a>

                <a
                  href={siteData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className={rowLinkClass}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[color:var(--accent-soft)]/25 text-fg"
                      aria-hidden
                    >
                      <GithubLogo weight="regular" className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        GitHub
                      </span>
                      <span className="block truncate font-display text-xl font-light text-fg">
                        {formatProfileUrl(siteData.contact.github)}
                      </span>
                    </span>
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-elev transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  >
                    <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </a>

                <a
                  href={siteData.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={rowLinkClass}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[color:var(--accent-soft)]/25 text-fg"
                      aria-hidden
                    >
                      <LinkedinLogo weight="regular" className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        LinkedIn
                      </span>
                      <span className="block truncate font-display text-xl font-light text-fg">
                        {formatProfileUrl(siteData.contact.linkedin)}
                      </span>
                    </span>
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-elev transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  >
                    <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </a>

                {siteData.contact.phone && (
                  <a
                    href={`tel:${siteData.contact.phone.replace(/[^+\d]/g, '')}`}
                    className={cn(rowLinkClass, 'border-b-0')}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-[color:var(--accent-soft)]/25 text-fg"
                        aria-hidden
                      >
                        <Phone weight="regular" className="h-[1.125rem] w-[1.125rem]" />
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                          Phone
                        </span>
                        <span className="block truncate font-display text-xl font-light text-fg tabular">
                          {siteData.contact.phone}
                        </span>
                      </span>
                    </span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-elev transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    >
                      <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                    </span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Other ways to reach me
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Tag size="md" className="gap-1.5 normal-case tracking-normal">
                  <MapPin weight="regular" className="h-[0.9375rem] w-[0.9375rem] text-accent" aria-hidden />
                  Toronto, EST
                </Tag>
                <Tag size="md" className="gap-1.5 normal-case tracking-normal">
                  <Clock weight="regular" className="h-[0.9375rem] w-[0.9375rem] text-accent" aria-hidden />
                  UTC-5
                </Tag>
                <Tag size="md" className="gap-1.5 normal-case tracking-normal">
                  <Globe weight="regular" className="h-[0.9375rem] w-[0.9375rem] text-accent" aria-hidden />
                  EN · FR · VI
                </Tag>
              </div>
            </div>

            <blockquote
              className="font-display text-xl font-light italic leading-snug text-muted lg:max-w-md"
              style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              I don&apos;t bite. Email is the fastest. Long messages welcome below.
            </blockquote>
          </div>

          <SpotlightCard className="min-h-[min(560px,_100%)]" coreClassName="p-6 sm:p-8 lg:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[28rem] flex-col justify-center gap-8 py-6 text-center sm:py-10">
                <CheckCircle weight="regular" className="mx-auto h-14 w-14 text-amber-400" aria-hidden />
                <div className="space-y-3">
                  <h2
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="font-display text-3xl font-light tracking-tightest text-fg sm:text-4xl"
                    style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
                  >
                    Message received.
                  </h2>
                  <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted">
                    I&apos;ll get back to you within 24 hours. In the meantime, you can{' '}
                    <Link to="/projects" className="text-accent underline decoration-amber-400/35 underline-offset-4 transition-colors duration-300 ease-premium hover:decoration-amber-400/70">
                      browse my recent work
                    </Link>{' '}
                    or{' '}
                    <Link to="/resume" className="text-accent underline decoration-amber-400/35 underline-offset-4 transition-colors duration-300 ease-premium hover:decoration-amber-400/70">
                      download my resume
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                  <Button variant="outline" size="lg" to="/projects" withArrow arrowDirection="right">
                    Browse work
                  </Button>
                  <Button variant="ghost" size="lg" type="button" onClick={handleSendAnother}>
                    Send another
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div
                    className="mb-8 flex gap-4 rounded-2xl border border-red-500/25 bg-red-500/5 p-4"
                    role="alert"
                  >
                    <WarningCircle weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
                    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-relaxed text-fg">
                        Couldn&apos;t send. Try emailing directly at {siteData.contact.email}.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        className="shrink-0"
                        onClick={() => setStatus('idle')}
                      >
                        Try again
                      </Button>
                    </div>
                  </div>
                )}
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 lg:gap-7"
                  noValidate
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out:{' '}
                      <input name="bot-field" aria-hidden="true" tabIndex={-1} />
                    </label>
                  </p>

                  <TextInput
                    id={NAME_FIELD_ID}
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                  />

                  <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />

                  <div className="space-y-2">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Subject focus</p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Subject presets">
                      {SUBJECT_CHIPS.map((chip) => {
                        const selected = subject === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setSubject(selected ? '' : chip)}
                            aria-pressed={selected}
                            className={cn(
                              'inline-flex items-center rounded-full border font-mono uppercase tracking-[0.14em] transition-all duration-500 ease-premium',
                              'px-3 py-1 text-[10.5px] focus-ring',
                              selected
                                ? 'border-amber-400/60 bg-[color:var(--accent-soft)] text-fg'
                                : 'border-line text-muted hover:border-amber-400/40 hover:text-fg'
                            )}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                    <TextInput
                      label="Subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <TextArea
                      label="Message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={errors.message}
                    />
                    <p className="mt-2 font-mono text-[10px] text-muted tabular">{message.length} / 1000</p>
                  </div>

                  <div className="flex flex-col gap-4 pt-1">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      withArrow
                      aria-busy={status === 'submitting'}
                      disabled={status === 'submitting'}
                    >
                      <span className="inline-flex items-center gap-2.5 leading-none">
                        {status === 'submitting' ? (
                          <>
                            <svg className="h-4 w-4 animate-spin text-current" aria-hidden viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-90"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <PaperPlaneRight weight="bold" className="h-4 w-4 shrink-0" aria-hidden />
                            Send message
                          </>
                        )}
                      </span>
                    </Button>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted leading-relaxed">
                      We respect your inbox. Form via Netlify, no tracking, no autoresponders.
                    </p>
                  </div>
                </form>
              </>
            )}
          </SpotlightCard>
        </section>

        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <SpotlightCard coreClassName="p-6">
              <div className="flex flex-col gap-4">
                <Clock weight="regular" className="h-6 w-6 text-accent" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    When can you start?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Open to Fall 2026 and Winter / Summer 2027 co-op terms.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard coreClassName="p-6">
              <div className="flex flex-col gap-4">
                <ChatCircleDots weight="regular" className="h-6 w-6 text-accent" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Do you do freelance?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Selectively, mostly small builds for friends or family. Email first.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard coreClassName="p-6">
              <div className="flex flex-col gap-4">
                <Globe weight="regular" className="h-6 w-6 text-accent" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    Will you relocate?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Yes, anywhere in Canada or remote. Open to North America for the right team.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </PageTransition>
  );
};

import React from 'react';
import { Button } from '../components/Button';
import { TextArea, TextInput } from '../components/Inputs';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { siteData } from '../content/siteData';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export const ContactPage: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; message?: string }>(
    {}
  );
  const [status, setStatus] = React.useState<FormState>('idle');

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) nextErrors.message = 'Please enter a message.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    const form = event.currentTarget;
    const data = new FormData(form);

    const encoded = new URLSearchParams();
    data.forEach((value, key) => {
      encoded.append(key, value.toString());
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString()
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s get in touch"
          description="Reach out about internships, collaboration, questions about my work, or just to say hi."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <section>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="card space-y-4 p-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              {/* Netlify honeypot field */}
              <p className="hidden">
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" aria-hidden="true" tabIndex={-1} />
                </label>
              </p>

              <TextInput
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

              <TextArea
                label="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
              />

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </Button>
                {status === 'success' && (
                  <p className="text-xs text-emerald-400">
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-400">
                    Something went wrong while sending. You can also email me directly at{' '}
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      {siteData.contact.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </section>

          <aside className="space-y-4 text-sm text-slate-200">
            <div className="card space-y-3 p-5">
              <h2 className="text-sm font-semibold tracking-tight text-slate-50">
                Direct contact
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-slate-400">Email:</span>{' '}
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {siteData.contact.email}
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">GitHub:</span>{' '}
                  <a
                    href={siteData.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {siteData.contact.github.replace('https://', '')}
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">LinkedIn:</span>{' '}
                  <a
                    href={siteData.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {siteData.contact.linkedin.replace('https://', '')}
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              This form is wired up for{' '}
              <span className="font-semibold text-slate-200">Netlify Forms</span>. When you deploy
              to Netlify, submissions will appear in your site&apos;s dashboard.
            </p>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
};


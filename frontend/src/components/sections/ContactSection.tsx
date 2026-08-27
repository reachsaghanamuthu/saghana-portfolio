import { useState } from 'react';
import type { FormEvent } from 'react';
import Section from '../site/Section';
import Reveal from '../site/Reveal';
import { site } from '../../data/site';

/*
 * Letters to the editor.
 *
 * There is no server behind this site, so the form composes a mailto: link
 * and hands the message to the visitor's own mail client. That is honest —
 * the letter really is sent, and nothing silently disappears into a form
 * handler that was never wired up. Swap `handleSubmit` for a fetch() when a
 * backend exists.
 */
export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const subject = String(form.get('subject') ?? '') || 'A letter to the editor';
    const message = String(form.get('message') ?? '');

    const body = `${message}\n\n—\n${name}${email ? `\n${email}` : ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const directLines = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'GitHub', value: 'reachsaghanamuthu', href: site.github },
    ...(site.linkedin
      ? [{ label: 'LinkedIn', value: 'Profile', href: site.linkedin }]
      : []),
    { label: 'Résumé', value: 'Download PDF', href: site.resume },
  ];

  return (
    <Section
      id="contact"
      kicker="Get in Touch"
      title="Send a Letter to the"
      accent="Editor"
    >
      <Reveal from="left">
        <p className="copy max-w-[62ch]">
          Have a role, a project, or a problem worth solving? Whether it is an
          internship, a collaboration, or a question about anything on this
          page — the desk is open.
        </p>
      </Reveal>

      {/* ---------------- Direct lines ---------------- */}
      <Reveal delay={0.08}>
        <dl className="rule-hair mt-[var(--space-6)] grid gap-y-[var(--space-5)] pt-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-4">
          {directLines.map((line, i) => (
            <div
              key={line.label}
              className={
                i > 0
                  ? 'lg:border-l lg:border-[var(--rule-mid)] lg:pl-[var(--space-5)]'
                  : ''
              }
            >
              <dt className="meta uppercase tracking-[0.2em]">
                {line.label}
              </dt>
              <dd className="mt-[var(--space-2)]">
                <a
                  href={line.href}
                  {...(line.href.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noreferrer' })}
                  className="news-link break-all"
                >
                  {line.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* ---------------- The form ---------------- */}
      <Reveal from="up" delay={0.14}>
        <form
          onSubmit={handleSubmit}
          className="mt-[var(--space-8)] max-w-[54rem]"
        >
          <div className="grid gap-x-[var(--gutter-col)] gap-y-[var(--space-5)] sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-[length:var(--text-label)] text-ink-700"
              >
                Byline
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="field mt-[var(--space-2)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[length:var(--text-label)] text-ink-700"
              >
                Return Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="field mt-[var(--space-2)]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="block font-mono text-[length:var(--text-label)] text-ink-700"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's the story?"
                className="field mt-[var(--space-2)]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block font-mono text-[length:var(--text-label)] text-ink-700"
              >
                Your Letter
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me everything."
                className="field mt-[var(--space-2)] resize-y"
              />
            </div>
          </div>

          <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-5)]">
            <button type="submit" className="btn-ink">
              Send to the Newsroom <span aria-hidden="true">&rarr;</span>
            </button>

            <p
              role="status"
              className="meta"
            >
              {sent
                ? 'Your mail client should now be open with the letter drafted.'
                : 'Opens in your mail client, addressed and ready to send.'}
            </p>
          </div>
        </form>
      </Reveal>
    </Section>
  );
}
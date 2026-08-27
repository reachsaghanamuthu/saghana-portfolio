import Section from '../site/Section';
import Reveal from '../site/Reveal';
import { hackathons } from '../../data/hackathons';

/*
 * The competition record, set as a dated list. Each entry leads with the date
 * because that is what orders them and what a reader scans for; the award,
 * where one exists, sits beside the event rather than under it so the one
 * citation on the page is impossible to miss.
 */
export default function HackathonsSection() {
  return (
    <Section
      id="hackathons"
      kicker="On the Clock"
      title="Hackathons &"
      accent="Competitions"
    >
      <div>
        {hackathons.map((entry, i) => (
          <article
            key={entry.id}
            className={
              i > 0
                ? 'rule-hair mt-[var(--space-6)] pt-[var(--space-6)]'
                : ''
            }
          >
            <div className="grid gap-[var(--gutter-col)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
              <Reveal from="left">
                <p className="meta uppercase tracking-[0.2em]">
                  {entry.dates ?? 'Date not stated'}
                </p>

                <h3 className="display h3 mt-[var(--space-2)]">
                  {entry.event}
                </h3>

                <p className="mt-[var(--space-2)] font-mono text-[length:var(--text-label)] font-semibold tracking-[0.02em] text-ink-900">
                  {entry.host}
                </p>

                {entry.context && (
                  <p className="meta mt-[var(--space-1)]">{entry.context}</p>
                )}
              </Reveal>

              <Reveal
                from="right"
                delay={0.1}
                className="md:border-l md:border-[var(--rule-mid)] md:pl-[var(--gutter-col)]"
              >
                {entry.award && (
                  <p className="mb-[var(--space-3)] inline-block bg-band-ink px-[var(--space-3)] py-[var(--space-1)] font-mono text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-newsprint">
                    {entry.award}
                  </p>
                )}

                <p className="copy max-w-[70ch]">{entry.note}</p>

                <p className="meta mt-[var(--space-3)]">
                  Role &middot; {entry.role}
                </p>

                <a
                  href={entry.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="news-link mt-[var(--space-2)] inline-block"
                >
                  View certificate <span aria-hidden="true">&rarr;</span>
                </a>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
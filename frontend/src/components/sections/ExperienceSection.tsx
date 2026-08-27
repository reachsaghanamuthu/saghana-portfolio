import Section from '../site/Section';
import Reveal from '../site/Reveal';
import { experience } from '../../data/experience';

/*
 * Career record. Each posting is a two-column entry — identity on the left,
 * the account of the work on the right — which is how a broadsheet sets a
 * dated list and keeps long bullets from running the full page measure.
 *
 * The two halves enter from their own sides and the bullets follow one at a
 * time, so the entry assembles in reading order.
 */
export default function ExperienceSection() {
  return (
    <Section id="experience" kicker="Career" title="Experience" accent="So Far">
      <div>
        {experience.map((job, i) => (
          <article
            key={job.id}
            className={
              i > 0
                ? 'rule-hair mt-[var(--space-6)] pt-[var(--space-6)]'
                : ''
            }
          >
            <div className="grid gap-[var(--gutter-col)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
              {/* ---------- Identity ---------- */}
              <Reveal from="left">
                <p className="meta uppercase tracking-[0.2em]">
                  {job.dates}
                </p>

                <h3 className="display h3 mt-[var(--space-2)]">
                  {job.role}
                </h3>

                <p className="mt-[var(--space-2)] font-mono text-[length:var(--text-label)] font-semibold tracking-[0.02em] text-ink-900">
                  {job.company}
                </p>

                {job.location && (
                  <p className="meta mt-[var(--space-1)]">
                    {job.location}
                  </p>
                )}

                {job.certificateUrl && (
                  <a
                    href={job.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="news-link mt-[var(--space-2)] inline-block"
                  >
                    View certificate <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </Reveal>

              {/* ---------- Account of the work ----------
                  Capped in ch: the wider shell would otherwise run these
                  lines well past a comfortable reading measure. */}
              <ul className="copy max-w-[72ch] md:border-l md:border-[var(--rule-mid)] md:pl-[var(--gutter-col)]">
                {job.bullets.map((bullet, b) => (
                  <Reveal
                    key={bullet}
                    as="li"
                    from="right"
                    distance={20}
                    delay={0.1 + b * 0.1}
                    className="mt-[var(--space-4)] flex gap-[var(--space-3)] first:mt-0"
                  >
                    {/* Square marker, set on the first line's optical centre. */}
                    <span
                      aria-hidden="true"
                      className="mt-[0.62em] h-[0.42em] w-[0.42em] shrink-0 bg-walnut"
                    />
                    <span>{bullet}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
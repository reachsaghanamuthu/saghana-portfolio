import Reveal from '../site/Reveal';
import SplitText from '../site/SplitText';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { certificates } from '../../data/certificates';

/*
 * Profile. Heading and copy in a narrow left column, the pull-quote and the
 * numbers in a wider right one, split by a vertical rule.
 *
 * The figures are counted from the data files rather than typed in, so they
 * cannot drift out of date when a project or certificate is added.
 */
export default function AboutSection() {
  const stats = [
    { value: String(projects.length), label: 'Projects\nShipped' },
    { value: String(experience.length), label: 'Internships\nCompleted' },
    { value: String(certificates.length), label: 'Certifications\nEarned' },
    { value: '2029', label: 'B.Tech\nGraduation' },
  ];

  return (
    <section id="about" className="scroll-mt-28">
      <div className="shell">
        <div className="rule-hair" />

        <div className="grid gap-[var(--gutter-col)] py-[var(--space-section)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.45fr)]">
          {/* ---------------- Copy ---------------- */}
          <Reveal from="left">
            <p className="kicker">Profile</p>
            <h2 className="display h2 mt-[var(--space-2)]">
              <SplitText text="About Me" />
            </h2>

            <div className="copy mt-[var(--space-5)]">
              <p>
                B.Tech student in Artificial Intelligence and Data Science with
                expertise spanning web development, AI systems, and software
                engineering. Passionate about leveraging technology to solve
                meaningful problems through innovative, scalable solutions.
              </p>
              <p>
                Hands-on experience building full-stack applications,
                integrating AI-driven features, and working across the
                development lifecycle — from backend architecture to intuitive
                user interfaces. Driven by curiosity and a continuous learning
                mindset, always exploring emerging tools and technologies to
                sharpen technical depth and creative problem-solving.
              </p>
            </div>
          </Reveal>

          {/* ---------------- Pull-quote & numbers ---------------- */}
          <Reveal
            from="right"
            delay={0.12}
            className="md:border-l md:border-[var(--rule-mid)] md:pl-[var(--gutter-col)]"
          >
            <blockquote className="font-masthead text-[length:var(--text-h2)] font-bold italic leading-[1.18] tracking-[-0.015em] text-ink-900">
              &ldquo;Growth doesn&rsquo;t happen before you begin — it happens
              because you begin.&rdquo;
            </blockquote>

            <div className="rule-hair mt-[var(--space-6)] pt-[var(--space-5)]">
              <dl className="grid grid-cols-2 gap-y-[var(--space-5)] sm:grid-cols-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={
                      i > 0
                        ? 'border-l border-[var(--rule-mid)] pl-[var(--space-5)]'
                        : ''
                    }
                  >
                    <dt className="sr-only">
                      {stat.label.replace('\n', ' ')}
                    </dt>
                    <dd>
                      <span className="block font-masthead text-[length:var(--text-h3)] font-bold leading-none text-ink-900">
                        {stat.value}
                      </span>
                      <span className="meta mt-[var(--space-2)] block whitespace-pre-line">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
import Section from '../site/Section';
import Reveal from '../site/Reveal';
import Figure from '../ui/Figure';
import { projects } from '../../data/projects';

/*
 * Selected works, set as alternating picture/story rows.
 *
 * Alternating the picture side gives a long list a rhythm and stops it
 * reading as a stack of identical cards — the same device the reference
 * layouts use for their case studies.
 */
export default function ProjectsSection() {
  return (
    <Section
      id="work"
      kicker="Selected Works"
      title="Things Worth"
      accent="Building"
    >
      <div>
        {projects.map((project, i) => {
          const pictureFirst = i % 2 === 0;

          return (
            <article
              key={project.id}
              className={
                i > 0
                  ? 'rule-hair mt-[var(--space-8)] pt-[var(--space-8)]'
                  : ''
              }
            >
              {/* The track sizes swap with the order, so the picture keeps the
                  same width on both sides — mirroring the row must not also
                  resize the photograph. */}
              <div
                className={`grid items-center gap-[var(--gutter-col)] ${
                  pictureFirst
                    ? 'md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)]'
                    : 'md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.95fr)]'
                }`}
              >
                {/* Each half enters from the side it sits on, so mirroring
                    the row mirrors the animation with it. */}
                <Reveal
                  as="div"
                  from={pictureFirst ? 'left' : 'right'}
                  className={pictureFirst ? 'md:order-1' : 'md:order-2'}
                >
                  <Figure
                    src={project.image}
                    alt={`${project.name} interface`}
                    caption={`${project.name} interface`}
                  />
                </Reveal>

                <Reveal
                  from={pictureFirst ? 'right' : 'left'}
                  delay={0.12}
                  className={pictureFirst ? 'md:order-2' : 'md:order-1'}
                >
                  <p className="kicker">
                    No. {String(i + 1).padStart(2, '0')} &middot;{' '}
                    {project.kicker}
                  </p>

                  <h3 className="display h3 mt-[var(--space-2)]">
                    {project.name}
                  </h3>

                  <p className="copy mt-[var(--space-4)] max-w-[74ch]">
                    {project.description}
                  </p>

                  <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-6)]">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="news-link"
                    >
                      View on GitHub <span aria-hidden="true">&rarr;</span>
                    </a>

                    {/* TaskFlow ran locally only, so it carries a single link
                        and the row simply closes up behind it. */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="news-link"
                      >
                        Live demo <span aria-hidden="true">&rarr;</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
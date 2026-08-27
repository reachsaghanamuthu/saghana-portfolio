import Section from '../site/Section';
import Reveal from '../site/Reveal';
import { certificates } from '../../data/certificates';

/*
 * Certifications only. The toolkit that used to sit beneath these now lives
 * in the Skills diary, so the two are not stating the same thing twice.
 *
 * The grid is driven entirely by data/certificates.ts: add an entry there and
 * a card appears, with its file linked.
 *
 * There was a dashed "More to come" slot held open at the end of the grid.
 * With six credentials catalogued and every one of them carrying its file, it
 * had stopped reading as a space reserved and started reading as a section
 * that was never finished — so the shelf now ends on its last real entry.
 */
export default function CredentialsSection() {
  return (
    <Section
      id="credentials"
      kicker="Credentials"
      title="Certifications"
      accent="on File"
    >
      {/* ---------------- Certificates ---------------- */}
      <ul className="grid gap-x-[var(--gutter-col)] gap-y-[var(--space-7)] sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, i) => (
          <Reveal
            key={certificate.id}
            as="li"
            delay={i * 0.05}
            className="border-t border-[var(--rule-mid)] pt-[var(--space-4)]"
          >
            <h3 className="h4">
              {certificate.title}
            </h3>

            <p className="meta mt-[var(--space-2)]">
              {certificate.issuer}
              {certificate.date && ` · ${certificate.date}`}
            </p>

            {certificate.fileUrl ? (
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="news-link mt-[var(--space-2)] inline-block"
              >
                View certificate <span aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <p className="meta mt-[var(--space-2)] italic">
                Certificate on file &mdash; copy to follow
              </p>
            )}
          </Reveal>
        ))}
      </ul>

    </Section>
  );
}
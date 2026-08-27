import { useState } from 'react';
import { site } from '../../data/site';

type Props = {
  src: string;
  folio?: number;
};

/*
 * The closing leaf: the portrait and the lines behind the work.
 *
 * The first quote is the one already carried in the hero. The rest are
 * written for this page and deliberately avoid restating anything printed
 * elsewhere on the site.
 */
const CREED = [
  'Every setback is a setup for a comeback.',
  'I no longer wait for the perfect moment. I begin, and become along the way.',
  'I believe in second chances — not to relive what was, but to create what can be.',
  'Wherever life plants me, I will bloom with grace, grow with purpose, and shine in my own way.',
  'I bend when life asks me to, but I never let it break my roots.',
  'Grace is not growing without struggle. It is choosing to grow beautifully through it.',
];

export default function AuthorPage({ src, folio }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="diary-page flex h-full w-full flex-col px-[var(--space-5)] py-[var(--space-6)]">
      <p className="shrink-0 font-mono text-[length:var(--text-diary-micro)] uppercase tracking-[0.28em] text-[var(--color-diary-accent)]">
        In Her Own Words
      </p>

      <div className="mt-[var(--space-3)] shrink-0 border-t border-[var(--color-diary-accent)]/45" />

      {/* No frame, and the edges dissolve into the ruled paper rather than
          sitting on it as a pasted-in box. */}
      <figure className="mt-[var(--space-4)] shrink-0 self-center text-center">
        <div className="photo-blend mx-auto aspect-[4/5] w-[42%] min-w-[120px] overflow-hidden">
          {failed ? (
            <div
              className="flex h-full w-full items-center justify-center"
              role="img"
              aria-label={site.name}
            >
              <span className="font-[family-name:var(--font-nameplate)] text-[length:var(--text-diary-cover)] leading-none text-[var(--color-diary-soft)]">
                SM
              </span>
            </div>
          ) : (
            <img
              src={src}
              alt={site.name}
              onError={() => setFailed(true)}
              className="archive-photo h-full w-full object-cover"
              draggable={false}
            />
          )}
        </div>

        <figcaption className="mt-[var(--space-2)] font-mono text-[length:var(--text-diary-micro)] uppercase tracking-[0.18em] text-[var(--color-diary-accent)]">
          {site.name}
        </figcaption>
      </figure>

      {/*
        The quotes take the rest of the leaf and distribute themselves through
        it. Stacked at their natural height they bunched under the portrait and
        left the bottom third of the page empty.
      */}
      <ul className="mt-[var(--space-4)] flex min-h-0 flex-1 flex-col justify-between">
        {CREED.map((line, i) => (
          <li
            key={line}
            className={`font-[family-name:var(--font-masthead)] italic leading-[1.45] text-[var(--color-diary-ink)] ${
              i === 0 ? 'text-[length:var(--text-diary-quote)]' : 'text-[length:var(--text-diary-body)] text-[var(--color-diary-soft)]'
            }`}
          >
            &ldquo;{line}&rdquo;
          </li>
        ))}
      </ul>

      {folio !== undefined && (
        <p className="mt-[var(--space-3)] shrink-0 text-center font-mono text-[length:var(--text-diary-micro)] tracking-[0.2em] text-[var(--color-diary-accent)]/80">
          {folio}
        </p>
      )}
    </div>
  );
}
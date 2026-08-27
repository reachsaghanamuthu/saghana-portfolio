import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

/*
 * A framed photograph at its own natural proportions.
 *
 * No aspect box: `height: auto` lets the file decide, which is the only way
 * to guarantee neither crop nor letterbox for screenshots whose dimensions
 * all differ. If the file is missing the frame degrades to a labelled
 * placeholder naming the path, so a broken link is obvious rather than blank.
 */
export default function Figure({ src, alt, caption, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={className}>
      {failed ? (
        <div
          className="flex aspect-[16/10] w-full flex-col items-center justify-center border border-dashed border-[var(--rule-mid)] bg-newsprint-deep px-4 text-center"
          role="img"
          aria-label={`Image not found: ${src}`}
        >
          <span className="font-mono text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-walnut">
            Image not found
          </span>
          <span className="mt-[var(--space-2)] break-all font-mono text-[length:var(--text-micro)] text-walnut/80">
            {src}
          </span>
        </div>
      ) : (
        <div className="aged-frame w-full overflow-hidden bg-newsprint-deep">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="archive-photo block h-auto w-full"
          />
        </div>
      )}

      {caption && (
        <figcaption className="meta mt-[var(--space-3)] italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
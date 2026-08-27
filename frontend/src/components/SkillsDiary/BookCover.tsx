import { useState } from 'react';

type Props = {
  /** Optional. Omit it and the typeset board is the cover. */
  src?: string;
  /** Omit all three and the board carries no text — used for the back cover,
      which mirrors the front exactly. */
  title?: string;
  subtitle?: string;
  imprint?: string;
};

/*
 * The book's cover: a typeset board, or a photograph when one is supplied.
 *
 * The board is the cover in its own right, not a stand-in for a missing file.
 * It previously required a `src` and printed "Cover portrait pending" at the
 * foot when the file was absent — which it was, so every visitor got the
 * apology and the console got a 404 on every load.
 *
 * Passing a `src` still swaps the board for that photograph, and a file that
 * fails to load still falls back here rather than to a broken-image icon.
 */
export default function BookCover({ src, title, subtitle, imprint }: Props) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className="relative h-full w-full bg-band-ink">
      {showPhoto && (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="archive-photo absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {!showPhoto && !title && (
        <div className="h-full w-full border-[6px] border-double border-signal/35" />
      )}

      {!showPhoto && title && (
        <div className="flex h-full w-full flex-col border-[6px] border-double border-signal/35 p-[var(--space-6)] text-center">
          <p className="font-mono text-[length:var(--text-diary-micro)] uppercase tracking-[0.3em] text-signal/70">
            {imprint}
          </p>

          {/* The title takes the rest of the board and centres in it, so the
              imprint stays pinned to the head the way a printed board sets it.
              This was `justify-between` across three slots; with the third one
              gone, centring the title is what keeps the board balanced. */}
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <h3 className="font-[family-name:var(--font-nameplate)] text-[length:var(--text-diary-cover)] leading-[1.15] text-newsprint">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-[var(--space-3)] font-mono text-[length:var(--text-diary-micro)] uppercase tracking-[0.24em] text-newsprint/60">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
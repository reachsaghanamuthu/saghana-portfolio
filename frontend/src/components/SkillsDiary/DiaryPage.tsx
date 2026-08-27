import type { ReactNode } from 'react';

type Props = {
  /** Printed small at the head of the page, above the rule. */
  eyebrow?: string;
  title: string;
  note?: string;
  children: ReactNode;
  /** Page number, printed at the foot the way a diary is paginated. */
  folio?: number;
};

/*
 * A single leaf of the diary. Aged paper rather than newsprint — the book is
 * a different object from the page it sits on, and giving it the same surface
 * made it vanish into the section behind it.
 */
export default function DiaryPage({
  eyebrow,
  title,
  note,
  children,
  folio,
}: Props) {
  return (
    <div className="diary-page flex h-full w-full flex-col px-[var(--space-6)] py-[var(--space-7)]">
      {eyebrow && (
        <p className="font-mono text-[length:var(--text-diary-micro)] uppercase tracking-[0.28em] text-[var(--color-diary-accent)]">
          {eyebrow}
        </p>
      )}

      <h3 className="display mt-[var(--space-2)] text-[length:var(--text-diary-display)] leading-[1.1] text-[var(--color-diary-ink)]">
        {title}
      </h3>

      {note && (
        <p className="mt-[var(--space-2)] font-mono text-[length:var(--text-diary-note)] italic leading-[1.5] text-[var(--color-diary-accent)]">
          {note}
        </p>
      )}

      <div className="mt-[var(--space-4)] border-t border-[var(--color-diary-accent)]/45 pt-[var(--space-4)]" />

      <div className="min-h-0 flex-1">{children}</div>

      {folio !== undefined && (
        <p className="mt-[var(--space-4)] text-center font-mono text-[length:var(--text-diary-micro)] tracking-[0.2em] text-[var(--color-diary-accent)]/80">
          {folio}
        </p>
      )}
    </div>
  );
}
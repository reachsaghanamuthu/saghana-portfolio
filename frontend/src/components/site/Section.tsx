import type { ReactNode } from 'react';
import Reveal from './Reveal';
import SplitText from './SplitText';

type Props = {
  id: string;
  /** Small mono label above the headline, e.g. "SELECTED WORKS". */
  kicker: string;
  /** Plain leading words of the headline. */
  title: string;
  /** Optional italic accent set after the title, as in the reference layouts. */
  accent?: string;
  children: ReactNode;
  /** Suppress the hairline that opens the section (the first one after the hero). */
  rule?: boolean;
};

/*
 * Every section below the hero shares this frame: a hairline rule, a mono
 * kicker, a Playfair headline with an optional italic accent word, then the
 * body. Uniform vertical rhythm is most of what separates "a proper website"
 * from a stack of blocks.
 *
 * The headline sets itself a word at a time; the accent follows just behind
 * the plain words so the two halves read as one phrase arriving.
 */
export default function Section({
  id,
  kicker,
  title,
  accent,
  children,
  rule = true,
}: Props) {
  const accentDelay = title.split(' ').length * 0.055;

  return (
    <section id={id} className="scroll-mt-28">
      <div className="shell">
        {rule && <div className="rule-hair" />}

        <div className="py-[var(--space-section)]">
          <Reveal from="left" distance={20}>
            <p className="kicker">{kicker}</p>
          </Reveal>

          <h2 className="display h2 mt-[var(--space-2)]">
            <SplitText text={title} />
            {accent && (
              <>
                {' '}
                <SplitText
                  text={accent}
                  delay={accentDelay}
                  className="font-normal italic"
                />
              </>
            )}
          </h2>

          <div className="mt-[var(--space-5)]">{children}</div>
        </div>
      </div>
    </section>
  );
}
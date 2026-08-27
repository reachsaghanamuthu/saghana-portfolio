import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Direction } from './Reveal';

type Props = {
  text: string;
  /** Travel direction for each word. */
  from?: Direction;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  distance?: number;
  className?: string;
};

/*
 * Headline reveal: the line assembles a word at a time as it scrolls in.
 *
 * Deliberately not a per-character effect — words keep the headline legible
 * throughout, and the stagger reads as type being set rather than as text
 * being typed.
 *
 * No overflow mask on the wrappers: clipping each word to its line box eats
 * the descenders in a name like "Saghana", so the words simply translate and
 * fade instead. The separating spaces are plain text nodes *between* the
 * inline-block words — a trailing space inside an inline-block is collapsed
 * away, which would run the whole headline together.
 */
export default function SplitText({
  text,
  from = 'up',
  delay = 0,
  stagger = 0.055,
  distance = 18,
  className = '',
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  }[from];

  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, ...offset },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </motion.span>
  );
}
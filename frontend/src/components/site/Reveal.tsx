import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Which edge the block travels in from. */
export type Direction = 'up' | 'down' | 'left' | 'right';

type Props = {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings. */
  delay?: number;
  /** Travel direction. `left` enters from the left, and so on. */
  from?: Direction;
  /** Travel distance in pixels. */
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'figure';
};

/*
 * Scroll-triggered entrance: content slides in from one edge and fades up
 * the first time it reaches the viewport.
 *
 * Direction is a layout decision, not decoration — a left column entering
 * from the left and its right-hand neighbour from the right makes the page's
 * structure legible as it assembles. Distances stay small; a long throw
 * reads as a slideshow rather than a newspaper.
 *
 * `once: true` means nothing re-animates on the way back up, and the whole
 * effect collapses to a plain render under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  distance = 26,
  className = '',
  as = 'div',
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  }[from];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
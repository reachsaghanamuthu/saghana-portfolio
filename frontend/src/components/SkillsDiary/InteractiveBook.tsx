import { useState, useCallback } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** A page is either rendered content or an image path. */
export type BookPage = ReactNode | string;

type Props = {
  width?: number;
  height?: number;
  frontCover: BookPage;
  backCover: BookPage;
  innerPages?: BookPage[];
  shadow?: {
    color?: string;
    opacity?: number;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
    spread?: number;
  };
  borderRadius?: number;
  /** Announced to screen readers, and used for the visible hint. */
  label?: string;
};

const faceStyle = {
  position: 'absolute',
  inset: 0,
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  overflow: 'hidden',
  /* Opaque: without a fill, a leaf whose image is missing or still loading
     lets the leaf behind it show straight through the paper. */
  backgroundColor: 'var(--color-newsprint-deep)',
} as const;

function hexToRgba(color: string, alpha: number) {
  const hex = color.replace('#', '');
  const pair = (i: number) =>
    hex.length === 3 ? hex[i] + hex[i] : hex.slice(i * 2, i * 2 + 2);
  const [r, g, b] = [0, 1, 2].map((i) => parseInt(pair(i), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Image paths render as pictures; anything else is rendered as content. */
function Face({ page }: { page: BookPage }) {
  if (page == null) return null;
  if (typeof page === 'string') {
    return (
      <img
        src={page}
        alt=""
        className="block h-full w-full object-cover"
        draggable={false}
      />
    );
  }
  return <div className="h-full w-full">{page}</div>;
}

/*
 * A book you click through: the cover swings open, leaves turn one at a time,
 * and the last click closes it again with the leaves falling back in reverse.
 *
 * Two departures from the Framer original this is adapted from:
 *
 * 1. The original allocated a pool of 100 `useAnimationControls()` inside
 *    `Array.from(...)` — a hook in a loop, which breaks React's rules of
 *    hooks and builds 100 controllers for a five-leaf book. Rotation is
 *    derived from `flippedCount` instead, so the leaves are declarative and
 *    the hook count is fixed. The closing cascade is reproduced with a
 *    per-leaf delay rather than an imperative await loop.
 *
 * 2. Pages accept rendered content, not only image paths, because the diary's
 *    inner pages are typeset rather than photographed.
 */
export default function InteractiveBook({
  width = 400,
  height = 600,
  frontCover,
  backCover,
  innerPages = [],
  shadow = {},
  borderRadius = 10,
  label = 'Interactive book. Press Enter to turn the page.',
}: Props) {
  const {
    color = '#000',
    opacity = 0.4,
    blur = 10,
    offsetX = 5,
    offsetY = 5,
    spread = 0,
  } = shadow;

  const reduced = useReducedMotion();
  const [flippedCount, setFlippedCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const raw = [frontCover, ...innerPages, backCover].filter((p) => p != null);
  /* Leaves are two-sided, so an odd page count gets a blank verso. */
  const pages: BookPage[] = raw.length % 2 === 0 ? raw : [...raw, null];
  const leaves: [BookPage, BookPage][] = [];
  for (let i = 0; i < pages.length; i += 2) {
    leaves.push([pages[i], pages[i + 1]]);
  }
  const totalLeaves = leaves.length;
  const isOpen = flippedCount > 0;

  const advance = useCallback(() => {
    setFlippedCount((current) => {
      if (current < totalLeaves) return current + 1;
      /* Past the last leaf, the next click shuts the book. */
      setIsClosing(true);
      window.setTimeout(
        () => setIsClosing(false),
        reduced ? 0 : 500 + totalLeaves * 80
      );
      return 0;
    });
  }, [totalLeaves, reduced]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      advance();
    }
  };

  const closedShadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(
    color,
    opacity
  )}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={advance}
      onKeyDown={onKeyDown}
      className="flex cursor-pointer items-center justify-center"
      style={{ perspective: 2500, width: '100%', minHeight: height }}
    >
      <motion.div
        animate={{ x: isOpen ? width / 2 : 0 }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.6, ease: 'easeInOut' }
        }
        style={{
          width,
          height,
          position: 'relative',
          transformStyle: 'preserve-3d',
          boxShadow: isOpen ? '0 0 0 transparent' : closedShadow,
        }}
      >
        {leaves.map(([front, back], index) => {
          const flipped = index < flippedCount;
          const zOffset = flipped ? index * 0.4 : (totalLeaves - index) * 0.4;

          return (
            <motion.div
              key={index}
              animate={{ rotateY: flipped ? -180 : 0 }}
              initial={false}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: isClosing ? 0.5 : 0.7,
                      ease: isClosing ? 'easeInOut' : [0.4, 0, 0.2, 1],
                      /* Closing runs back-to-front, the way a book falls shut. */
                      delay: isClosing ? (totalLeaves - 1 - index) * 0.08 : 0,
                    }
              }
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                zIndex: flipped ? index : totalLeaves - index,
                translateZ: zOffset,
                willChange: 'transform',
              }}
            >
              <div
                style={{
                  ...faceStyle,
                  borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
                }}
              >
                <Face page={front} />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/15 to-transparent" />
              </div>

              <div
                style={{
                  ...faceStyle,
                  transform: 'rotateY(180deg) translateZ(0.01px)',
                  borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
                }}
              >
                <Face page={back} />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-black/15 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
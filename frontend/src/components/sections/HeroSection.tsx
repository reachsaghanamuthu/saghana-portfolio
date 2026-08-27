import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Reveal from '../site/Reveal';
import SplitText from '../site/SplitText';
import { site } from '../../data/site';
import { education } from '../../data/experience';

/*
 * The picture inside intro.mp4, measured off the decoded frames — the file is
 * 1920×1080 but the rest of it is a black field baked into the encode.
 */
const FILE = { w: 1920, h: 1080 };
const PICTURE = { x: 338, y: 42, w: 1280, h: 992 };

/*
 * The visible window is a square cut from the middle of that picture, which
 * is the upright proportion the reference layout uses. Squaring a 1280×992
 * picture costs 144px off each side — background, not subject.
 */
const CROP = {
  w: 992,
  h: 992,
  get x() {
    return PICTURE.x + (PICTURE.w - this.w) / 2;
  },
  get y() {
    return PICTURE.y + (PICTURE.h - this.h) / 2;
  },
};

/*
 * The front page. Story left, picture right — the standard newspaper lead.
 *
 * The story track is now the wider of the two: the reference sets its
 * photograph at roughly 40% of the content measure, against the 56% this
 * carried before.
 *
 * Nothing here is height-constrained: the page scrolls, so the hero takes
 * the room its content needs and the sections below follow. That is what
 * removed the whole class of clipping bugs the single-viewport version kept
 * running into.
 */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  /*
   * Try to start the clip with its sound on.
   *
   * Every current browser blocks audible autoplay unless the visitor has
   * already interacted with the page, or the site has accumulated enough
   * media-engagement history with them. Dropping `muted` outright would not
   * produce a video with sound — it would produce a video that never starts,
   * because play() rejects and the poster just sits there.
   *
   * So playback begins muted, which is always permitted, and we immediately
   * ask for sound. Chrome can also accept the play() promise and then quietly
   * re-mute or pause, so the result is re-checked rather than trusted, and
   * anything short of "playing, audible" falls back to muted with the button
   * below offering sound on a single click.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const attempt = async () => {
      video.muted = false;
      try {
        await video.play();
        if (cancelled) return;
        if (!video.paused && !video.muted) {
          setIsMuted(false);
          return;
        }
        throw new Error('blocked after play');
      } catch {
        if (cancelled) return;
        video.muted = true;
        setIsMuted(true);
        void video.play().catch(() => {});
      }
    };

    void attempt();
    return () => {
      cancelled = true;
    };
  }, []);

  /* A click is a user gesture, so sound is always allowed from here. */
  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    void video.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="shell pt-[var(--space-section)] pb-[var(--space-section)]"
    >
      {/* Splits at xl, not lg: at 1024 the story track left the headline only
          4px of slack before it wrapped. Below 1280 the columns stack, which
          gives the video the full measure anyway. */}
      {/* Tracks and gutter taken from the reference: its story column, gutter
          and photograph divide the measure 53 / 7 / 40. */}
      <div
        className="grid items-start xl:grid-cols-[minmax(0,0.86fr)_minmax(0,0.66fr)]"
        style={
          { '--hero-gap': 'clamp(2.2rem,4.9vw,4.4rem)', gap: 'var(--hero-gap)' } as CSSProperties
        }
      >
        {/* ---------------- Story ---------------- */}
        <div>
          <Reveal from="left" distance={20}>
            <p className="kicker">Introducing</p>
          </Reveal>

          {/* The lead, set as the reference sets it: one headline of two lines,
              the first roman and the second italic, at the same size and on
              consecutive baselines. The standfirst is a separate element for
              meaning, but carries the headline's face and size so the pair
              reads as a single block of type. */}
          <h1 className="display h1 mt-[var(--space-5)]">
            <SplitText text="Saghana Muthukumaran" from="left" distance={26} />
          </h1>

          <Reveal from="left" delay={0.16}>
            <p className="display h3 mt-[var(--space-2)] italic text-ink-400">
              Curious mind. Creative soul.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.24}>
            <p className="copy mt-[var(--space-6)] max-w-[52ch]">
              I approach life with unwavering optimism — not by ignoring
              challenges, but by embracing them as the architects of growth.
              Every setback is a setup for a comeback. Each obstacle refines my
              skills, sharpens my thinking, and pushes me closer to becoming the
              best version of myself. That&rsquo;s how I build — and how I live.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.32}>
            <div className="rule-hair mt-[var(--space-5)] pt-[var(--space-4)]">
              <p className="meta tracking-[0.08em]">
                {site.location} &middot; {education.degree} &middot;{' '}
                {education.dates}
              </p>
            </div>

            <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-5)]">
              <a href="#work" className="btn-ink">
                Explore the Work <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="news-link"
              >
                Read the résumé
              </a>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Picture ----------------
            No frame, no mat: the picture meets the page directly.

            Removing the CSS border alone would not have done it. intro.mp4 is
            a 1920×1080 file whose actual picture is only 1280×992 at offset
            (338, 42) — measured off the decoded frames, identical at nine
            timestamps through the clip. The rest is a black field baked into
            the encode, so a borderless box still showed a black edge.

            `object-fit` cannot crop both axes at once, so the video is instead
            oversized inside an overflow-hidden window and pulled up and left
            until exactly the CROP rectangle shows. Each value is the file
            dimension divided by the crop dimension, so the arithmetic is the
            mapping itself rather than a tuned constant. */}
        <Reveal from="right" delay={0.12} as="figure">
          <div className="relative aspect-square w-full overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/intro.mp4"
              poster="/videos/intro-poster.svg"
              controls
              playsInline
              muted={isMuted}
              autoPlay
              loop
              /* Keep state honest when sound is toggled from the native
                 controls rather than the button below. */
              onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
              className="archive-photo absolute max-w-none object-cover"
              style={{
                width: `${(FILE.w / CROP.w) * 100}%`,
                height: `${(FILE.h / CROP.h) * 100}%`,
                left: `${(-CROP.x / CROP.w) * 100}%`,
                top: `${(-CROP.y / CROP.h) * 100}%`,
              }}
            />

            {/* Shown only when the browser refused audible autoplay. Sits clear
                of the native control bar at the bottom of the frame. */}
            {isMuted && (
              <button
                type="button"
                onClick={enableSound}
                className="absolute right-[var(--space-2)] top-[var(--space-2)] flex min-h-[44px] items-center gap-[var(--space-2)] bg-band-ink/85 px-[var(--space-4)] font-mono text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-newsprint backdrop-blur-sm hover:bg-band-ink"
              >
                <span aria-hidden="true" className="text-signal">&#9834;</span>
                Play with sound
              </button>
            )}
          </div>
          <figcaption className="meta mt-[var(--space-3)] italic">
            {site.name}, on the record. Coimbatore, 2026.
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
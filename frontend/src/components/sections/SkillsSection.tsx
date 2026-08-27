import { useEffect, useRef, useState } from 'react';
import Section from '../site/Section';
import Reveal from '../site/Reveal';
import InteractiveBook from '../SkillsDiary/InteractiveBook';
import type { BookPage } from '../SkillsDiary/InteractiveBook';
import DiaryPage from '../SkillsDiary/DiaryPage';
import BookCover from '../SkillsDiary/BookCover';
import AuthorPage from '../SkillsDiary/AuthorPage';
import BackCover from '../SkillsDiary/BackCover';
import {
  skillCategories,
  languages,
  interests,
  hobbies,
} from '../../data/skills';

/* A plain list of entries, set as the diary sets them. */
function Entries({ items }: { items: string[] }) {
  return (
    <ul className="mt-[var(--space-1)]">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-[var(--space-3)] border-b border-[var(--color-diary-accent)]/20 py-[var(--space-2)] font-mono text-[length:var(--text-diary-body)] leading-[1.45] text-[var(--color-diary-ink)] last:border-0"
        >
          <span aria-hidden="true" className="text-[var(--color-diary-accent)]">
            &middot;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/*
 * The diary. Skills, languages, interests and hobbies are leaves of one book
 * rather than four more lists on the page — a portfolio's toolkit section is
 * the most template-shaped thing on any of these sites, and this is the one
 * place the page is allowed to be an object you handle rather than read.
 */
/*
 * The open book is 1.5 book-widths across, because opening it slides the
 * spine to the middle of the column. Sizing it from the measured column
 * keeps the whole spread inside the page at any width — a fixed size fitted
 * the desktop column and overhung the phone one.
 */
const BOOK_RATIO = 660 / 520;
const BOOK_MAX = 520;
const BOOK_MIN = 200;

export default function SkillsSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [bookWidth, setBookWidth] = useState(BOOK_MAX);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setBookWidth(
        Math.max(BOOK_MIN, Math.min(BOOK_MAX, Math.floor(available / 1.5)))
      );
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const pages: BookPage[] = [
    ...skillCategories.map((category, i) => (
      <DiaryPage
        key={category.label}
        eyebrow={`Toolkit ${i + 1} of ${skillCategories.length}`}
        title={category.label}
        note={category.note}
        folio={i + 1}
      >
        <Entries items={category.skills} />
      </DiaryPage>
    )),

    <DiaryPage
      key="languages"
      eyebrow="Off the keyboard"
      title="Languages"
      folio={skillCategories.length + 1}
    >
      <Entries items={languages.map((l) => `${l.name} — ${l.level}`)} />
    </DiaryPage>,

    <DiaryPage
      key="interests"
      eyebrow="Off the keyboard"
      title="Interests"
      note="Where the reading and the tinkering goes."
      folio={skillCategories.length + 2}
    >
      <Entries items={interests} />
    </DiaryPage>,

    <DiaryPage
      key="hobbies"
      eyebrow="Off the keyboard"
      title="Hobbies"
      note="Away from the screen entirely."
      folio={skillCategories.length + 3}
    >
      <Entries items={hobbies} />
    </DiaryPage>,

    <AuthorPage
      key="author"
      src="/images/myimage.png"
      folio={skillCategories.length + 4}
    />,
  ];

  return (
    <Section
      id="skills"
      kicker="The Diary"
      title="Skills Proficiency of"
      accent="Saghana Muthukumaran"
    >
      <Reveal from="up">
        <p className="copy max-w-[62ch] italic">
          Flip through to explore my technical toolkit.
        </p>
      </Reveal>

      <Reveal from="up" delay={0.1}>
        <div
          ref={frameRef}
          className="mt-[var(--space-8)] flex flex-col items-center"
        >
          <InteractiveBook
            width={bookWidth}
            height={Math.round(bookWidth * BOOK_RATIO)}
            frontCover={
              <BookCover
                title="Skills Proficiency"
                subtitle="Saghana Muthukumaran"
                imprint="The Saghana Chronicle"
              />
            }
            backCover={<BackCover src="/images/growth-quote.png" />}
            innerPages={pages}
            borderRadius={4}
            shadow={{ color: '#17130D', opacity: 0.35, blur: 24, offsetX: 6, offsetY: 10 }}
            label="Skills diary. Press Enter or click to turn the page."
          />

          <p className="meta mt-[var(--space-6)] text-center">
            Click the book to turn a page &middot; click again at the end to close it
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
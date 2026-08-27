import { site, navItems } from '../../data/site';

/*
 * The colophon. Ink surface, mirroring the bulletin at the top so the page
 * is bracketed by the same dark band.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-band-ink text-newsprint">
      <div className="shell py-[var(--space-7)]">
        <div className="flex flex-col gap-[var(--space-5)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-nameplate)] text-[length:var(--text-nameplate-sm)] leading-[1.2]">
              {site.masthead}
            </p>

            <ul className="mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-[var(--space-2)]">
              {navItems.map((item, i) => (
                <li key={item.id} className="flex items-center gap-[var(--space-4)]">
                  <a
                    href={`#${item.id}`}
                    className="flex min-h-[44px] min-w-[44px] items-center font-mono text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-newsprint/75 hover:text-signal"
                  >
                    {item.label}
                  </a>
                  {i < navItems.length - 1 && (
                    <span className="text-newsprint/25">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap gap-x-[var(--space-5)] gap-y-[var(--space-2)]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-[44px] min-w-[44px] items-center font-mono text-[length:var(--text-label)] tracking-[0.06em] text-newsprint/75 hover:text-signal"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center font-mono text-[length:var(--text-label)] tracking-[0.06em] text-newsprint/75 hover:text-signal"
              >
                GitHub
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] min-w-[44px] items-center font-mono text-[length:var(--text-label)] tracking-[0.06em] text-newsprint/75 hover:text-signal"
                >
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center font-mono text-[length:var(--text-label)] tracking-[0.06em] text-newsprint/75 hover:text-signal"
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-[var(--space-5)] border-t border-newsprint/30 pt-[var(--space-3)] text-center">
          <p className="font-mono text-[length:var(--text-micro)] tracking-[0.06em] text-newsprint/60">
            &copy; {year} {site.name} &middot; {site.location} &middot; Built with
            React, Tailwind &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
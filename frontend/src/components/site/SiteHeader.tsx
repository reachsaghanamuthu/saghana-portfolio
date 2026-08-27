import { site, navItems, tickerItems } from '../../data/site';

/*
 * Masthead, navigation and standing bulletin.
 *
 * Everything is set to the same measure as the page body — masthead, rule,
 * bulletin and all — so the whole paper reads as one centred column inside
 * the window's outer gutter. The bulletin in particular is *not* full-bleed:
 * running it to the window edges is what made the page look like a web app
 * rather than a printed sheet.
 *
 * Returns a fragment rather than wrapping everything in one <header>. A
 * sticky element only sticks while its own parent is on screen, so a <nav>
 * inside a short header scrolls away with it — the strip has to be a direct
 * child of the full-height page wrapper to survive the whole document.
 */
export default function SiteHeader() {
  return (
    <>
      <header className="shell pt-[var(--space-5)]">
        {/* The side notes carry one fact each, not two. On the narrower page
            measure the fuller strings wrapped to a second line either side of
            the masthead; the role and the year both appear elsewhere on the
            page anyway. */}
        <div className="grid items-center gap-[var(--space-3)] text-center xl:grid-cols-[1fr_auto_1fr]">
          <p className="hidden meta tracking-[0.06em] xl:block xl:text-left">
            {site.location}
          </p>

          {/* Blackletter, and only here — the nameplate is the one place a
              paper uses it. It needs a size or two more than a Didone to
              read at the same optical weight. */}
          <a
            href="#top"
            className="inline-block py-[var(--space-1)] font-[family-name:var(--font-nameplate)] text-[length:var(--text-nameplate)] leading-[1.15] tracking-[0.01em] text-ink-900 hover:text-ink-400"
          >
            {site.masthead}
          </a>

          <p className="hidden meta tracking-[0.06em] xl:block xl:text-right">
            {site.availability}
          </p>
        </div>
      </header>

      {/* ---------- Sticky navigation ----------
          The band spans the gutter so nothing shows through behind it once it
          sticks, but its links sit on the shared measure.

          It carries the `newsprint` texture rather than a flat fill: the
          texture is `background-attachment: fixed`, so the band's grain lines
          up exactly with the page's and the strip is invisible until it
          actually sticks. A flat colour left a faintly lighter band across
          the masthead. */}
      <nav className="newsprint sticky top-0 z-40 -mx-[20px] mt-[var(--space-3)] px-[20px]">
        <div className="shell">
          <ul className="flex flex-wrap items-center justify-center gap-x-[var(--space-4)] gap-y-[var(--space-1)] md:gap-x-[var(--space-6)]">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center px-[var(--space-1)] font-mono text-[length:var(--text-label)] uppercase tracking-[0.2em] text-ink-700 hover:text-ink-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* The broadsheet double rule that closes the masthead. It lives
              inside the sticky band so it travels with it, which gives the
              strip a clean edge over content passing underneath instead of
              needing a scroll listener to switch a border on. */}
          <div className="rule-heavy" />
        </div>
      </nav>

      <div className="shell">
        {/* ---------- Standing bulletin ----------
            Two identical tracks run back to back so the -50% loop is seamless.

            The items are set grey rather than in the gold accent: the bulletin
            is standing background information, and at full accent strength it
            competed with the masthead directly above it. The grey is derived
            from the page colour, so it stays tied to the paper. */}
        <div
          className="mt-[var(--space-3)] overflow-hidden bg-band-ink py-[var(--space-2)]"
          aria-hidden="true"
        >
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {tickerItems.map((item) => (
                  <span
                    key={item}
                    className="whitespace-nowrap px-[var(--space-5)] font-mono text-[length:var(--text-micro)] tracking-[0.08em] text-ticker"
                  >
                    {item}
                    <span className="ml-[var(--space-5)] text-ticker-dim">&middot;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The bulletin is decorative motion; this keeps it in the accessibility
          tree exactly once, as static text. */}
      <p className="sr-only">{tickerItems.join('. ')}</p>
    </>
  );
}
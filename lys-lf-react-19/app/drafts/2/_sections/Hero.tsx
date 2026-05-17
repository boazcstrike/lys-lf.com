import siteConfig, { headerConfig } from "@/app/assets/data/site-config"

/**
 * Hero — Quiet Luxury direction.
 * Stone background, serif headline (Cormorant), brass hairline,
 * framed photo (LYS-29) with offset decorative border.
 * Single h1 on the page. Pure CSS hover — no JS handlers.
 * Colors via CSS custom properties (--d6-*).
 */
export default function Hero() {
  const { firmName, firmShortName, establishedYear, contact } = siteConfig
  const { tagline, description } = headerConfig

  return (
    <header
      style={{
        backgroundColor: "var(--d6-bg)",
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="w-full"
    >
      {/* ── Utility top bar ────────────────────────────────────────── */}
      <div
        style={{ borderBottom: "1px solid var(--d6-hair)" }}
        className="hidden sm:block"
      >
        <div
          style={{ color: "var(--d6-faint)" }}
          className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[11px]"
        >
          <span
            style={{ color: "var(--d6-accent)", letterSpacing: "0.22em" }}
            className="font-medium uppercase"
          >
            Est. {establishedYear}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contact.phone}`}
              style={{ color: "inherit" }}
              className="transition-colors hover:text-[var(--d6-heading)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              style={{ color: "inherit" }}
              className="transition-colors hover:text-[var(--d6-heading)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Logo / nav bar ─────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--d6-hair)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <a
            href="#"
            className="flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
          >
            <img
              src="/images/optimized/lys-logo.webp"
              alt={`${firmShortName} logo`}
              width={52}
              height={52}
              className="h-[52px] w-auto object-contain"
            />
            <div>
              <p
                style={{
                  color: "var(--d6-accent)",
                  letterSpacing: "0.2em",
                  fontSize: "9px",
                }}
                className="font-medium uppercase"
              >
                Law Firm
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "var(--d6-heading)",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                }}
              >
                {firmName}
              </p>
            </div>
          </a>

          <nav aria-label="Main navigation">
            <ul
              style={{ color: "var(--d6-muted)" }}
              className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-widest md:flex"
            >
              {(
                [
                  ["Practice Areas", "#practice-areas"],
                  ["About", "#about"],
                  ["Team", "#team"],
                  ["Contact", "#contact"],
                ] as const
              ).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{ color: "inherit" }}
                    className="transition-colors hover:text-[var(--d6-heading)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Hero split layout ──────────────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:py-28">
        {/* Left: text */}
        <div className="flex flex-col">
          {/* Eyebrow label */}
          <p
            style={{ color: "var(--d6-accent)", letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-5 font-medium uppercase"
          >
            Full-Service Law Office &middot; Philippines
          </p>

          {/* h1 — large Cormorant Garamond */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "var(--d6-heading)",
              fontWeight: 500,
              lineHeight: 1.08,
            }}
            className="mb-6 text-[2.75rem] sm:text-[3.5rem] lg:text-[3.75rem]"
          >
            {firmName}
          </h1>

          {/* Brass hairline */}
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: "var(--d6-accent)" }}
            className="mb-6"
            aria-hidden="true"
          />

          <p
            style={{ color: "var(--d6-text)", lineHeight: 1.72 }}
            className="mb-4 text-base"
          >
            {tagline}
          </p>

          <p
            style={{ color: "var(--d6-faint)", lineHeight: 1.75 }}
            className="mb-10 text-sm"
          >
            {description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              style={{
                backgroundColor: "var(--d6-panel)",
                color: "var(--d6-hero-text)",
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
            >
              Contact Us
            </a>
            <a
              href="#practice-areas"
              style={{
                border: "1px solid var(--d6-accent)",
                color: "var(--d6-heading)",
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-colors hover:bg-[var(--d6-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2"
            >
              Our Practice Areas
            </a>
          </div>
        </div>

        {/* Right: framed photo */}
        <div className="relative mt-6 md:mt-0">
          {/* Decorative offset border */}
          <div
            style={{
              border: "1px solid var(--d6-accent-line)",
              position: "absolute",
              top: "14px",
              left: "14px",
              right: "-14px",
              bottom: "-14px",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Photo frame */}
          <div
            style={{
              boxShadow: "0 8px 40px var(--d6-scrim-top)",
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            <img
              src="/images/optimized/LYS-29.webp"
              alt="Attorneys of the Lim and Yutatco-Sze Law Firm in the office"
              className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-[460px]"
            />
          </div>

          {/* Est. badge — bottom-left */}
          <div
            style={{
              backgroundColor: "var(--d6-panel)",
              color: "var(--d6-hero-text)",
              position: "absolute",
              bottom: "-1rem",
              left: "1.5rem",
              zIndex: 2,
              padding: "0.875rem 1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Est. {establishedYear}
            </p>
            <p
              style={{
                color: "var(--d6-accent)",
                letterSpacing: "0.18em",
                fontSize: "8px",
                marginTop: "4px",
              }}
              className="uppercase"
            >
              Years of Excellence
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

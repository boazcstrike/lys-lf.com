import siteConfig, { headerConfig } from "@/app/assets/data/site-config"

// Quiet Luxury palette constants — used inline to avoid globals.css edits
const GREEN = "#1F3A2E"
const BRASS = "#A98B5D"
const CHARCOAL = "#2B2622"
const STONE = "#EFEAE1"
const PANEL = "#F6F2EA"

/**
 * Hero — Quiet Luxury direction.
 * Stone background, serif headline (Cormorant), brass hairline,
 * framed photo (LYS-29) with offset decorative border.
 * Single h1 on the page. Pure CSS hover — no JS handlers.
 */
export default function Hero() {
  const { firmName, firmShortName, establishedYear, contact } = siteConfig
  const { tagline, description } = headerConfig

  return (
    <header
      style={{
        backgroundColor: STONE,
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="w-full"
    >
      {/* ── Utility top bar ────────────────────────────────────────── */}
      <div
        style={{ borderBottom: `1px solid ${BRASS}33` }}
        className="hidden sm:block"
      >
        <div
          style={{ color: `${CHARCOAL}99` }}
          className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[11px]"
        >
          <span
            style={{ color: BRASS, letterSpacing: "0.22em" }}
            className="font-medium uppercase"
          >
            Est. {establishedYear}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contact.phone}`}
              style={{ color: "inherit" }}
              className="transition-colors hover:text-[#1F3A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              style={{ color: "inherit" }}
              className="transition-colors hover:text-[#1F3A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Logo / nav bar ─────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${BRASS}33` }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <a
            href="#"
            className="flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
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
                  color: BRASS,
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
                  color: GREEN,
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
              style={{ color: `${CHARCOAL}aa` }}
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
                    className="transition-colors hover:text-[#1F3A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
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
            style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-5 font-medium uppercase"
          >
            Full-Service Law Office &middot; Philippines
          </p>

          {/* h1 — large Cormorant Garamond */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: GREEN,
              fontWeight: 500,
              lineHeight: 1.08,
            }}
            className="mb-6 text-[2.75rem] sm:text-[3.5rem] lg:text-[3.75rem]"
          >
            {firmName}
          </h1>

          {/* Brass hairline */}
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: BRASS }}
            className="mb-6"
            aria-hidden="true"
          />

          <p
            style={{ color: CHARCOAL, lineHeight: 1.72 }}
            className="mb-4 text-base"
          >
            {tagline}
          </p>

          <p
            style={{ color: `${CHARCOAL}99`, lineHeight: 1.75 }}
            className="mb-10 text-sm"
          >
            {description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              style={{
                backgroundColor: GREEN,
                color: PANEL,
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
            >
              Contact Us
            </a>
            <a
              href="#practice-areas"
              style={{
                border: `1px solid ${BRASS}`,
                color: GREEN,
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-colors hover:bg-[#A98B5D]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
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
              border: `1px solid ${BRASS}55`,
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
              boxShadow: "0 8px 40px rgba(31,58,46,0.14)",
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
              backgroundColor: GREEN,
              color: PANEL,
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
                color: BRASS,
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

/**
 * Hero / Header section — Editorial Prestige Draft 1
 *
 * Structure:
 *   1. SiteHeader — sticky top banner (utility bar + logo/nav) with persistent
 *      contact. Pattern ported from draft 2's Hero (utility-bar + nav), restyled
 *      with draft 1's tokens (ivory/navy/gold) and Playfair/Source Sans fonts.
 *   2. Hero — full-bleed asymmetric intro: left half photo, right half serif
 *      headline. Carries id="home" so the shared ThemeProvider skip link
 *      (href="#home") lands here, past the sticky nav. Contains the page's
 *      single <h1>. On mobile it stacks vertically.
 *
 * Animation:
 *   - Right-panel content fades up on load via CSS keyframe (@keyframes heroFadeUp).
 *   - Established year badge uses CountUpYear client component.
 *   - CTA buttons get a press scale(0.97) via CSS active state.
 *   - Hover: opacity lift on buttons, gold underline grow on outline button.
 *   - All movement is disabled under prefers-reduced-motion (media query below).
 *
 * Smooth scroll: CSS scroll-behavior:smooth applied on the page wrapper in page.tsx.
 *
 * Design tokens:
 *   Ivory: #FBF8F1  Navy: #14213D  Gold: #C5A572  Charcoal: #1A1A2E
 */

import React from "react"
import { FaPhoneAlt } from "react-icons/fa"
import siteConfig, { headerConfig } from "@/app/assets/data/site-config"
import CountUpYear from "@/app/drafts/1/_components/CountUpYear"
import MobileNav from "@/app/drafts/1/_components/MobileNav"
import { NAV_ITEMS } from "@/app/drafts/1/_components/nav-items"

// ─── Contact helpers ──────────────────────────────────────────────────────────

/**
 * Builds a dialable `tel:` href from a formatted phone string by stripping
 * every character that is not a digit or a leading "+". Keeps the raw display
 * value untouched for the visible label.
 */
function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

// Primary navigation lives in ./nav-items (shared with MobileNav — one source
// of truth so desktop and mobile navs never drift).

// ─── Hairline gold rule ───────────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px ${className}`}
      style={{ backgroundColor: "var(--d6-accent)" }}
    />
  )
}

// ─── Small-caps eyebrow label ─────────────────────────────────────────────────
function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 text-xs tracking-[0.22em] uppercase"
      style={{
        color: "var(--d6-accent)",
        fontFamily: "var(--font-source-sans)",
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  )
}

// ─── Sticky site header: utility bar + logo/nav with persistent contact ───────
function SiteHeader() {
  const { firmName, firmShortName, establishedYear, contact } = siteConfig
  const telHref = toTelHref(contact.phone)

  return (
    <header
      className="site-header sticky top-0 z-50 relative"
      style={{
        backgroundColor: "var(--d6-bg)",
        fontFamily: "var(--font-source-sans)",
      }}
    >
      {/* Utility bar — Est. year + persistent phone/email (md and up) */}
      <div
        className="hidden md:block"
        style={{ borderBottom: "1px solid var(--d6-hair)" }}
      >
        <div
          className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[11px]"
          style={{ color: "var(--d6-faint)" }}
        >
          <span
            className="font-semibold uppercase"
            style={{ color: "var(--d6-accent-text)", letterSpacing: "0.22em" }}
          >
            Est. {establishedYear}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={telHref}
              className="site-header-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{ color: "inherit" }}
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="site-header-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{ color: "inherit" }}
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Logo / nav bar */}
      <div style={{ borderBottom: "1px solid var(--d6-hair)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <a
            href="#home"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
          >
            <img
              src="/images/optimized/lys-logo.webp"
              alt={`${firmShortName} logo`}
              width={44}
              height={44}
              className="h-11 w-auto object-contain"
            />
            <span className="flex flex-col">
              <span
                className="font-semibold uppercase"
                style={{
                  color: "var(--d6-accent-text)",
                  letterSpacing: "0.24em",
                  fontSize: "10px",
                }}
              >
                Law Firm
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--d6-heading)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  lineHeight: 1.2,
                }}
              >
                {firmName}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-8">
            <nav aria-label="Primary">
              <ul
                className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-widest md:flex"
                style={{ color: "var(--d6-muted)" }}
              >
                {NAV_ITEMS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="site-header-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
                      style={{ color: "inherit" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Persistent contact on small screens (utility bar is hidden there) */}
            <a
              href={telHref}
              aria-label={`Call ${siteConfig.firmShortName} at ${contact.phoneDisplay}`}
              className="hero-cta-solid inline-flex min-h-[40px] items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{
                backgroundColor: "var(--d6-accent)",
                color: "var(--d6-accent-contrast)",
                fontFamily: "var(--font-source-sans)",
                transition: "transform 180ms ease-out, opacity 180ms ease-out",
              }}
            >
              <FaPhoneAlt aria-hidden="true" className="h-3 w-3" />
              Call
            </a>

            {/* Hamburger disclosure — exposes the primary nav below md, where
                the desktop <ul> is hidden. Client component (focus trap + esc). */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const telHref = toTelHref(siteConfig.contact.phone)

  return (
    <>
      <SiteHeader />

      {/*
        Hero intro region. id="home" is the skip-link target: focus jumps here,
        skipping the sticky SiteHeader above. Kept as a <section> (not a second
        <header>) so the page exposes a single banner landmark.
      */}
      <section
        id="home"
        tabIndex={-1}
        aria-label="Introduction"
        className="relative flex min-h-[100svh] flex-col outline-none lg:flex-row"
        style={{ backgroundColor: "var(--d6-panel)" }}
      >
        {/* ── Left panel: full-bleed hero photograph ── */}
        <div className="relative h-[56vw] min-h-[280px] w-full lg:h-auto lg:w-[58%] lg:min-h-[100svh]">
          <img
            src="/images/optimized/LYS-29.webp"
            alt="Lim and Yutatco-Sze Law Firm office — a professional and welcoming legal environment"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />

          {/* Gradient: fades photo into navy at right edge on desktop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, var(--d6-scrim-top) 52%, var(--d6-panel) 100%)",
            }}
          />

          {/* Gradient: darkens bottom edge on mobile */}
          <div
            aria-hidden="true"
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, var(--d6-scrim-top) 38%, var(--d6-panel) 100%)",
            }}
          />

          {/* Established year badge — bottom-left corner of photo.
              CountUpYear is a client component; it counts up on scroll-into-view. */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <GoldRule className="w-8" />
            <p
              className="text-xs tracking-[0.18em] uppercase"
              style={{
                color: "var(--d6-accent)",
                fontFamily: "var(--font-source-sans)",
              }}
            >
              Est.{" "}
              <CountUpYear
                year={siteConfig.establishedYear}
                style={{ fontVariantNumeric: "tabular-nums" }}
              />
            </p>
          </div>
        </div>

        {/* ── Right panel: editorial text — CSS fade-up on load ── */}
        {/*
          heroFadeUp keyframe is injected inline via a <style> tag below.
          `prefers-reduced-motion` is handled by the media query inside the style block.
        */}
        <div
          className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-14 lg:py-20 xl:px-20"
          style={{
            backgroundColor: "var(--d6-panel)",
            animation: "heroFadeUp 420ms ease-out both",
          }}
        >
          <EyebrowLabel>{siteConfig.firmShortName} Law Firm · Philippines</EyebrowLabel>

          {/* Thin gold rule before headline */}
          <GoldRule className="mb-8 w-12" />

          {/* Page's single h1 — one per document */}
          <h1
            className="mb-6 text-4xl leading-[1.08] md:text-5xl xl:text-6xl"
            style={{
              color: "var(--d6-hero-text)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
            }}
          >
            Lim &amp;{" "}
            <span style={{ color: "var(--d6-accent)" }}>Yutatco&#8209;Sze</span>
            <br />
            Law Firm
          </h1>

          {/* Wider gold rule after headline */}
          <GoldRule className="mb-8 w-24" />

          {/* Tagline — max 68ch keeps line length in editorial range */}
          <p
            className="mb-4 max-w-[42ch] text-base leading-[1.65] md:text-lg"
            style={{
              color: "var(--d6-hero-muted)",
              fontFamily: "var(--font-source-sans)",
            }}
          >
            {headerConfig.tagline}
          </p>

          {/* Description */}
          <p
            className="mb-10 max-w-[52ch] text-sm leading-[1.7]"
            style={{
              color: "var(--d6-hero-text)",
              fontFamily: "var(--font-source-sans)",
              opacity: 0.62,
            }}
          >
            {headerConfig.description}
          </p>

          {/*
            CTA row — press scale + hover lift handled by CSS class below.
            Primary action is now a direct tel: call (the previous primary only
            anchored #contact). "Consult Us" (#contact) is retained as a
            secondary outline action; "Our Practice" remains the tertiary.
          */}
          <div className="flex flex-wrap gap-4">
            <a
              href={telHref}
              aria-label={`Call ${siteConfig.firmShortName} at ${siteConfig.contact.phoneDisplay}`}
              className="hero-cta-solid inline-flex min-h-[44px] items-center justify-center gap-2 px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{
                backgroundColor: "var(--d6-accent)",
                color: "var(--d6-accent-contrast)",
                fontFamily: "var(--font-source-sans)",
                transition: "transform 180ms ease-out, opacity 180ms ease-out",
              }}
            >
              <FaPhoneAlt aria-hidden="true" className="h-3.5 w-3.5" />
              Call {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href="#contact"
              className="hero-cta-outline inline-flex min-h-[44px] items-center justify-center border px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{
                borderColor: "var(--d6-accent)",
                color: "var(--d6-accent)",
                fontFamily: "var(--font-source-sans)",
                transition: "transform 180ms ease-out, opacity 180ms ease-out",
              }}
            >
              Consult Us
            </a>
            {/* Tertiary — quieter tier (translucent hairline + muted label) so
                the CTA row reads Call → Consult → Our Practice in weight. */}
            <a
              href="#practice-areas"
              className="hero-cta-outline inline-flex min-h-[44px] items-center justify-center border px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{
                borderColor: "var(--d6-accent-line)",
                color: "var(--d6-hero-muted)",
                fontFamily: "var(--font-source-sans)",
                transition: "transform 180ms ease-out, opacity 180ms ease-out",
              }}
            >
              Our Practice
            </a>
          </div>
        </div>
      </section>

      {/*
        Inline <style> keeps these hero-only keyframes + hover rules scoped
        without touching globals.css. The @media block disables the fade-up
        animation and press-scale transforms when the user prefers reduced motion.
      */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .site-header-link { transition: color 180ms ease-out; }
        .site-header-link:hover { color: var(--d6-heading); }
        .hero-cta-solid:hover  { opacity: 0.88; }
        .hero-cta-solid:active { transform: scale(0.97); }
        .hero-cta-outline:hover  { opacity: 0.80; }
        .hero-cta-outline:active { transform: scale(0.97); }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroFadeUp"] { animation: none !important; }
          .site-header-link,
          .hero-cta-solid,
          .hero-cta-outline { transition: none !important; }
          .hero-cta-solid:active,
          .hero-cta-outline:active { transform: none !important; }
        }
      `}</style>
    </>
  )
}

export default Hero

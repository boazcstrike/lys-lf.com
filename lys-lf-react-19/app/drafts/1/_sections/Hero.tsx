/**
 * Hero / Header section — Editorial Prestige Draft 1
 *
 * Full-bleed asymmetric hero: left half photo, right half serif headline.
 * Contains the single <h1> for the page. On mobile it stacks vertically.
 *
 * Animation:
 *   - Right-panel content fades up on load via CSS keyframe (@keyframes heroFadeUp).
 *   - Established year badge uses CountUpYear client component.
 *   - CTA buttons get a press scale(0.97) via CSS active state.
 *   - Hover: opacity lift on buttons, gold underline grow on outline button.
 *
 * Smooth scroll: CSS scroll-behavior:smooth applied on the page wrapper in page.tsx.
 *
 * Design tokens:
 *   Ivory: #FBF8F1  Navy: #14213D  Gold: #C5A572  Charcoal: #1A1A2E
 */

import React from "react"
import siteConfig, { headerConfig } from "@/app/assets/data/site-config"
import CountUpYear from "@/app/drafts/1/_components/CountUpYear"

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

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  return (
    <header
      className="relative flex min-h-[100svh] flex-col lg:flex-row"
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
        <div
          className="absolute bottom-6 left-6 flex items-center gap-3"
        >
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
        className="flex flex-1 flex-col justify-center px-8 py-14 lg:px-14 xl:px-20"
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

        {/* CTA row — press scale + hover lift handled by CSS class below */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="hero-cta-solid inline-flex min-h-[44px] items-center justify-center px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
            style={{
              backgroundColor: "var(--d6-accent)",
              color: "var(--d6-accent-contrast)",
              fontFamily: "var(--font-source-sans)",
              transition: "transform 180ms ease-out, opacity 180ms ease-out",
            }}
          >
            Consult Us
          </a>
          <a
            href="#practice-areas"
            className="hero-cta-outline inline-flex min-h-[44px] items-center justify-center border px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
            style={{
              borderColor: "var(--d6-accent)",
              color: "var(--d6-accent)",
              fontFamily: "var(--font-source-sans)",
              transition: "transform 180ms ease-out, opacity 180ms ease-out",
            }}
          >
            Our Practice
          </a>
        </div>
      </div>

      {/*
        Inline <style> keeps these hero-only keyframes + hover rules scoped
        without touching globals.css. The @media block disables the fade-up
        animation when the user prefers reduced motion.
      */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroFadeUp"] { animation: none !important; }
        }
        .hero-cta-solid:hover  { opacity: 0.88; }
        .hero-cta-solid:active { transform: scale(0.97); }
        .hero-cta-outline:hover  { opacity: 0.80; }
        .hero-cta-outline:active { transform: scale(0.97); }
      `}</style>
    </header>
  )
}

export default Hero

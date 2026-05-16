/**
 * Hero — Swiss Architectural (Draft 5)
 *
 * Layout: two hard columns on desktop — left 55% text panel, right 45% photo block.
 * A full-bleed 1px black horizontal rule bisects the page at mid-height (desktop).
 * Big red "01" index anchors top-left. Oversized Space Grotesk wordmark stacks
 * vertically. Thin structural grid lines as purely decorative background.
 * Single <h1> for the page.
 *
 * No JS handlers — pure CSS hover via Tailwind.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const Hero: React.FC = () => {
  return (
    <header
      id="home"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #0A0A0A",
        minHeight: "100svh",
      }}
    >
      {/* ── Thin vertical grid lines — decorative structural background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent calc(25% - 0.5px), #0A0A0A calc(25% - 0.5px), #0A0A0A 25%)",
          opacity: 0.06,
        }}
      />

      {/* ── Horizontal mid rule — desktop only ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden w-full lg:block"
        style={{ top: "50%", height: "1px", backgroundColor: "#0A0A0A", opacity: 0.12 }}
      />

      {/* ── Main two-column grid ── */}
      <div className="flex min-h-[100svh] flex-col lg:flex-row">

        {/* LEFT PANEL — text content */}
        <div
          className="relative flex flex-col justify-between px-6 pb-10 pt-10 lg:w-[55%] lg:px-14 lg:pb-14 lg:pt-14 xl:px-20"
          style={{ borderRight: "1px solid #0A0A0A" }}
        >
          {/* Top row: section index + established label */}
          <div className="flex items-baseline justify-between">
            {/* Red index number */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "#D72638",
                lineHeight: 1,
              }}
            >
              01
            </span>

            {/* Est. label — small, all-caps, tight tracking */}
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.45 }}
            >
              Est. {siteConfig.establishedYear}
            </span>
          </div>

          {/* Red top rule under index row */}
          <div
            aria-hidden="true"
            className="my-6"
            style={{ height: "3px", width: "40px", backgroundColor: "#D72638" }}
          />

          {/* Oversized stacked wordmark — single h1 */}
          <h1
            className="flex-1 leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              color: "#0A0A0A",
              fontSize: "clamp(3.25rem, 8vw + 1rem, 7.5rem)",
            }}
          >
            Lim &amp;
            <br />
            Yutatco-
            <br />
            <span style={{ color: "#D72638" }}>Sze</span>
            <br />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "0.35em",
                color: "#0A0A0A",
                opacity: 0.55,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Law Firm
            </span>
          </h1>

          {/* Bottom: tagline + CTA buttons */}
          <div className="mt-10 lg:mt-0">
            {/* 1px rule */}
            <div
              aria-hidden="true"
              className="mb-6"
              style={{ height: "1px", backgroundColor: "#0A0A0A", opacity: 0.15 }}
            />

            <p
              className="mb-8 max-w-sm text-sm leading-relaxed lg:text-base"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#0A0A0A",
                opacity: 0.65,
              }}
            >
              Full-service law office. Corporate, labor &amp; tax law. Philippines.
            </p>

            {/* CTA row — no JS, pure CSS hover */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D72638]"
                style={{
                  backgroundColor: "#0A0A0A",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Consult Us
              </a>
              <a
                href="#practice-areas"
                className="inline-flex min-h-[48px] items-center justify-center px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
                style={{
                  border: "1px solid #0A0A0A",
                  color: "#0A0A0A",
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "transparent",
                }}
              >
                Our Practice
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — photo block */}
        <div className="relative h-[56vw] min-h-[300px] flex-1 lg:h-auto lg:min-h-0">
          <img
            src="/images/optimized/LYS-29.webp"
            alt="Interior of the Lim and Yutatco-Sze Law Firm office"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark overlay for contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10,10,10,0.18)" }}
          />

          {/* Firm short-name — bottom left square badge */}
          <div
            className="absolute bottom-0 left-0 flex h-16 w-16 items-center justify-center lg:h-20 lg:w-20"
            style={{ backgroundColor: "#D72638" }}
            aria-hidden="true"
          >
            <span
              className="text-base font-bold lg:text-lg"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#FFFFFF",
                letterSpacing: "0.05em",
              }}
            >
              {siteConfig.firmShortName}
            </span>
          </div>

          {/* Top-right photo label */}
          <div
            className="absolute right-4 top-4 flex items-center gap-2"
            aria-hidden="true"
          >
            <div style={{ width: "20px", height: "1px", backgroundColor: "#FFFFFF", opacity: 0.6 }} />
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-inter)", color: "#FFFFFF", opacity: 0.6 }}
            >
              Filinvest City, Alabang
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero

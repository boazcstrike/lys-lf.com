"use client"

/**
 * HeroSection — Heritage Traditional
 * Masthead over dark-overlay photo. A centered ceremonial "crest" (est badge,
 * seal, firm name) sits above a LEFT-ALIGNED editorial body block (tagline,
 * description, CTAs) — deliberate asymmetry for modern gravitas while keeping
 * the heritage tone.
 *
 * Client component: load-in fade/rise + EstYear count-up + hover CTAs.
 * Honors prefers-reduced-motion (skips the reveal transforms/transitions).
 *
 * LCP: background photo rendered via next/image with `priority` (emits preload
 * + fetchpriority=high) instead of a CSS background-image.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 */

import { useEffect, useState } from "react"
import Image from "next/image"
import siteConfig, { headerConfig } from "@/app/assets/data/site-config"
import EstYear from "../_components/EstYear"
import OrnamentalDivider from "../_components/OrnamentalDivider"

export default function HeroSection() {
  // Trigger content reveal once mounted (replaces server SSR opacity-0 start).
  const [loaded, setLoaded] = useState(false)
  // When true, the reveal is shown fully with no motion (accessibility).
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      // Render final state immediately; no animation.
      setReduceMotion(true)
      setLoaded(true)
      return
    }

    // Small rAF delay so the browser paints before the transition fires.
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const contentStyle: React.CSSProperties = {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: reduceMotion
      ? "none"
      : "opacity 600ms ease-out, transform 600ms ease-out",
  }

  // Crest settles slightly slower for layered feel.
  const crestStyle: React.CSSProperties = {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(12px)",
    transition: reduceMotion
      ? "none"
      : "opacity 800ms ease-out 120ms, transform 800ms ease-out 120ms",
  }

  return (
    <header
      role="banner"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--d6-panel)" }}
    >
      {/* Background photo — real image with priority for a fast, preloaded LCP.
          alt="" marks it decorative so it is skipped by assistive tech. */}
      <Image
        src="/images/optimized/LYS-24.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Multi-layer overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--d6-scrim-top) 0%, var(--d6-scrim-mid) 55%, var(--d6-scrim-bot) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Masthead content */}
      <div
        className="relative z-10 flex flex-col items-center px-6 py-16 max-w-3xl mx-auto w-full"
        style={contentStyle}
      >
        {/* ── Ceremonial crest (centered) ─────────────────────────────── */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Top ornamental rule — draws in after mount */}
          <OrnamentalDivider className="mb-8 w-full max-w-xs" color="var(--d6-accent)" />

          {/* Established badge — count-up on reveal */}
          <p
            className="tracking-[0.3em] text-xs uppercase mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
          >
            Est. <EstYear year={siteConfig.establishedYear} />
          </p>

          {/* Logo — settles with slight separate delay */}
          <div style={crestStyle}>
            <img
              src="/images/optimized/lys-white-logo-darker.webp"
              alt={`${siteConfig.firmName} seal`}
              width={120}
              height={120}
              className="mb-6"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Firm name — single h1 on the page */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-3"
            style={{
              fontFamily: "var(--font-libre)",
              color: "var(--d6-hero-text)",
              fontWeight: 700,
              // Hair of negative tracking tightens the display serif for a
              // solid, engraved-nameplate feel at large sizes.
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.firmName}
          </h1>

          {/* Short-name crest line */}
          <p
            className="tracking-[0.45em] text-sm uppercase"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
          >
            {siteConfig.firmShortName}
          </p>
        </div>

        {/* ── Editorial body (left-aligned for asymmetry) ─────────────── */}
        <div className="w-full max-w-2xl text-left mt-10">
          {/* Ornamental rule — left-anchored to lead the editorial column */}
          <OrnamentalDivider className="mb-8 w-full max-w-xs" color="var(--d6-accent)" />

          {/* Tagline */}
          <p
            className="text-base sm:text-lg leading-[1.7] mb-4 max-w-[60ch]"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-hero-muted)" }}
          >
            {headerConfig.tagline}
          </p>

          {/* Description — slightly dimmer; rendered at 75% of heroMuted */}
          <p
            className="text-sm sm:text-base leading-[1.75] max-w-[60ch]"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-hero-muted)", opacity: 0.75 }}
          >
            {headerConfig.description}
          </p>

          {/* CTA row — primary + secondary, left-anchored, wraps on small screens */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Primary CTA — press scale + border-glow hover via inline transition */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--d6-accent)]"
              style={{
                fontFamily: "var(--font-lora)",
                borderColor: "var(--d6-accent)",
                color: "var(--d6-hero-text)",
                minHeight: "44px",
                transition:
                  "background-color 200ms ease-out, transform 150ms ease-out, border-color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.backgroundColor = "var(--d6-accent-soft)"
                t.style.borderColor = "var(--d6-accent)"
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.backgroundColor = ""
                t.style.borderColor = "var(--d6-accent)"
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              Consult with Us
            </a>

            {/* Secondary CTA — understated text link with arrow; jumps to practice areas.
                Lower visual weight keeps a clear primary/secondary hierarchy. */}
            <a
              href="#practice-areas"
              className="group inline-flex items-center justify-center sm:justify-start gap-2 px-2 py-3 text-sm tracking-widest uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--d6-accent)]"
              style={{
                fontFamily: "var(--font-lora)",
                color: "var(--d6-hero-text)",
                minHeight: "44px",
                transition: "color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--d6-accent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--d6-hero-text)"
              }}
            >
              <span
                className="border-b"
                style={{ borderColor: "currentColor", paddingBottom: "2px" }}
              >
                Our Practice
              </span>
              {/* Arrow nudges right on hover/focus for affordance; decorative. */}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue — accent fade line */}
      <div
        className="absolute bottom-8 flex flex-col items-center"
        aria-hidden="true"
        style={{
          opacity: loaded ? 1 : 0,
          transition: reduceMotion ? "none" : "opacity 1000ms ease-out 800ms",
        }}
      >
        <span
          className="w-px h-10 block"
          style={{ background: "linear-gradient(to bottom, transparent, var(--d6-accent))" }}
        />
      </div>
    </header>
  )
}

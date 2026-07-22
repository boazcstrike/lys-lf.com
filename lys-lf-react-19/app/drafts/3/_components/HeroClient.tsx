"use client"

import { useEffect, useState } from "react"
import siteConfig, { headerConfig } from "@/app/assets/data/site-config"
import CountUp from "./CountUp"

/**
 * HeroClient — client component for animated hero.
 * - Ken-burns: background image scales 1→1.06 over 14s (reduced-motion: none).
 * - Content fade-in on load: opacity 0→1 + translateY 20px→0.
 * - CTA buttons with hover brightness + press scale(0.97).
 * - Scroll indicator fades in after 1.2s.
 * Colors use --d6-* CSS custom properties set by ThemeProvider.
 */
// Hero background is the Largest Contentful Paint element. Its source and
// intrinsic dimensions are declared once so the preload hint and the <img>
// stay in sync (DRY) and the browser can reserve the correct aspect ratio.
const HERO_IMAGE_SRC = "/images/optimized/LYS-29.webp"
const HERO_IMAGE_WIDTH = 1920
const HERO_IMAGE_HEIGHT = 1080

export default function HeroClient() {
  const { firmName, firmShortName, establishedYear } = siteConfig
  const [loaded, setLoaded] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [primaryPress, setPrimaryPress] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)
  const [secondaryPress, setSecondaryPress] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    // Single rAF to trigger fade-in after first paint
    const raf = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="home"
      aria-label="Firm introduction"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* High-priority hint for the LCP background image. React 19 hoists this
          <link> into <head> and dedupes it against the <img> below; it mainly
          reinforces fetch priority (the <img> is already in the server HTML). */}
      <link
        rel="preload"
        as="image"
        href={HERO_IMAGE_SRC}
        fetchPriority="high"
      />

      {/* Background photo wrapper — clips the scale transform to prevent overflow */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
      >
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          aria-hidden="true"
          // High priority + intrinsic dimensions: the browser fetches this LCP
          // image eagerly; width/height give it the 16:9 aspect ratio for decode.
          fetchPriority="high"
          decoding="async"
          width={HERO_IMAGE_WIDTH}
          height={HERO_IMAGE_HEIGHT}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            animation: reduced ? "none" : "d3KenBurns 14000ms cubic-bezier(0.25,0.1,0.25,1) both",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Cinematic gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, var(--d6-scrim-top) 0%, var(--d6-scrim-mid) 40%, var(--d6-scrim-bot) 100%)",
          zIndex: 1,
        }}
      />

      {/* Gold vertical hairline — left accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(1.5rem, 4vw, 4rem)",
          top: "10%",
          bottom: "10%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, var(--d6-accent) 30%, var(--d6-accent) 70%, transparent)",
          zIndex: 2,
        }}
      />

      {/* Content — fades in on load */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding:
            "clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)",
          opacity: reduced ? 1 : loaded ? 1 : 0,
          transform: reduced ? "none" : loaded ? "translateY(0)" : "translateY(20px)",
          transition: reduced
            ? "none"
            : "opacity 600ms ease-out 120ms, transform 600ms ease-out 120ms",
          willChange: "opacity, transform",
        }}
      >
        {/* Small-caps gold label with count-up year */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--d6-accent)",
            marginBottom: "1.5rem",
          }}
        >
          Est.&nbsp;
          <CountUp target={establishedYear} duration={1400} delay={900} reduced={reduced} />
          &nbsp;·&nbsp;{firmShortName}
        </p>

        {/* Gold top rule */}
        <div
          aria-hidden="true"
          style={{
            width: "3rem",
            height: "1px",
            backgroundColor: "var(--d6-accent)",
            marginBottom: "1.75rem",
          }}
        />

        {/* H1 */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.6rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "var(--d6-hero-text)",
            margin: 0,
            marginBottom: "1.5rem",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          {firmName}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--d6-hero-muted)",
            maxWidth: "55ch",
            marginBottom: "2.5rem",
            textWrap: "pretty",
          }}
        >
          {headerConfig.tagline}
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* Primary — gold fill */}
          <a
            href="#contact"
            className="d3-cta"
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => {
              setPrimaryHover(false)
              setPrimaryPress(false)
            }}
            onMouseDown={() => setPrimaryPress(true)}
            onMouseUp={() => setPrimaryPress(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0.75rem 2rem",
              backgroundColor: "var(--d6-accent)",
              color: "var(--d6-accent-contrast)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid var(--d6-accent)",
              filter: primaryHover ? "brightness(1.14)" : "brightness(1)",
              transform: primaryPress ? "scale(0.97)" : "scale(1)",
              transition:
                "filter 200ms ease-out, transform 150ms ease-out",
            }}
          >
            Consult Us
          </a>

          {/* Secondary — ghost */}
          <a
            href="#practice-areas"
            className="d3-cta"
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => {
              setSecondaryHover(false)
              setSecondaryPress(false)
            }}
            onMouseDown={() => setSecondaryPress(true)}
            onMouseUp={() => setSecondaryPress(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0.75rem 2rem",
              backgroundColor: secondaryHover
                ? "var(--d6-faint)"
                : "transparent",
              color: "var(--d6-hero-text)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: `1px solid ${secondaryHover ? "var(--d6-accent-line)" : "var(--d6-hair)"}`,
              transform: secondaryPress ? "scale(0.97)" : "scale(1)",
              transition:
                "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
            }}
          >
            Our Practice
          </a>
        </div>
      </div>

      {/* Scroll indicator — delayed fade-in */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "clamp(1.5rem, 4vw, 4rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: reduced ? 1 : loaded ? 1 : 0,
          transition: reduced ? "none" : "opacity 700ms ease-out 1400ms",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, transparent, var(--d6-accent))",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--d6-accent)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      {/* Ken-burns keyframe + keyboard focus ring — scoped to the client
          component, safe for static export. The CTAs use a class (not inline
          outline) so :focus-visible can paint a visible gold ring for keyboard
          users while mouse clicks stay ring-free. */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes d3KenBurns {
            from { transform: scale(1.0); }
            to   { transform: scale(1.06); }
          }
        }
        .d3-cta { outline: none; }
        .d3-cta:focus-visible {
          outline: 2px solid var(--d6-accent);
          outline-offset: 3px;
        }
      `}</style>
    </section>
  )
}

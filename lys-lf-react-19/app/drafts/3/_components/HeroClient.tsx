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
 */
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
      id="hero"
      aria-label="Firm introduction"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Background photo wrapper — clips the scale transform to prevent overflow */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
      >
        <img
          src="/images/optimized/LYS-29.webp"
          alt=""
          aria-hidden="true"
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
            "linear-gradient(to bottom, rgba(11,11,12,0.60) 0%, rgba(11,11,12,0.78) 40%, rgba(11,11,12,0.97) 100%)",
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
            "linear-gradient(to bottom, transparent, #B08D57 30%, #B08D57 70%, transparent)",
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
            color: "#B08D57",
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
            backgroundColor: "#B08D57",
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
            color: "#EDEDED",
            margin: 0,
            marginBottom: "1.5rem",
            maxWidth: "18ch",
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
            color: "#9A9A9A",
            maxWidth: "55ch",
            marginBottom: "2.5rem",
          }}
        >
          {headerConfig.tagline}
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* Primary — gold fill */}
          <a
            href="#contact"
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
              backgroundColor: primaryHover ? "#C9A46A" : "#B08D57",
              color: "#0B0B0C",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #B08D57",
              transform: primaryPress ? "scale(0.97)" : "scale(1)",
              transition:
                "background-color 200ms ease-out, transform 150ms ease-out",
              outline: "2px solid transparent",
              outlineOffset: "2px",
            }}
          >
            Consult Us
          </a>

          {/* Secondary — ghost */}
          <a
            href="#practice-areas"
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
                ? "rgba(176,141,87,0.08)"
                : "transparent",
              color: "#EDEDED",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: `1px solid ${secondaryHover ? "rgba(176,141,87,0.55)" : "rgba(237,237,237,0.3)"}`,
              transform: secondaryPress ? "scale(0.97)" : "scale(1)",
              transition:
                "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
              outline: "2px solid transparent",
              outlineOffset: "2px",
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
            background: "linear-gradient(to bottom, transparent, #B08D57)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#B08D57",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      {/* Ken-burns keyframe — inside client component, safe for static export */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes d3KenBurns {
            from { transform: scale(1.0); }
            to   { transform: scale(1.06); }
          }
        }
      `}</style>
    </section>
  )
}

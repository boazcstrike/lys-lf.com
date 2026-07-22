"use client"

import { useEffect, useRef, useState } from "react"
import siteConfig, { headerConfig } from "@/app/assets/data/site-config"
import { FONT, MOTION } from "../_components/theme"
import CountUp from "../_components/CountUp"
import MagneticButton from "../_components/MagneticButton"

/**
 * Hero — "Kinetic Editorial" (Draft 6)
 *
 * Layered cinematic intro:
 *  - parallax + ken-burns background photo (scroll- and pointer-driven)
 *  - prussian→black gradient scrim for AA text contrast
 *  - word-by-word staggered headline reveal on mount
 *  - animated "Est. <year>" count-up
 *  - magnetic CTA buttons + animated scroll cue
 *
 * All motion gated by prefers-reduced-motion. Single <h1> for the page.
 */

const WORDS = ["Lim", "&", "Yutatco-Sze"]

/**
 * Motion tuning — deliberately restrained.
 *
 * The three background layers (pointer-tilt, scroll parallax, ken-burns)
 * previously ran at full strength at once, which read as busy and taxed
 * low-end devices. These calmer values let the layers drift together as
 * one quiet cinematic motion rather than competing. Pointer-tilt is
 * additionally limited to fine pointers (desktop mice) — touch devices,
 * which are the most perf-sensitive, get parallax + ken-burns only.
 */
const TILT_RANGE_PX = 6 // per-axis tilt amplitude (was 16)
const TILT_BG_FACTOR = 0.4 // background follows tilt at this fraction
const PARALLAX_FACTOR = 0.18 // scroll → vertical drift (was 0.35)
const KEN_BURNS = "d6Ken 22s cubic-bezier(0.25,0.1,0.25,1) both" // was 18s

export default function Hero() {
  const { firmShortName, establishedYear } = siteConfig
  const [loaded, setLoaded] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [finePointer, setFinePointer] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRaf = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    // Only enable the pointer-tilt layer for precise pointers (mouse /
    // trackpad); coarse/touch pointers skip it for calmer, cheaper motion.
    setFinePointer(window.matchMedia("(pointer: fine)").matches)
    const raf = requestAnimationFrame(() => setLoaded(true))
    if (mq.matches) return () => cancelAnimationFrame(raf)

    let sraf = 0
    const onScroll = () => {
      if (sraf) return
      sraf = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        sraf = 0
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      if (sraf) cancelAnimationFrame(sraf)
      // Also cancel any queued pointer-tilt frame so it can't setTilt after
      // unmount (resetTilt only fires on mouse-leave, not on teardown).
      if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current)
    }
  }, [])

  const tiltEnabled = !reduced && finePointer

  function onPointer(e: React.MouseEvent) {
    if (!tiltEnabled) return
    // Capture coordinates now; compute against a fresh rect inside the
    // next frame. rAF-throttling collapses a burst of mousemove events
    // into one state update per frame — key for low-end perf.
    const { clientX, clientY } = e
    if (tiltRaf.current) return
    tiltRaf.current = requestAnimationFrame(() => {
      tiltRaf.current = 0
      const r = sectionRef.current?.getBoundingClientRect()
      if (!r) return
      setTilt({
        x: ((clientX - r.left) / r.width - 0.5) * TILT_RANGE_PX,
        y: ((clientY - r.top) / r.height - 0.5) * TILT_RANGE_PX,
      })
    })
  }

  function resetTilt() {
    if (tiltRaf.current) {
      cancelAnimationFrame(tiltRaf.current)
      tiltRaf.current = 0
    }
    setTilt({ x: 0, y: 0 })
  }

  const parallax = reduced ? 0 : scrollY * PARALLAX_FACTOR
  const kb = reduced ? "none" : KEN_BURNS

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Firm introduction"
      onMouseMove={onPointer}
      onMouseLeave={resetTilt}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        backgroundColor: "var(--d6-bg)",
      }}
    >
      {/* Parallax + ken-burns photo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-8% 0 0 0",
          overflow: "hidden",
          zIndex: 0,
          transform: `translate3d(${tilt.x * TILT_BG_FACTOR}px, ${parallax + tilt.y * TILT_BG_FACTOR}px, 0)`,
          transition: reduced ? "none" : `transform 300ms ${MOTION.easeOut}`,
          willChange: "transform",
        }}
      >
        <img
          src="/images/optimized/LYS-29.webp"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "108%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            animation: kb,
          }}
        />
      </div>

      {/* Prussian → black cinematic scrim */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, var(--d6-scrim-top) 0%, var(--d6-scrim-mid) 45%, var(--d6-scrim-bot) 100%)",
        }}
      />

      {/* Orange vertical hairline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(1.5rem,4vw,4rem)",
          top: "12%",
          bottom: "12%",
          width: "1px",
          zIndex: 2,
          background: "linear-gradient(to bottom, transparent, var(--d6-accent) 30%, var(--d6-accent) 70%, transparent)",
          opacity: loaded ? 1 : 0,
          transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 400ms`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(4rem,8vw,8rem) clamp(2rem,6vw,6rem) clamp(4rem,8vw,7rem)",
        }}
      >
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--d6-accent)",
            marginBottom: "1.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(12px)",
            transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 200ms, transform ${MOTION.slow} ${MOTION.easeOut} 200ms`,
          }}
        >
          Est.&nbsp;<CountUp target={establishedYear} duration={1500} delay={500} />
          &nbsp;·&nbsp;{firmShortName}
        </p>

        {/* Headline — staggered word reveal */}
        <h1
          style={{
            fontFamily: FONT.display,
            fontSize: "clamp(2.8rem,8vw,6.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            // Slight negative tracking tightens the large display serif so
            // the wordmark reads as one confident unit, not spaced letters.
            letterSpacing: "-0.015em",
            color: "var(--d6-hero-text)",
            margin: "0 0 1.5rem",
            maxWidth: "16ch",
          }}
        >
          {WORDS.map((w, i) => (
            <span
              key={w}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                color: i === WORDS.length - 1 ? "var(--d6-accent)" : "var(--d6-hero-text)",
                opacity: reduced ? 1 : loaded ? 1 : 0,
                transform: reduced ? "none" : loaded ? "none" : "translateY(40px)",
                transition: `opacity ${MOTION.slow} ${MOTION.easeOut} ${300 + i * 130}ms, transform ${MOTION.slow} ${MOTION.spring} ${300 + i * 130}ms`,
              }}
            >
              {w}
            </span>
          ))}
          <span
            style={{
              display: "block",
              fontFamily: FONT.body,
              fontSize: "0.28em",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--d6-hero-text)",
              marginTop: "0.6rem",
              opacity: loaded ? 0.8 : 0,
              transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 800ms`,
            }}
          >
            Law Firm
          </span>
        </h1>

        <p
          style={{
            fontFamily: FONT.body,
            fontSize: "clamp(0.94rem,1.5vw,1.1rem)",
            // 400 over 300: hairline weight on the dark scrim read thin and
            // dipped legibility at small sizes; 400 holds prestige elegance
            // while restoring comfortable contrast. Generous 1.75 leading kept.
            fontWeight: 400,
            lineHeight: 1.75,
            color: "var(--d6-hero-muted)",
            maxWidth: "52ch",
            marginBottom: "2.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 900ms, transform ${MOTION.slow} ${MOTION.easeOut} 900ms`,
          }}
        >
          {headerConfig.tagline}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 1050ms, transform ${MOTION.slow} ${MOTION.easeOut} 1050ms`,
          }}
        >
          <MagneticButton href="#contact" variant="solid">
            Consult Us
          </MagneticButton>
          <MagneticButton href="#practice-areas" variant="ghost">
            Our Practice
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.4rem",
          right: "clamp(1.5rem,4vw,4rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          opacity: loaded ? 1 : 0,
          transition: `opacity ${MOTION.slow} ${MOTION.easeOut} 1400ms`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--d6-accent)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <span
          style={{
            position: "relative",
            width: "1px",
            height: "3rem",
            overflow: "hidden",
            background: "var(--d6-hair)",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--d6-accent)",
              animation: reduced ? "none" : "d6ScrollCue 1.8s ease-in-out infinite",
            }}
          />
        </span>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes d6Ken { from { transform: scale(1.0); } to { transform: scale(1.04); } }
          @keyframes d6ScrollCue {
            0% { transform: translateY(-100%); }
            60%,100% { transform: translateY(100%); }
          }
        }
      `}</style>
    </section>
  )
}

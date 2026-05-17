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

export default function Hero() {
  const { firmShortName, establishedYear } = siteConfig
  const [loaded, setLoaded] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
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
    }
  }, [])

  function onPointer(e: React.MouseEvent) {
    if (reduced) return
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: ((e.clientY - r.top) / r.height - 0.5) * 16,
    })
  }

  const parallax = reduced ? 0 : scrollY * 0.35
  const kb = reduced ? "none" : "d6Ken 18s cubic-bezier(0.25,0.1,0.25,1) both"

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Firm introduction"
      onMouseMove={onPointer}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
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
          transform: `translate3d(${tilt.x * 0.4}px, ${parallax + tilt.y * 0.4}px, 0)`,
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
            fontSize: "clamp(0.92rem,1.5vw,1.08rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--d6-hero-muted)",
            maxWidth: "55ch",
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
          @keyframes d6Ken { from { transform: scale(1.0); } to { transform: scale(1.09); } }
          @keyframes d6ScrollCue {
            0% { transform: translateY(-100%); }
            60%,100% { transform: translateY(100%); }
          }
        }
      `}</style>
    </section>
  )
}

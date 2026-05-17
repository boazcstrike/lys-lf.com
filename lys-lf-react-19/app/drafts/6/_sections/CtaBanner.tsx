"use client"

import siteConfig from "@/app/assets/data/site-config"
import MagneticButton from "../_components/MagneticButton"
import Reveal from "../_components/Reveal"
import { FONT } from "../_components/theme"

/**
 * CtaBanner — kinetic marquee band (Draft 6).
 *
 * An infinite accent "LET'S TALK" marquee scrolls behind a centered
 * headline; magnetic CTA buttons sit on top. Marquee pauses for
 * prefers-reduced-motion. Panel bg keeps AA contrast on hero-text type.
 * Colors via CSS custom properties (--d6-*).
 */
const MARQUEE = "LET'S TALK · LEGAL COUNSEL · "

export default function CtaBanner() {
  return (
    <section
      aria-label="Call to action"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--d6-panel)",
        padding: "clamp(4.5rem,10vw,8rem) 1.25rem",
      }}
    >
      {/* Marquee backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <div
          className="d6-marquee"
          style={{
            display: "flex",
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: "clamp(4rem,12vw,10rem)",
            color: "var(--d6-accent)",
            animation: "d6Marquee 28s linear infinite",
          }}
        >
          <span>{MARQUEE.repeat(6)}</span>
          <span>{MARQUEE.repeat(6)}</span>
        </div>
      </div>

      {/* Foreground */}
      <Reveal variant="scale">
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "820px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: "clamp(2.2rem,6vw,4.2rem)",
              lineHeight: 1.05,
              color: "var(--d6-hero-text)",
              margin: "0 0 1.75rem",
            }}
          >
            Have Legal Problems?
            <br />
            <span style={{ color: "var(--d6-accent)" }}>Let&apos;s Talk.</span>
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <MagneticButton href={`tel:${siteConfig.contact.phone}`} variant="solid">
              Call Us
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Find Us
            </MagneticButton>
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes d6Marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .d6-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

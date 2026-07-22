"use client"

import siteConfig from "@/app/assets/data/site-config"
import MagneticButton from "../_components/MagneticButton"
import Reveal from "../_components/Reveal"
import { FONT } from "../_components/theme"

/**
 * CtaBanner — refined closing call-to-action (Draft 6).
 *
 * A single static, oversized firm wordmark sits as a faint editorial
 * watermark behind a centered headline; a small accent kicker anchors
 * the eye and magnetic CTA buttons sit on top. The kinetic feel now
 * comes from the entrance Reveal alone — the previous looping
 * "LET'S TALK" marquee was dropped as it read decorative rather than
 * prestige. No infinite motion, so nothing to pause for reduced-motion.
 * Panel bg keeps AA contrast on hero-text type. Colors via --d6-* vars.
 */

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
      {/* Static editorial watermark — single, still, low-contrast wordmark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          opacity: 0.06,
          pointerEvents: "none",
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: "clamp(5rem,18vw,14rem)",
          letterSpacing: "-0.02em",
          color: "var(--d6-accent)",
        }}
      >
        {siteConfig.firmShortName}
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
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--d6-accent)",
              margin: "0 0 1.25rem",
            }}
          >
            Legal Counsel
          </p>
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: "clamp(2.2rem,6vw,4.2rem)",
              lineHeight: 1.05,
              // Match the hero headline's optical tracking for a consistent
              // display-serif voice across the page.
              letterSpacing: "-0.015em",
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
    </section>
  )
}

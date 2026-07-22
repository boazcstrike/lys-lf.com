"use client"

import { useState } from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

/**
 * CTA Banner — full-bleed dark section, centered headline with gold accent.
 * "Have Legal Problems? Let's Talk." + phone and email links.
 * Buttons have hover brightness + press scale(0.97).
 * Colors use --d6-* CSS custom properties set by ThemeProvider.
 */
export default function CtaBanner() {
  const { contact } = siteConfig
  const [primaryHover, setPrimaryHover] = useState(false)
  const [primaryPress, setPrimaryPress] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)
  const [secondaryPress, setSecondaryPress] = useState(false)

  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        backgroundColor: "var(--d6-slab)",
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background photo — very dark tinted for texture */}
      <img
        src="/images/optimized/LYS-12.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      {/* Inset gold border frame */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "1.5rem",
          border: "1px solid var(--d6-accent-line)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Reveal>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--d6-accent)",
              marginBottom: "1.25rem",
            }}
          >
            Get In Touch
          </p>

          <h2
            id="cta-heading"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--d6-slab-text)",
              margin: 0,
              marginBottom: "1.5rem",
              textWrap: "balance",
            }}
          >
            Have Legal Problems?
            <br />
            <span style={{ color: "var(--d6-accent)" }}>Let&apos;s Talk.</span>
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "var(--d6-accent)",
              margin: "0 auto 2rem",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              fontWeight: 300,
              color: "var(--d6-muted)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              maxWidth: "55ch",
              margin: "0 auto 2.5rem",
              textWrap: "pretty",
            }}
          >
            Our team of experienced attorneys is ready to assist you.
            Reach out for a consultation today.
          </p>

          {/* Contact action links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Primary — phone, gold fill */}
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
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
              {contact.phoneDisplay}
            </a>

            {/* Secondary — email, ghost */}
            <a
              href={`mailto:${contact.email}`}
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
                color: "var(--d6-slab-text)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textDecoration: "none",
                border: `1px solid ${secondaryHover ? "var(--d6-accent-line)" : "var(--d6-hair)"}`,
                transform: secondaryPress ? "scale(0.97)" : "scale(1)",
                transition:
                  "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
              }}
            >
              {contact.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

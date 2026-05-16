"use client"

import { useState } from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

/**
 * CTA Banner — full-bleed dark section, centered headline with gold accent.
 * "Have Legal Problems? Let's Talk." + phone and email links.
 * Buttons have hover brightness + press scale(0.97).
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
        backgroundColor: "#0B0B0C",
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
          border: "1px solid rgba(176,141,87,0.3)",
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
              color: "#B08D57",
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
              color: "#EDEDED",
              margin: 0,
              marginBottom: "1.5rem",
            }}
          >
            Have Legal Problems?
            <br />
            <span style={{ color: "#B08D57" }}>Let&apos;s Talk.</span>
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "#B08D57",
              margin: "0 auto 2rem",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              fontWeight: 300,
              color: "#9A9A9A",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              maxWidth: "55ch",
              margin: "0 auto 2.5rem",
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
              }}
            >
              {contact.phoneDisplay}
            </a>

            {/* Secondary — email, ghost */}
            <a
              href={`mailto:${contact.email}`}
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
                color: secondaryHover ? "#EDEDED" : "#EDEDED",
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textDecoration: "none",
                border: `1px solid ${secondaryHover ? "rgba(176,141,87,0.5)" : "rgba(237,237,237,0.25)"}`,
                transform: secondaryPress ? "scale(0.97)" : "scale(1)",
                transition:
                  "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
                outline: "2px solid transparent",
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

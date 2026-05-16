"use client"

import { useState } from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

/**
 * Footer — dark near-black bg, white logo, gold hairline top rule,
 * firm name, copyright, and "Website by Boaz Sze" credit.
 * Credit link has gold grow-underline on hover.
 */
export default function Footer() {
  const { firmName, establishedYear } = siteConfig
  const currentYear = new Date().getFullYear()
  const [creditHover, setCreditHover] = useState(false)

  return (
    <footer
      aria-label="Site footer"
      style={{
        backgroundColor: "#0B0B0C",
        borderTop: "1px solid rgba(176,141,87,0.3)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <Reveal>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
          }}
        >
          {/* White logo — suitable for dark backgrounds */}
          <img
            src="/images/optimized/lys-white-logo-darker.webp"
            alt={`${firmName} logo`}
            style={{
              height: "70px",
              width: "auto",
              display: "block",
            }}
          />

          {/* Gold divider */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "#B08D57",
            }}
          />

          {/* Firm name */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              fontWeight: 400,
              color: "#EDEDED",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            {firmName}
          </p>

          {/* Copyright */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 300,
              color: "#9A9A9A",
              margin: 0,
            }}
          >
            &copy; {establishedYear}
            {currentYear > establishedYear ? `–${currentYear}` : ""}{" "}
            {firmName}. All rights reserved.
          </p>

          {/* Developer credit */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              fontWeight: 300,
              color: "#9A9A9A",
              margin: 0,
            }}
          >
            Website by{" "}
            <a
              href="https://www.facebook.com/boazcstrike/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCreditHover(true)}
              onMouseLeave={() => setCreditHover(false)}
              style={{
                color: "#B08D57",
                textDecoration: "none",
                borderBottom: `1px solid ${creditHover ? "#B08D57" : "transparent"}`,
                transition: "border-color 200ms ease-out",
                paddingBottom: "1px",
              }}
            >
              Boaz Sze
            </a>
          </p>
        </div>
      </Reveal>
    </footer>
  )
}

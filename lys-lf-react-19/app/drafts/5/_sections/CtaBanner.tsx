/**
 * CtaBanner — Swiss Architectural (Draft 5)
 *
 * Full-bleed red (#D72638) field. White Space Grotesk headline at large
 * display size. Section index "05" in a contrast-safe near-white tint.
 * Two flat button CTAs: solid white (call) and outline white (find us).
 * No JS handlers — pure CSS hover.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const CtaBanner: React.FC = () => {
  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "#D72638",
        borderBottom: "1px solid #0A0A0A",
      }}
    >
      {/* Index row */}
      <div
        className="flex items-center gap-4 px-6 py-5 lg:px-14 xl:px-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          05
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.55)" }}
          aria-hidden="true"
        >
          Get In Touch
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-20 xl:px-20">
        {/* Headline */}
        <h2
          className="max-w-xl leading-[1.0]"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(2rem, 5vw + 0.5rem, 4rem)",
          }}
        >
          Have Legal Problems?
          <br />
          Let&apos;s Talk.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex min-h-[52px] items-center justify-center px-10 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#0A0A0A",
              fontFamily: "var(--font-inter)",
            }}
          >
            Call Us
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[52px] items-center justify-center px-10 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              border: "1px solid rgba(255,255,255,0.8)",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter)",
              backgroundColor: "transparent",
            }}
          >
            Find Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner

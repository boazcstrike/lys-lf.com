/**
 * CtaBanner — Swiss Architectural (Draft 5)
 *
 * Full-bleed accent field. White Space Grotesk headline at large display size.
 * Section index "05" in a contrast-safe near-white tint.
 * Two flat button CTAs: solid bg (call) and outline (find us).
 * No JS handlers — pure CSS hover.
 *
 * Token mapping (d5-default):
 *   accent         = #D72638 (full section background — CTA field)
 *   accentContrast = #FFFFFF (headline text on accent bg; "Find Us" border+text)
 *   bg             = #FFFFFF ("Call Us" button background — always opposite-polarity to heading)
 *   heading        = #0A0A0A ("Call Us" button text on bg; bg vs heading always AA per scheme)
 *   hair           = #0A0A0A (section borderBottom)
 *
 * All 8 schemes: var(--d6-accent-contrast) is the guaranteed readable color ON
 * accent bg (AA). var(--d6-bg) + var(--d6-heading) are always opposite-polarity
 * per scheme definition, so "Call Us" button is AA on all schemes.
 * d5-default: accentContrast=#FFFFFF, bg=#FFFFFF, heading=#0A0A0A => identical look.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const CtaBanner: React.FC = () => {
  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "var(--d6-accent)",
        borderBottom: "1px solid var(--d6-hair)",
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
            color: "var(--d6-accent-contrast)",
            fontSize: "clamp(2rem, 5vw + 0.5rem, 4rem)",
          }}
        >
          Have Legal Problems?
          <br />
          Let&apos;s Talk.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {/* "Call Us" — solid bg button on accent bg (bg+heading always opposite-polarity => AA all schemes) */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex min-h-[52px] items-center justify-center px-10 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent-contrast)]"
            style={{
              backgroundColor: "var(--d6-bg)",
              color: "var(--d6-heading)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Call Us
          </a>
          {/* "Find Us" — accent-contrast outline button on accent bg (guaranteed AA per token definition) */}
          <a
            href="#contact"
            className="inline-flex min-h-[52px] items-center justify-center px-10 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent-contrast)]"
            style={{
              border: "1px solid var(--d6-accent-contrast)",
              color: "var(--d6-accent-contrast)",
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

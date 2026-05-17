"use client"

/**
 * CtaBannerSection — Heritage Traditional
 * Full-width dark panel banner with Reveal, button hover + press states.
 * Client component for inline event handlers.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: bright gold highlight (#E8C97A) mapped to --d6-accent (closest).
 */

import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

export default function CtaBannerSection() {
  return (
    <section
      aria-label="Call to action"
      style={{ backgroundColor: "var(--d6-panel)" }}
    >
      {/* Top accent line */}
      <div className="h-1 w-full" style={{ backgroundColor: "var(--d6-accent)" }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 py-14 sm:py-16 text-center">
        <Reveal>
          {/* Ornamental diamond row */}
          <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
            <span
              className="w-12 border-t"
              style={{ borderColor: "var(--d6-accent-line)" }}
            />
            <span
              className="w-2 h-2 rotate-45 inline-block"
              style={{ backgroundColor: "var(--d6-accent)" }}
            />
            <span
              className="w-12 border-t"
              style={{ borderColor: "var(--d6-accent-line)" }}
            />
          </div>

          {/* Headline */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-libre)", color: "var(--d6-hero-text)", fontWeight: 700 }}
          >
            Have Legal Problems?{" "}
            <span style={{ color: "var(--d6-accent)" }}>Let&rsquo;s Talk.</span>
          </h2>

          {/* Sub-copy */}
          <p
            className="text-sm sm:text-base leading-[1.7] mb-8 max-w-[55ch] mx-auto"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-hero-muted)" }}
          >
            Our experienced legal team is ready to assist you. Reach out today
            for a confidential consultation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary: accent fill */}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--d6-accent)]"
              style={{
                fontFamily: "var(--font-lora)",
                borderColor: "var(--d6-accent)",
                backgroundColor: "var(--d6-accent)",
                color: "var(--d6-accent-contrast)",
                minHeight: "44px",
                transition: "opacity 200ms ease-out, transform 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1"
                e.currentTarget.style.transform = ""
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = ""
              }}
            >
              Call Us
            </a>

            {/* Secondary: outline */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--d6-accent)]"
              style={{
                fontFamily: "var(--font-lora)",
                borderColor: "var(--d6-hero-text)",
                color: "var(--d6-hero-text)",
                minHeight: "44px",
                transition: "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--d6-accent-soft)"
                e.currentTarget.style.borderColor = "var(--d6-accent)"
                e.currentTarget.style.color = "var(--d6-accent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ""
                e.currentTarget.style.borderColor = "var(--d6-hero-text)"
                e.currentTarget.style.color = "var(--d6-hero-text)"
                e.currentTarget.style.transform = ""
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = ""
              }}
            >
              Email Us
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 w-full" style={{ backgroundColor: "var(--d6-accent)" }} aria-hidden="true" />
    </section>
  )
}

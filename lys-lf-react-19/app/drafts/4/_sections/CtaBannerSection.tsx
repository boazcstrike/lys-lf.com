"use client"

/**
 * CtaBannerSection — Heritage Traditional
 * Full-width oxblood banner with Reveal, button hover + press states.
 * Client component for inline event handlers.
 */

import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

export default function CtaBannerSection() {
  return (
    <section
      aria-label="Call to action"
      style={{ backgroundColor: "#6B1F2A" }}
    >
      {/* Top gold accent line */}
      <div className="h-1 w-full" style={{ backgroundColor: "#9C7A3C" }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 py-14 sm:py-16 text-center">
        <Reveal>
          {/* Ornamental diamond row */}
          <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
            <span
              className="w-12 border-t"
              style={{ borderColor: "rgba(156,122,60,0.5)" }}
            />
            <span
              className="w-2 h-2 rotate-45 inline-block"
              style={{ backgroundColor: "#9C7A3C" }}
            />
            <span
              className="w-12 border-t"
              style={{ borderColor: "rgba(156,122,60,0.5)" }}
            />
          </div>

          {/* Headline */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-libre)", color: "#F4EFE6", fontWeight: 700 }}
          >
            Have Legal Problems?{" "}
            <span style={{ color: "#E8C97A" }}>Let&rsquo;s Talk.</span>
          </h2>

          {/* Sub-copy */}
          <p
            className="text-sm sm:text-base leading-[1.7] mb-8 max-w-[55ch] mx-auto"
            style={{ fontFamily: "var(--font-lora)", color: "#D9CFC2" }}
          >
            Our experienced legal team is ready to assist you. Reach out today
            for a confidential consultation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary: gold fill */}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300"
              style={{
                fontFamily: "var(--font-lora)",
                borderColor: "#9C7A3C",
                backgroundColor: "#9C7A3C",
                color: "#F4EFE6",
                minHeight: "44px",
                transition: "background-color 200ms ease-out, transform 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B08A44"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#9C7A3C"
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
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300"
              style={{
                fontFamily: "var(--font-lora)",
                borderColor: "#F4EFE6",
                color: "#F4EFE6",
                minHeight: "44px",
                transition: "background-color 200ms ease-out, border-color 200ms ease-out, transform 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(244,239,230,0.10)"
                e.currentTarget.style.borderColor = "#E8C97A"
                e.currentTarget.style.color = "#E8C97A"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ""
                e.currentTarget.style.borderColor = "#F4EFE6"
                e.currentTarget.style.color = "#F4EFE6"
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

      {/* Bottom gold accent line */}
      <div className="h-1 w-full" style={{ backgroundColor: "#9C7A3C" }} aria-hidden="true" />
    </section>
  )
}

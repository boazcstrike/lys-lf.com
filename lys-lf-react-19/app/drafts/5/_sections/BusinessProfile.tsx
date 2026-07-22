/**
 * BusinessProfile — Swiss Architectural (Draft 5)
 *
 * Asymmetric two-column: left 40% holds section index + photo as a strict
 * rectangular block; right 60% carries the prose on a light grey panel
 * (#F2F2F2). Thin 1px black vertical divider between columns.
 * react-markdown renders **bold** → <strong> in full heading color.
 *
 * Token mapping (d5-default):
 *   panel   = #F2F2F2 (section bg — LIGHT in d5-default; intentionally changes on luxury schemes)
 *   bg      = #FFFFFF (left index header row bg)
 *   hair    = #0A0A0A (1px structural borders — opaque in d5-default)
 *   accent  = #D72638 (index "03" numeral, 3px accent rule)
 *   faint   = rgba(10,10,10,0.40) ("Who We Are" eyebrow label)
 *   heading = #0A0A0A (section h2)
 *   muted   = rgba(10,10,10,0.68) (body prose text)
 *   text    = #0A0A0A (strong/bold text — full opacity)
 */

import React from "react"
import ReactMarkdown from "react-markdown"
import businessProfile from "@/app/assets/data/business-profile"

const BusinessProfile: React.FC = () => {
  return (
    <section
      id="about"
      className="overflow-hidden"
      style={{ backgroundColor: "var(--d6-panel)", borderBottom: "1px solid var(--d6-hair)" }}
    >
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — index number + photo */}
        <div
          className="relative flex flex-col lg:w-[40%]"
          style={{ borderRight: "1px solid var(--d6-hair)" }}
        >
          {/* Index header row — bg = page bg (white in d5-default) */}
          <div
            className="flex items-baseline gap-4 px-6 py-8 lg:px-10"
            style={{ borderBottom: "1px solid var(--d6-hair)", backgroundColor: "var(--d6-bg)" }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--d6-accent)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              03
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--d6-faint)" }}
              aria-hidden="true"
            >
              Who We Are
            </span>
          </div>

          {/* Photo — strict rectangular block, fills remaining column height */}
          <div className="flex-1" style={{ minHeight: "320px" }}>
            <img
              src="/images/optimized/LYS-24.webp"
              alt="Lim and Yutatco-Sze Law Firm attorneys collaborating"
              className="h-full w-full object-cover object-center"
              style={{ display: "block", minHeight: "320px" }}
            />
          </div>
        </div>

        {/* RIGHT — section title + prose (sits on panel bg) */}
        <div className="flex flex-col justify-start px-6 py-10 lg:w-[60%] lg:px-12 lg:py-14 xl:px-16">

          {/* Section heading */}
          <h2
            className="mb-2"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
              color: "var(--d6-heading)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {businessProfile.title}
          </h2>

          {/* Accent 3px rule — decorative; accent2 shows gold under the
              navy/gold tone, and equals accent under every other scheme.
              Width matches the Hero's 40px gold rule so the motif reads as
              one system across sections. */}
          <div
            aria-hidden="true"
            className="mb-8 mt-4"
            style={{ width: "40px", height: "3px", backgroundColor: "var(--d6-accent2)" }}
          />

          {/* Prose paragraphs — **bold** rendered as strong in full heading color */}
          <div className="space-y-5">
            {businessProfile.paragraphs.map((para, i) => (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ children }) => (
                    <p
                      className="text-sm leading-relaxed lg:text-[0.9375rem]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "var(--d6-muted)",
                      }}
                    >
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong
                      style={{
                        fontWeight: 700,
                        color: "var(--d6-text)",
                      }}
                    >
                      {children}
                    </strong>
                  ),
                }}
              >
                {para}
              </ReactMarkdown>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BusinessProfile

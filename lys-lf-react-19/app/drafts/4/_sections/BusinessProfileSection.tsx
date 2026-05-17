/**
 * BusinessProfileSection — Heritage Traditional (server component)
 * Alternating photo + text layout with serif headings.
 * Reveal wraps the two columns; react-markdown for bold copy.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: secondary bg (#FAF6F0) and oxblood (#6B1F2A) have no dedicated token;
 * mapped to --d6-bg and --d6-accent respectively (closest semantics).
 */

import businessProfile from "@/app/assets/data/business-profile"
import ReactMarkdown from "react-markdown"
import Reveal from "../_components/Reveal"

/** Ornamental side-rule heading — accent vertical bar left of h2. */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span
        className="block w-1 self-stretch flex-shrink-0 rounded-sm"
        style={{ backgroundColor: "var(--d6-accent)" }}
        aria-hidden="true"
      />
      <h2
        className="text-2xl sm:text-3xl leading-tight"
        style={{ fontFamily: "var(--font-libre)", color: "var(--d6-heading)", fontWeight: 700 }}
      >
        {text}
      </h2>
    </div>
  )
}

export default function BusinessProfileSection() {
  return (
    <section
      id="about"
      aria-labelledby="bp-heading"
      style={{ backgroundColor: "var(--d6-bg)" }}
    >
      {/* Thin accent rule at top */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--d6-accent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        {/* Two-column layout: text left, photo right on md+ */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Text column */}
          <Reveal className="flex-1 min-w-0">
            {/* Hidden id anchor; h2 rendered by SectionLabel */}
            <span id="bp-heading" className="sr-only">{businessProfile.title}</span>
            <SectionLabel text={businessProfile.title} />

            {/* Ornamental subline */}
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
            >
              A Legacy of Legal Excellence
            </p>

            {/* Paragraphs with bold markdown → strong tags */}
            <div
              className="space-y-4 text-base leading-[1.75]"
              style={{
                fontFamily: "var(--font-lora)",
                color: "var(--d6-text)",
                maxWidth: "68ch",
              }}
            >
              {businessProfile.paragraphs.map((para, i) => (
                <ReactMarkdown
                  key={i}
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                    strong: ({ children }) => (
                      <strong style={{ color: "var(--d6-accent)", fontWeight: 700 }}>
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {para}
                </ReactMarkdown>
              ))}
            </div>
          </Reveal>

          {/* Photo column */}
          <Reveal delay={80} className="w-full md:w-72 lg:w-80 flex-shrink-0">
            {/* Classic portrait frame: thick accent + inner accent-line inset */}
            <div className="border-4 p-1" style={{ borderColor: "var(--d6-accent)" }}>
              <div className="border" style={{ borderColor: "var(--d6-accent-line)" }}>
                <img
                  src="/images/optimized/LYS-12.webp"
                  alt="Lawyers of LYS Law Firm in the office"
                  className="block w-full h-auto"
                />
              </div>
            </div>

            {/* Caption */}
            <p
              className="text-center text-xs tracking-widest uppercase mt-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
            >
              Est. 2015 &mdash; Alabang, Muntinlupa
            </p>
          </Reveal>
        </div>
      </div>

      {/* Thin accent rule at bottom */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--d6-accent)" }}
        aria-hidden="true"
      />
    </section>
  )
}

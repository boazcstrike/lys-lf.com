/**
 * BusinessProfile — Swiss Architectural (Draft 5)
 *
 * Asymmetric two-column: left 40% holds section index + photo as a strict
 * rectangular block; right 60% carries the prose on a light grey panel
 * (#F2F2F2). Thin 1px black vertical divider between columns.
 * react-markdown renders **bold** → <strong> in red for key names.
 */

import React from "react"
import ReactMarkdown from "react-markdown"
import businessProfile from "@/app/assets/data/business-profile"

const BusinessProfile: React.FC = () => {
  return (
    <section
      id="about"
      className="overflow-hidden"
      style={{ backgroundColor: "#F2F2F2", borderBottom: "1px solid #0A0A0A" }}
    >
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — index number + photo */}
        <div
          className="relative flex flex-col lg:w-[40%]"
          style={{ borderRight: "1px solid #0A0A0A" }}
        >
          {/* Index header row */}
          <div
            className="flex items-baseline gap-4 px-6 py-8 lg:px-10"
            style={{ borderBottom: "1px solid #0A0A0A", backgroundColor: "#FFFFFF" }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#D72638",
                lineHeight: 1,
              }}
            >
              03
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.4 }}
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

        {/* RIGHT — section title + prose */}
        <div className="flex flex-col justify-start px-6 py-10 lg:w-[60%] lg:px-12 lg:py-14 xl:px-16">

          {/* Section heading */}
          <h2
            className="mb-2"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
              color: "#0A0A0A",
              lineHeight: 1.1,
            }}
          >
            {businessProfile.title}
          </h2>

          {/* Red 3px rule */}
          <div
            aria-hidden="true"
            className="mb-8 mt-4"
            style={{ width: "36px", height: "3px", backgroundColor: "#D72638" }}
          />

          {/* Prose paragraphs — **bold** rendered as strong in black */}
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
                        color: "#0A0A0A",
                        opacity: 0.72,
                      }}
                    >
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong
                      style={{
                        fontWeight: 700,
                        color: "#0A0A0A",
                        opacity: 1,
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

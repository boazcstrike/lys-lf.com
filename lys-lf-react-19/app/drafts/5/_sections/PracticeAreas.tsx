/**
 * PracticeAreas — Swiss Architectural (Draft 5)
 *
 * Strict indexed list layout: each area is a row divided by 1px black rules.
 * Large two-digit red index on the left, title in bold Space Grotesk, and a
 * tight icon + description on the right. Full-width horizontal rules separate
 * every row — classic International Typographic Style table/list logic.
 * No card boxes, no shadows, no rounded corners.
 */

import React from "react"
import practiceAreas from "@/app/assets/data/practice-areas"
import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"

const ICON_MAP: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

function PracticeRow({
  index,
  icon,
  title,
  description,
}: {
  index: number
  icon: string
  title: string
  description: string
}) {
  const Icon = ICON_MAP[icon] ?? FaGavel
  const num = String(index + 1).padStart(2, "0")

  return (
    <article
      className="group grid grid-cols-[auto_1fr] gap-x-6 py-7 sm:grid-cols-[auto_1fr_1fr] sm:gap-x-10 lg:grid-cols-[80px_1fr_1fr] lg:py-8"
      style={{ borderBottom: "1px solid #0A0A0A" }}
    >
      {/* Index number — red, large, Space Grotesk */}
      <span
        aria-hidden="true"
        className="self-start leading-none"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          color: "#D72638",
          lineHeight: 1,
        }}
      >
        {num}
      </span>

      {/* Title column */}
      <h3
        className="self-start"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 600,
          fontSize: "clamp(1rem, 2vw, 1.35rem)",
          color: "#0A0A0A",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {/* Description + icon — second column on sm+ */}
      <div className="col-span-2 mt-3 flex items-start gap-4 sm:col-span-1 sm:mt-0">
        <div aria-hidden="true" className="mt-0.5 flex-none">
          <Icon size={18} style={{ color: "#D72638" }} />
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#0A0A0A",
            opacity: 0.6,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  )
}

const PracticeAreas: React.FC = () => {
  return (
    <section
      id="practice-areas"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #0A0A0A" }}
    >
      {/* Section header bar — 1px top rule, index + label in the same row */}
      <div
        className="flex items-baseline justify-between px-6 py-8 lg:px-14 xl:px-20"
        style={{ borderBottom: "1px solid #0A0A0A" }}
      >
        {/* Section eyebrow */}
        <div className="flex items-baseline gap-4">
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
            02
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#0A0A0A",
              lineHeight: 1,
            }}
          >
            Practice Areas
          </h2>
        </div>

        {/* Right-side label */}
        <span
          className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] sm:block"
          style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.35 }}
          aria-hidden="true"
        >
          What We Do
        </span>
      </div>

      {/* Indexed list rows */}
      <div className="px-6 lg:px-14 xl:px-20">
        {/* Top rule for first row */}
        <div style={{ borderTop: "1px solid #0A0A0A" }} />
        {practiceAreas.map((area, i) => (
          <PracticeRow
            key={area.title}
            index={i}
            icon={area.icon}
            title={area.title}
            description={area.description}
          />
        ))}
      </div>
    </section>
  )
}

export default PracticeAreas

"use client"

import practiceAreas from "@/app/assets/data/practice-areas"
import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import { useState } from "react"
import Reveal from "../_components/Reveal"

/** Map icon string keys to react-icons components. Falls back to FaGavel. */
const ICON_MAP: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

/**
 * Single practice area card — extracted to isolate hover state per card.
 * Gold hairline glow on hover, icon scale(1.08), press scale(0.97) on click.
 */
function PracticeCard({
  area,
  delay,
}: {
  area: (typeof practiceAreas)[number]
  delay: number
}) {
  const Icon: IconType = ICON_MAP[area.icon] ?? FaGavel
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <Reveal as="li" delay={delay}>
      <div
        role="article"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setPressed(false)
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          height: "100%",
          backgroundColor: hovered ? "#111111" : "#0B0B0C",
          padding: "2.5rem 2rem",
          borderBottom: `2px solid ${hovered ? "#B08D57" : "transparent"}`,
          // Subtle gold glow on hover via box-shadow
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(176,141,87,0.18), 0 4px 24px rgba(176,141,87,0.07)"
            : "none",
          transform: pressed ? "scale(0.98)" : "scale(1)",
          transition:
            "border-color 200ms ease-out, background-color 200ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out",
          cursor: "default",
        }}
      >
        {/* Icon — scales up on card hover */}
        <div
          aria-hidden="true"
          style={{
            marginBottom: "1.25rem",
            color: "#B08D57",
            fontSize: "1.5rem",
            display: "inline-flex",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 200ms ease-out",
          }}
        >
          <Icon />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.35rem",
            fontWeight: 500,
            lineHeight: 1.25,
            color: "#EDEDED",
            margin: 0,
            marginBottom: "0.75rem",
          }}
        >
          {area.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "#9A9A9A",
            margin: 0,
            maxWidth: "38ch",
          }}
        >
          {area.description}
        </p>
      </div>
    </Reveal>
  )
}

/**
 * Practice Areas section — dark panel (#141414) with gold accents.
 * Cards in a responsive grid; each card reveals on scroll with staggered delay.
 */
export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      style={{
        backgroundColor: "#141414",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      {/* Section header */}
      <Reveal>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
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
              marginBottom: "1rem",
            }}
          >
            Legal Services
          </p>
          <h2
            id="practice-areas-heading"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#EDEDED",
              margin: 0,
              marginBottom: "1rem",
            }}
          >
            Areas of Practice
          </h2>
          {/* Gold rule */}
          <div
            aria-hidden="true"
            style={{ width: "3rem", height: "1px", backgroundColor: "#B08D57" }}
          />
        </div>
      </Reveal>

      {/* Cards grid — hairline-separated via gap + outer border */}
      <ul
        role="list"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "1px",
          listStyle: "none",
          padding: 0,
          // gap lines show as gold tint between cards
          backgroundColor: "rgba(176,141,87,0.15)",
          border: "1px solid rgba(176,141,87,0.15)",
        }}
      >
        {practiceAreas.map((area, i) => (
          <PracticeCard key={area.title} area={area} delay={i * 40} />
        ))}
      </ul>
    </section>
  )
}

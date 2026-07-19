"use client"

import { useState } from "react"
import practiceAreas from "@/app/assets/data/practice-areas"
import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import Reveal from "../_components/Reveal"
import { FONT, MOTION } from "../_components/theme"

const PA_STYLE = `
.d6-pa-row:focus-visible {
  outline: 2px solid var(--d6-accent);
  outline-offset: -2px;
}
`

const ICON_MAP: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

/**
 * PracticeAreas — interactive expanding rows (Draft 6).
 *
 * Each row is a hover/focus-driven panel: an orange wash sweeps in from
 * the left, the index number slides, the icon rotates, and the row lifts
 * on the active item. Scroll-staggered entrance via Reveal. Pure
 * transform/opacity (no layout shift); keyboard focus mirrors hover.
 */
function Row({
  index,
  icon,
  title,
  description,
  active,
  onActivate,
}: {
  index: number
  icon: string
  title: string
  description: string
  active: boolean
  onActivate: (i: number | null) => void
}) {
  const Icon = ICON_MAP[icon] ?? FaGavel
  const num = String(index + 1).padStart(2, "0")

  return (
    <Reveal as="article" delay={index * 90} variant="up">
      <div
        tabIndex={0}
        role="button"
        aria-expanded={active}
        aria-label={title}
        onMouseEnter={() => onActivate(index)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(index)}
        onBlur={() => onActivate(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onActivate(active ? null : index)
          } else if (e.key === " ") {
            e.preventDefault()
            onActivate(active ? null : index)
          }
        }}
        className="d6-pa-row"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "clamp(48px,7vw,84px) 1fr",
          gap: "clamp(1rem,3vw,2.5rem)",
          alignItems: "center",
          padding: "clamp(1.6rem,3vw,2.4rem) clamp(1rem,3vw,2rem)",
          borderBottom: "1px solid var(--d6-hair)",
          transform: active ? "translateX(10px)" : "translateX(0)",
          transition: `transform ${MOTION.base} ${MOTION.easeOut}`,
          cursor: "default",
        }}
      >
        {/* Orange sweep wash */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, var(--d6-accent-soft), transparent 70%)",
            transform: active ? "translateX(0)" : "translateX(-100%)",
            transition: `transform ${MOTION.slow} ${MOTION.easeOut}`,
            pointerEvents: "none",
          }}
        />
        {/* Index */}
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: "clamp(1.6rem,3vw,2.6rem)",
            lineHeight: 1,
            color: active ? "var(--d6-accent)" : "var(--d6-faint)",
            transform: active ? "translateY(-4px)" : "none",
            transition: `color ${MOTION.base} ${MOTION.easeOut}, transform ${MOTION.base} ${MOTION.spring}`,
          }}
        >
          {num}
        </span>
        {/* Title + desc + icon */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ minWidth: "min(100%,16rem)" }}>
            <h3
              style={{
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: "clamp(1.25rem,2.6vw,2rem)",
                color: "var(--d6-heading)",
                margin: 0,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "var(--d6-muted)",
                margin: "0.5rem 0 0",
                maxWidth: "46ch",
                maxHeight: active ? "5rem" : "1.4rem",
                opacity: active ? 1 : 0.5,
                overflow: "hidden",
                transition: `max-height ${MOTION.slow} ${MOTION.easeOut}, opacity ${MOTION.base} ${MOTION.easeOut}`,
              }}
            >
              {description}
            </p>
          </div>
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              border: `1px solid ${active ? "var(--d6-accent)" : "var(--d6-hair)"}`,
              color: active ? "var(--d6-accent)" : "var(--d6-text)",
              transform: active ? "rotate(360deg) scale(1.08)" : "none",
              transition: `transform ${MOTION.slow} ${MOTION.spring}, color ${MOTION.base} ease-out, border-color ${MOTION.base} ease-out`,
            }}
          >
            <Icon size={20} />
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export default function PracticeAreas() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
    <style>{PA_STYLE}</style>
    <section
      id="practice-areas"
      style={{
        backgroundColor: "var(--d6-bg)",
        padding: "clamp(4rem,9vw,7rem) clamp(1.25rem,5vw,5rem)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <Reveal variant="left">
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--d6-accent)",
              margin: "0 0 0.75rem",
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: "var(--d6-heading)",
              margin: "0 0 0.5rem",
            }}
          >
            Practice Areas
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "var(--d6-accent)",
              margin: "1.25rem 0 2.5rem",
            }}
          />
        </Reveal>

        <div>
          {practiceAreas.map((a, i) => (
            <Row
              key={a.title}
              index={i}
              icon={a.icon}
              title={a.title}
              description={a.description}
              active={active === i}
              onActivate={setActive}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

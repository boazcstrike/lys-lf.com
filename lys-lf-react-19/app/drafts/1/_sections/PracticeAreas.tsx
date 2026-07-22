/**
 * Practice Areas section — Editorial Prestige Draft 1
 *
 * Ivory background, magazine-style grid with thin gold hairline separators.
 * Icons from react-icons/fa. Headings: Playfair Display. Body: Source Sans 3.
 *
 * Interactivity (CSS, no JS):
 *   - Card lift on hover: translateY(-4px) + softened shadow + gold border glow.
 *   - Icon subtle scale(1.08) on card hover.
 *   - Card press: scale(0.98).
 *   - All transitions 200ms ease-out.
 *
 * Scroll reveal: section header + each card wrapped in <Reveal> with stagger.
 */

import React from "react"
import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import practiceAreas from "@/app/assets/data/practice-areas"
import Reveal from "@/app/drafts/1/_components/Reveal"

// ─── Icon registry ────────────────────────────────────────────────────────────
const iconMap: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

// ─── Small-caps section label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      // Legibility: 14px/700 with tightened tracking, and the AA-safe
      // --d6-accent-text (deep bronze ~5.6:1 on ivory) — decorative --d6-accent
      // gold is only ~2.2:1 and fails WCAG AA at this size. Same hue family, so
      // the editorial gold reading is preserved while the text stays readable.
      className="mb-3 text-sm tracking-[0.18em] uppercase"
      style={{
        color: "var(--d6-accent-text)",
        fontFamily: "var(--font-source-sans)",
        fontWeight: 700,
      }}
    >
      {children}
    </p>
  )
}

// ─── Thin gold hairline rule ──────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px ${className}`}
      style={{ backgroundColor: "var(--d6-accent)" }}
    />
  )
}

// ─── Individual practice area card ───────────────────────────────────────────
interface PracticeCardProps {
  iconName: string
  title: string
  description: string
  isLast: boolean
}

function PracticeCard({ iconName, title, description, isLast }: PracticeCardProps) {
  const Icon = iconMap[iconName] ?? FaGavel

  return (
    /*
      Hover/press via CSS class. The border-b / border-r dividers are part of
      the grid design; we preserve them and add a subtle box-shadow lift.
      `practice-card` CSS is injected in the sibling <style> tag at section bottom.
    */
    <div
      className={`practice-card flex flex-col gap-4 py-8 md:py-10 ${
        isLast ? "" : "border-b md:border-b-0 md:border-r"
      }`}
      style={{ borderColor: "var(--d6-accent)" }}
    >
      {/* Icon in a square gold border — scales gently on card hover */}
      <div
        className="practice-card-icon flex h-11 w-11 items-center justify-center"
        style={{ border: "1px solid var(--d6-accent)", color: "var(--d6-accent)" }}
        aria-hidden="true"
      >
        <Icon size={18} />
      </div>

      {/* Area title */}
      <h3
        className="text-xl leading-snug"
        style={{
          color: "var(--d6-heading)",
          fontFamily: "var(--font-playfair)",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>

      {/* Short accent rule */}
      <GoldRule className="w-8" />

      {/* Description — line-height 1.7 for comfortable reading */}
      <p
        className="text-sm leading-[1.7]"
        style={{
          color: "var(--d6-text)",
          fontFamily: "var(--font-source-sans)",
          opacity: 0.78,
          maxWidth: "30ch",
        }}
      >
        {description}
      </p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
const PracticeAreas: React.FC = () => {
  return (
    <section
      id="practice-areas"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--d6-bg)" }}
      aria-labelledby="practice-areas-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-20">

        {/* Section header — revealed as one block */}
        <Reveal className="mb-14 max-w-lg">
          <SectionLabel>Areas of Practice</SectionLabel>
          <h2
            id="practice-areas-heading"
            className="mb-5 text-3xl leading-tight md:text-4xl"
            style={{
              color: "var(--d6-heading)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
            }}
          >
            Comprehensive Legal Services
          </h2>
          <GoldRule className="mb-5 w-16" />
          <p
            className="max-w-[62ch] text-sm leading-[1.7]"
            style={{
              color: "var(--d6-text)",
              fontFamily: "var(--font-source-sans)",
              opacity: 0.72,
            }}
          >
            LYS provides diversified legal counsel to both corporate and
            individual clients across the Philippines.
          </p>
        </Reveal>

        {/* Cards grid: 1 col mobile / 3 col tablet / 5 col desktop.
            Each card is wrapped in Reveal with a 40ms stagger. */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
          style={{
            borderTop: "1px solid var(--d6-accent)",
            borderBottom: "1px solid var(--d6-accent)",
          }}
        >
          {practiceAreas.map((area, index) => (
            <Reveal
              key={area.title}
              delay={index * 40}
              className="px-0 md:px-6 first:md:pl-0 last:md:pr-0"
            >
              <PracticeCard
                iconName={area.icon}
                title={area.title}
                description={area.description}
                isLast={index === practiceAreas.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/*
        Scoped CSS for card hover lift + icon scale + press.
        @media reduced-motion disables transform so only opacity feedback remains.
      */}
      <style>{`
        .practice-card {
          cursor: default;
          transition: transform 200ms ease-out, box-shadow 200ms ease-out;
          border-radius: 0;
        }
        .practice-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(20,33,61,0.08);
          outline: 1px solid var(--d6-accent-line);
          outline-offset: -1px;
        }
        .practice-card:active {
          transform: scale(0.98) translateY(-2px);
        }
        .practice-card:hover .practice-card-icon {
          transform: scale(1.08);
          transition: transform 200ms ease-out;
        }
        .practice-card-icon {
          transition: transform 200ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .practice-card,
          .practice-card-icon {
            transition: none !important;
          }
          .practice-card:hover {
            transform: none;
          }
          .practice-card:hover .practice-card-icon {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}

export default PracticeAreas

"use client"

/**
 * PracticeCard — interactive practice-area card.
 * Handles hover lift + border colour change. Client component.
 * Accepts iconName string and resolves it internally (avoids passing
 * function across the server→client boundary).
 */

import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import Reveal from "./Reveal"

const iconMap: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

interface PracticeCardProps {
  title: string
  description: string
  /** Icon key string from practice-areas data, resolved here client-side. */
  iconName: string
  index: number
}

export default function PracticeCard({
  title,
  description,
  iconName,
  index,
}: PracticeCardProps) {
  const Icon = iconMap[iconName] ?? FaGavel

  return (
    <Reveal delay={index * 40} className="flex">
      <div
        role="listitem"
        className="flex flex-col items-start gap-4 p-6 border w-full"
        style={{
          borderColor: "#C9B9A0",
          backgroundColor: "#FAF6F0",
          outline: "2px solid #F4EFE6",
          outlineOffset: "-5px",
          transition:
            "transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out",
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget
          t.style.transform = "translateY(-3px)"
          t.style.boxShadow = "0 8px 24px rgba(59,47,47,0.10)"
          t.style.borderColor = "#9C7A3C"
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget
          t.style.transform = ""
          t.style.boxShadow = ""
          t.style.borderColor = "#C9B9A0"
        }}
      >
        {/* Icon square */}
        <span
          className="flex items-center justify-center w-11 h-11 flex-shrink-0"
          style={{ backgroundColor: "#6B1F2A", color: "#F4EFE6" }}
          aria-hidden="true"
        >
          <Icon size={18} />
        </span>

        {/* Title */}
        <h3
          className="text-base font-bold leading-snug"
          style={{ fontFamily: "var(--font-libre)", color: "#3B2F2F" }}
        >
          {title}
        </h3>

        {/* Description — 1.7 line-height for comfort */}
        <p
          className="text-sm leading-[1.7]"
          style={{ fontFamily: "var(--font-lora)", color: "#5C4A3A" }}
        >
          {description}
        </p>
      </div>
    </Reveal>
  )
}

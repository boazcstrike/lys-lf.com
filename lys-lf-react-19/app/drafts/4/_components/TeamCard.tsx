"use client"

/**
 * TeamCard — portrait card with hover lift + frame deepening.
 * Client component; parent TeamSection stays server.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: oxblood frame (#6B1F2A) and monogram letter mapped to --d6-accent.
 */

import type { Employee } from "@/app/types"
import Reveal from "./Reveal"

function getMonogram(name: string): string {
  const cleaned = name.replace(/^Atty\.\s*/i, "").trim()
  const parts = cleaned.split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts[parts.length - 1]?.[0] ?? ""
  return (first + last).toUpperCase()
}

interface TeamCardProps {
  employee: Employee
  index: number
}

export default function TeamCard({ employee, index }: TeamCardProps) {
  return (
    <Reveal
      delay={index * 50}
      className="flex flex-col items-center gap-3"
    >
      {/* Portrait frame wrapper — hover lifts the whole card */}
      <div
        style={{
          transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)"
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(59,47,47,0.13)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = ""
          e.currentTarget.style.boxShadow = ""
        }}
      >
        {/* Classic portrait frame: thick accent + inner accent-line inset */}
        <div
          className="border-4 p-1 w-44 h-52 sm:w-48 sm:h-56"
          style={{ borderColor: "var(--d6-accent2)" }}
        >
          <div
            className="border w-full h-full overflow-hidden flex items-center justify-center"
            style={{ borderColor: "var(--d6-accent-line)" }}
          >
            {employee.img ? (
              <img
                src={employee.img}
                alt={`Portrait of ${employee.name}`}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              /* Monogram placeholder for members without a photo */
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "var(--d6-bg)" }}
              >
                <span
                  className="text-4xl font-bold select-none"
                  style={{ fontFamily: "var(--font-libre)", color: "var(--d6-accent)" }}
                  aria-hidden="true"
                >
                  {getMonogram(employee.name)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name */}
      <p
        className="text-center text-sm font-bold leading-snug"
        style={{ fontFamily: "var(--font-libre)", color: "var(--d6-heading)" }}
      >
        {employee.name}
      </p>

      {/* Optional sub-position */}
      {employee.position && (
        <p
          className="text-center text-xs tracking-wider"
          style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
        >
          {employee.position}
        </p>
      )}

      {employee.bio && (
        <p
          className="text-justify text-xs leading-[1.7]"
          style={{ fontFamily: "var(--font-lora)", color: "var(--d6-text)" }}
        >
          {employee.bio}
        </p>
      )}
    </Reveal>
  )
}

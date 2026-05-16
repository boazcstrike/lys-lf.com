"use client"

/**
 * TeamCard — portrait card with hover lift + frame deepening.
 * Client component; parent TeamSection stays server.
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
        {/* Classic portrait frame: thick burgundy + inner gold inset */}
        <div
          className="border-4 p-1 w-44 h-52 sm:w-48 sm:h-56"
          style={{ borderColor: "#6B1F2A" }}
        >
          <div
            className="border w-full h-full overflow-hidden flex items-center justify-center"
            style={{ borderColor: "#9C7A3C" }}
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
                style={{ backgroundColor: "#EDE3D4" }}
              >
                <span
                  className="text-4xl font-bold select-none"
                  style={{ fontFamily: "var(--font-libre)", color: "#6B1F2A" }}
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
        style={{ fontFamily: "var(--font-libre)", color: "#3B2F2F" }}
      >
        {employee.name}
      </p>

      {/* Optional sub-position */}
      {employee.position && (
        <p
          className="text-center text-xs tracking-wider"
          style={{ fontFamily: "var(--font-lora)", color: "#9C7A3C" }}
        >
          {employee.position}
        </p>
      )}

      {employee.bio && (
        <p
          className="text-justify text-xs leading-[1.7]"
          style={{ fontFamily: "var(--font-lora)", color: "#3B2F2F" }}
        >
          {employee.bio}
        </p>
      )}
    </Reveal>
  )
}

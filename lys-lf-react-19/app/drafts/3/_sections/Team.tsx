"use client"

import { useState } from "react"
import teamRoles from "@/app/assets/data/team"
import type { Employee } from "@/app/types"
import Reveal from "../_components/Reveal"

/** Derive two initials from a full name string for the monogram fallback. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

/**
 * Single team member card — photo or gold monogram placeholder.
 * Gold hairline glow + image scale(1.03) on hover; isolated state per card.
 */
function MemberCard({
  employee,
  delay,
}: {
  employee: Employee
  delay: number
}) {
  const initials = getInitials(employee.name)
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal as="li" delay={delay}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo or monogram */}
        <div
          style={{
            width: "clamp(140px, 18vw, 200px)",
            height: "clamp(140px, 18vw, 200px)",
            marginBottom: "1.25rem",
            overflow: "hidden",
            position: "relative",
            border: hovered
              ? "1px solid rgba(176,141,87,0.55)"
              : "1px solid rgba(176,141,87,0.2)",
            boxShadow: hovered
              ? "0 0 0 3px rgba(176,141,87,0.1)"
              : "none",
            transition: "border-color 200ms ease-out, box-shadow 200ms ease-out",
          }}
        >
          {employee.img ? (
            <img
              src={employee.img}
              alt={`Portrait of ${employee.name}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 300ms ease-out",
              }}
            />
          ) : (
            // Monogram placeholder — gold initial letters on dark panel
            <div
              aria-label={`${employee.name} — photo not available`}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#141414",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#B08D57",
                letterSpacing: "0.05em",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 300ms ease-out",
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "#EDEDED",
            margin: 0,
            marginBottom: employee.position ? "0.3rem" : 0,
          }}
        >
          {employee.name}
        </p>

        {/* Optional per-employee position override */}
        {employee.position && (
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B08D57",
              margin: 0,
            }}
          >
            {employee.position}
          </p>
        )}

        {employee.bio && (
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.82rem",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#E2E2E2",
              maxWidth: "44ch",
              marginTop: "1rem",
              textAlign: "justify",
            }}
          >
            {employee.bio}
          </p>
        )}
      </div>
    </Reveal>
  )
}

/**
 * Team section — groups employees by role (Partners, Associates).
 * Each group renders its own labeled row. Cards reveal on scroll with stagger.
 */
export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      style={{
        backgroundColor: "#141414",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <Reveal>
          <div>
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
              The Firm
            </p>

            <h2
              id="team-heading"
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
              Our People
            </h2>

            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                backgroundColor: "#B08D57",
                marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            />
          </div>
        </Reveal>

        {/* Role groups */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          {teamRoles.map((role, groupIdx) => (
            <div key={role.position}>
              {/* Role label with gold bottom rule */}
              <Reveal delay={groupIdx * 30}>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#B08D57",
                    marginBottom: "2rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid rgba(176,141,87,0.2)",
                  }}
                >
                  {role.position}
                </p>
              </Reveal>

              {/* Member cards */}
              <ul
                role="list"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(2rem, 4vw, 3.5rem)",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  justifyContent: "flex-start",
                }}
              >
                {role.employees.map((employee, memberIdx) => (
                  <MemberCard
                    key={employee.key}
                    employee={employee}
                    delay={memberIdx * 45}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

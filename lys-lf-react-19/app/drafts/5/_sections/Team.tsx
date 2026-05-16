/**
 * Team — Swiss Architectural (Draft 5)
 *
 * Strict modular grid. Section index row with 1px rules. Partners occupy
 * wide columns with sharp portrait blocks. Associates — no photos — get
 * typographic initials blocks on #F2F2F2 ground. Role headings are set as
 * small-caps labels with a full-width horizontal rule. No rounded corners,
 * no shadows, no decorative curves.
 */

import React from "react"
import teamRoles from "@/app/assets/data/team"

/** 1–2 letter monogram from full name; strips "Atty." prefix */
function getInitials(name: string): string {
  const clean = name.replace(/^Atty\.\s*/i, "").trim()
  const parts = clean.split(/\s+/)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0]?.[0]?.toUpperCase() ?? "?"
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase()
}

/** Typographic initials block used when no photo is provided */
function InitialsBlock({ name }: { name: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "#F2F2F2" }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700,
          fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
          color: "#0A0A0A",
          letterSpacing: "-0.02em",
        }}
      >
        {getInitials(name)}
      </span>
    </div>
  )
}

const Team: React.FC = () => {
  return (
    <section
      id="team"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #0A0A0A" }}
    >
      {/* Section header row */}
      <div
        className="flex items-baseline justify-between px-6 py-8 lg:px-14 xl:px-20"
        style={{ borderBottom: "1px solid #0A0A0A" }}
      >
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
            04
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
            The Team
          </h2>
        </div>
        <span
          className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] sm:block"
          style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.35 }}
          aria-hidden="true"
        >
          Our People
        </span>
      </div>

      {/* One block per role group */}
      {teamRoles.map((role) => {
        const isPartners = role.position === "Partners"

        return (
          <div
            key={role.position}
            className="px-6 py-10 lg:px-14 lg:py-14 xl:px-20"
            style={{
              backgroundColor: isPartners ? "#0A0A0A" : "#FFFFFF",
              borderBottom: "1px solid #0A0A0A",
            }}
          >
            {/* Role label row — full-width 1px rule + small-caps label */}
            <div
              className="mb-8 flex items-center gap-4"
              style={{ borderBottom: `1px solid ${isPartners ? "rgba(255,255,255,0.15)" : "#0A0A0A"}` }}
            >
              {/* Red tick */}
              <div
                aria-hidden="true"
                style={{ width: "20px", height: "2px", backgroundColor: "#D72638", flexShrink: 0 }}
              />
              <h3
                className="pb-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: isPartners ? "rgba(255,255,255,0.5)" : "rgba(10,10,10,0.45)",
                }}
              >
                {role.position}
              </h3>
            </div>

            {/* Employee grid */}
            <div
              className={
                isPartners
                  ? "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:max-w-2xl"
                  : "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {role.employees.map((emp) => (
                <div key={emp.key}>
                  {/* Photo or initials block — strict rectangle, no rounding */}
                  <div
                    className="relative mb-4 overflow-hidden"
                    style={{
                      aspectRatio: isPartners ? "3 / 4" : "1 / 1",
                      maxWidth: isPartners ? "240px" : "180px",
                    }}
                  >
                    {emp.img ? (
                      <img
                        src={emp.img}
                        alt={`Portrait of ${emp.name}`}
                        className="h-full w-full object-cover object-top"
                        style={{ display: "block" }}
                      />
                    ) : (
                      <InitialsBlock name={emp.name} />
                    )}

                    {/* Red corner rule — top-left */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "32px",
                        backgroundColor: "#D72638",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <p
                    className="text-[0.9rem] font-semibold leading-snug"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: isPartners ? "#FFFFFF" : "#0A0A0A",
                    }}
                  >
                    {emp.name}
                  </p>

                  {/* Optional sub-title */}
                  {emp.position && (
                    <p
                      className="mt-1 text-[10px] uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "#D72638",
                      }}
                    >
                      {emp.position}
                    </p>
                  )}

                  {emp.bio && (
                    <p
                      className="mt-3 text-[0.8rem] leading-[1.7]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: isPartners ? "rgba(255,255,255,0.92)" : "rgba(10,10,10,0.88)",
                        maxWidth: "44ch",
                        textAlign: "justify",
                      }}
                    >
                      {emp.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Team

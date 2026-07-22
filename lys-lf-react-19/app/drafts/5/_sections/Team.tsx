/**
 * Team — Swiss Architectural (Draft 5)
 *
 * Strict modular grid. Section index row with 1px rules. Partners occupy
 * wide columns with sharp portrait blocks. Associates — no photos — get
 * typographic initials blocks on panel ground. Role headings are set as
 * small-caps labels with a full-width horizontal rule. No rounded corners,
 * no shadows, no decorative curves.
 *
 * Token mapping (d5-default):
 *   bg      = #FFFFFF (section bg, Associates band bg)
 *   panel   = #F2F2F2 (InitialsBlock bg for associates)
 *   hair    = #0A0A0A (1px structural borders — opaque in d5-default)
 *   accent  = #D72638 (index "04", tick bar, corner rule, sub-title text)
 *   faint   = rgba(10,10,10,0.40) ("Our People" eyebrow, associates role label)
 *   heading = #0A0A0A (h2 section heading)
 *   text    = #0A0A0A (associate name)
 *   muted   = rgba(10,10,10,0.68) (associate bio text)
 *
 * RESOLVED (FIX 1) — Partners dark band:
 *   Partners band bg now uses var(--d6-slab); partner name text uses var(--d6-slab-text).
 *   d5-default slab=#0A0A0A / slabText=#FFFFFF — exact visual parity with original.
 *   Other schemes get their scheme-appropriate dark slab instead of stark black.
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

/** Typographic initials block used when no photo is provided — sits on panel */
function InitialsBlock({ name }: { name: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "var(--d6-panel)" }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700,
          fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
          color: "var(--d6-heading)",
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
      style={{ backgroundColor: "var(--d6-bg)", borderBottom: "1px solid var(--d6-hair)" }}
    >
      {/* Section header row */}
      <div
        className="flex items-baseline justify-between px-6 py-8 lg:px-14 xl:px-20"
        style={{ borderBottom: "1px solid var(--d6-hair)" }}
      >
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "var(--d6-accent)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            04
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "var(--d6-heading)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            The Team
          </h2>
        </div>
        <span
          className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] sm:block"
          style={{ fontFamily: "var(--font-inter)", color: "var(--d6-faint)" }}
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
              backgroundColor: isPartners ? "var(--d6-slab)" : "var(--d6-bg)",
              borderBottom: "1px solid var(--d6-hair)",
            }}
          >
            {/* Role label row — full-width 1px rule + small-caps label */}
            <div
              className="mb-8 flex items-center gap-4"
              style={{
                borderBottom: `1px solid ${isPartners ? "rgba(255,255,255,0.15)" : "var(--d6-hair)"}`,
              }}
            >
              {/* Accent tick — decorative; accent2 = gold under navy/gold tone */}
              <div
                aria-hidden="true"
                style={{ width: "20px", height: "2px", backgroundColor: "var(--d6-accent2)", flexShrink: 0 }}
              />
              <h3
                className="pb-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-inter)",
                  /* Partners: hardcoded white (dark bg); Associates: faint token */
                  color: isPartners ? "rgba(255,255,255,0.5)" : "var(--d6-faint)",
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

                    {/* Accent corner rule — top-left; decorative, accent2 = gold
                        under the navy/gold tone (equals accent elsewhere) */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "32px",
                        backgroundColor: "var(--d6-accent2)",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <p
                    className="text-[0.9rem] font-semibold leading-snug"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: isPartners ? "var(--d6-slab-text)" : "var(--d6-text)",
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
                        color: "var(--d6-accent)",
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
                        /* Partners: hardcoded white (dark bg); Associates: muted token */
                        color: isPartners ? "rgba(255,255,255,0.92)" : "var(--d6-muted)",
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

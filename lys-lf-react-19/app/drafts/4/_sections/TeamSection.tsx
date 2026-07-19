/**
 * TeamSection — Heritage Traditional (server component)
 * Framed portraits for members with photos; monogram placeholder for others.
 * Hover interactivity delegated to TeamCard client component.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: double-rule borders use --d6-accent2 (#6B1F2A exact parity); original oxblood
 * #6B1F2A is mapped to --d6-accent2 which preserves the exact Heritage Traditional color.
 */

import teamRoles from "@/app/assets/data/team"
import type { TeamRole } from "@/app/types"
import Reveal from "../_components/Reveal"
import OrnamentalDivider from "../_components/OrnamentalDivider"
import TeamCard from "../_components/TeamCard"

/** Renders one role group (e.g. Partners, Associate Lawyers). */
function RoleGroup({ group }: { group: TeamRole }) {
  return (
    <div className="mb-14 last:mb-0">
      {/* Role label */}
      <h3
        className="text-center text-xs tracking-[0.3em] uppercase mb-8"
        style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
      >
        {group.position}
      </h3>

      {/* Member cards — flex wrap centred */}
      <div className="flex flex-wrap justify-center gap-8" role="list">
        {group.employees.map((emp, i) => (
          <div
            key={emp.key}
            role="listitem"
            style={{ maxWidth: emp.bio ? "440px" : "200px" }}
          >
            <TeamCard employee={emp} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      style={{ backgroundColor: "var(--d6-bg)" }}
    >
      {/* Double-rule top */}
      <div className="border-t-4" style={{ borderColor: "var(--d6-accent2)" }} aria-hidden="true" />
      <div
        className="border-t"
        style={{ borderColor: "var(--d6-accent2)", marginTop: "3px" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
        {/* Heading block */}
        <Reveal>
          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: "var(--font-libre)", color: "var(--d6-heading)", fontWeight: 700 }}
          >
            Our Legal Team
          </h2>

          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
          >
            The Pillars of Our Practice
          </p>

          <OrnamentalDivider className="mb-12 max-w-xs mx-auto" color="var(--d6-accent)" />
        </Reveal>

        {teamRoles.map((group) => (
          <RoleGroup key={group.position} group={group} />
        ))}
      </div>

      {/* Double-rule bottom */}
      <div className="border-b" style={{ borderColor: "var(--d6-accent2)" }} aria-hidden="true" />
      <div
        className="border-b-4"
        style={{ borderColor: "var(--d6-accent2)", marginBottom: "3px" }}
        aria-hidden="true"
      />
    </section>
  )
}

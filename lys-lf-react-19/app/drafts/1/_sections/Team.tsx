/**
 * Team section — Editorial Prestige Draft 1
 *
 * Partners display with portrait photos. Associates display with an
 * elegant monogram / initials placeholder (no photo available).
 * Layout: ivory background, Playfair headings, gold accents.
 *
 * Scroll reveal: section header + each card revealed with stagger.
 * Hover: partner photos get a subtle scale(1.03) on the image within
 *   an overflow-hidden container (no layout shift). Gold accent bar
 *   expands from w-16 to w-full on hover. All 250ms ease-out.
 */

import React from "react"
import teamRoles from "@/app/assets/data/team"
import type { Employee } from "@/app/types"
import Reveal from "@/app/drafts/1/_components/Reveal"

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Derives up to 2 initials from a full name, skipping courtesy titles.
 * Example: "Atty. Gloriosa Yutatco-Sze" → "GY"
 */
function getInitials(fullName: string): string {
  const skippedTitles = new Set(["atty.", "mr.", "ms.", "dr.", "jr.", "sr."])
  const parts = fullName
    .split(/[\s-]+/)
    .filter((p) => !skippedTitles.has(p.toLowerCase().replace(/,/g, "")))
  return parts
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("")
}

// ─── Small-caps section label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-xs tracking-[0.22em] uppercase"
      style={{
        color: "#C5A572",
        fontFamily: "var(--font-source-sans)",
        fontWeight: 600,
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
      style={{ backgroundColor: "#C5A572" }}
    />
  )
}

// ─── Partner card (portrait photo) ───────────────────────────────────────────
function PartnerCard({ employee }: { employee: Employee }) {
  return (
    /*
      `partner-card` CSS class drives hover effects defined in the <style>
      tag at the bottom of the section. The photo container clips the scale
      transform so there is no overflow.
    */
    <div className="partner-card flex flex-col">
      {/* Portrait photo — overflow-hidden clips image scale on hover */}
      <div className="relative mb-5 overflow-hidden">
        <img
          src={employee.img}
          alt={`Portrait of ${employee.name}`}
          className="partner-card-img h-[380px] w-full object-cover"
          style={{ objectPosition: "top center" }}
        />
        {/*
          Gold accent bar at bottom-left.
          Expands to full width on hover via .partner-card:hover .partner-card-bar CSS.
        */}
        <div
          aria-hidden="true"
          className="partner-card-bar pointer-events-none absolute bottom-0 left-0 h-1"
          style={{ backgroundColor: "#C5A572", width: "4rem" }}
        />
      </div>

      <h3
        className="mb-1 text-xl leading-snug"
        style={{
          color: "#14213D",
          fontFamily: "var(--font-playfair)",
          fontWeight: 600,
        }}
      >
        {employee.name}
      </h3>

      <p
        className="text-xs tracking-[0.18em] uppercase"
        style={{
          color: "#C5A572",
          fontFamily: "var(--font-source-sans)",
          fontWeight: 600,
        }}
      >
        Partner
      </p>

      {employee.bio && (
        <p
          className="mt-4 max-w-[46ch] text-sm leading-[1.75] text-justify"
          style={{
            color: "#14213D",
            fontFamily: "var(--font-source-sans)",
            opacity: 1,
          }}
        >
          {employee.bio}
        </p>
      )}
    </div>
  )
}

// ─── Associate card (elegant monogram placeholder) ───────────────────────────
function AssociateCard({ employee }: { employee: Employee }) {
  const initials = getInitials(employee.name)

  return (
    <div className="associate-card flex flex-col items-center text-center md:items-start md:text-left">
      {/* Monogram square — border brightens on hover */}
      <div
        className="associate-card-mono mb-5 flex h-24 w-24 items-center justify-center"
        style={{
          border: "1px solid #C5A572",
          backgroundColor: "#FBF8F1",
        }}
        aria-hidden="true"
      >
        <span
          className="select-none text-2xl tracking-wider"
          style={{
            color: "#14213D",
            fontFamily: "var(--font-playfair)",
            fontWeight: 600,
          }}
        >
          {initials}
        </span>
      </div>

      <h3
        className="mb-1 text-base leading-snug"
        style={{
          color: "#14213D",
          fontFamily: "var(--font-playfair)",
          fontWeight: 600,
        }}
      >
        {employee.name}
      </h3>

      <p
        className="text-xs tracking-[0.18em] uppercase"
        style={{
          color: "#C5A572",
          fontFamily: "var(--font-source-sans)",
          fontWeight: 600,
        }}
      >
        Associate
      </p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
const Team: React.FC = () => {
  return (
    <section
      id="team"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#FBF8F1" }}
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-20">

        {/* Section header */}
        <Reveal className="mb-14 max-w-lg">
          <SectionLabel>Our People</SectionLabel>
          <h2
            id="team-heading"
            className="mb-5 text-3xl leading-tight md:text-4xl"
            style={{
              color: "#14213D",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
            }}
          >
            The Attorneys
          </h2>
          <GoldRule className="mb-5 w-16" />
          <p
            className="max-w-[62ch] text-sm leading-[1.7]"
            style={{
              color: "#1A1A2E",
              fontFamily: "var(--font-source-sans)",
              opacity: 0.72,
            }}
          >
            Graduates of the Philippines&apos; most reputable law schools,
            united by a commitment to professional excellence and client service.
          </p>
        </Reveal>

        {/* Render each role group */}
        {teamRoles.map((role) => {
          const isPartners = role.position === "Partners"

          return (
            <div key={role.position} className="mb-16 last:mb-0">
              {/* Role group divider */}
              <Reveal className="mb-10 flex items-center gap-4">
                <GoldRule className="w-12" />
                <h3
                  className="shrink-0 text-xs tracking-[0.22em] uppercase"
                  style={{
                    color: "#14213D",
                    fontFamily: "var(--font-source-sans)",
                    fontWeight: 700,
                  }}
                >
                  {role.position}
                </h3>
                <div
                  aria-hidden="true"
                  className="flex-1"
                  style={{
                    height: "1px",
                    backgroundColor: "#C5A572",
                    opacity: 0.35,
                  }}
                />
              </Reveal>

              {/* Employee cards with 45ms stagger */}
              {isPartners ? (
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-16 xl:max-w-2xl">
                  {role.employees.map((emp, i) => (
                    <Reveal key={emp.key} delay={i * 45}>
                      <PartnerCard employee={emp} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:max-w-3xl">
                  {role.employees.map((emp, i) => (
                    <Reveal key={emp.key} delay={i * 40}>
                      <AssociateCard employee={emp} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/*
        Scoped CSS: partner photo scale + gold bar expansion on hover.
        Associate monogram border brightens. Reduced-motion: no transforms.
      */}
      <style>{`
        .partner-card-img {
          transition: transform 260ms ease-out;
        }
        .partner-card:hover .partner-card-img {
          transform: scale(1.04);
        }
        .partner-card-bar {
          transition: width 260ms ease-out;
        }
        .partner-card:hover .partner-card-bar {
          width: 100% !important;
        }
        .associate-card-mono {
          transition: border-color 200ms ease-out, background-color 200ms ease-out;
        }
        .associate-card:hover .associate-card-mono {
          border-color: #c5a572;
          background-color: rgba(197,165,114,0.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-card-img,
          .partner-card-bar,
          .associate-card-mono {
            transition: none !important;
          }
          .partner-card:hover .partner-card-img { transform: none; }
          .partner-card:hover .partner-card-bar { width: 4rem !important; }
        }
      `}</style>
    </section>
  )
}

export default Team

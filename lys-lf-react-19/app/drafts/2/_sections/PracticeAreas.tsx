import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import practiceAreas from "@/app/assets/data/practice-areas"

const ICON_MAP: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

/**
 * PracticeAreas — Quiet Luxury grid.
 * Brass hairline borders between cards, generous white space,
 * large Cormorant heading. No JS — CSS hover only.
 * Colors via CSS custom properties (--d6-*).
 *
 * Gap token note: original used two distinct light bg values (STONE #EFEAE1
 * for card bg, PANEL #F6F2EA for section bg and icon bg). The theme maps
 * --d6-bg to STONE; both card and section now use --d6-bg. Visual difference
 * is minimal (~5% lightness delta). Reported in commit.
 */
export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      style={{
        backgroundColor: "var(--d6-bg)",
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <p
            style={{ color: "var(--d6-accent)", letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-4 font-medium uppercase"
          >
            What We Do
          </p>
          <h2
            id="practice-areas-heading"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: "var(--d6-heading)",
              fontWeight: 500,
              lineHeight: 1.1,
            }}
            className="text-[2.25rem] sm:text-[2.75rem]"
          >
            Areas of Practice
          </h2>
          {/* Brass hairline */}
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: "var(--d6-accent)" }}
            className="mt-5"
            aria-hidden="true"
          />
        </div>

        {/* Card grid — hair color gap between cards */}
        <ul
          style={{ backgroundColor: "var(--d6-hair)" }}
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {practiceAreas.map((area) => {
            const Icon: IconType = ICON_MAP[area.icon] ?? FaGavel

            return (
              <li
                key={area.title}
                style={{ backgroundColor: "var(--d6-bg)" }}
                className="flex flex-col p-8 transition-shadow hover:shadow-[0_4px_24px_var(--d6-scrim-bot)]"
              >
                {/* Icon in small framed square */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.75rem",
                    height: "2.75rem",
                    border: "1px solid var(--d6-accent-line)",
                    backgroundColor: "var(--d6-bg)",
                    marginBottom: "1.5rem",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Icon style={{ color: "var(--d6-accent)", fontSize: "1.1rem" }} />
                </span>

                {/* Title — Cormorant serif */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: "var(--d6-heading)",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                  }}
                >
                  {area.title}
                </h3>

                {/* Thin brass accent rule */}
                <div
                  style={{
                    width: "1.5rem",
                    height: "1px",
                    backgroundColor: "var(--d6-accent)",
                    marginBottom: "0.875rem",
                  }}
                  aria-hidden="true"
                />

                <p
                  style={{ color: "var(--d6-faint)", lineHeight: 1.7 }}
                  className="text-sm"
                >
                  {area.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

import {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
} from "react-icons/fa"
import type { IconType } from "react-icons"
import practiceAreas from "@/app/assets/data/practice-areas"

// Quiet Luxury palette
const GREEN = "#1F3A2E"
const BRASS = "#A98B5D"
const CHARCOAL = "#2B2622"
const STONE = "#EFEAE1"
const PANEL = "#F6F2EA"

const ICON_MAP: Record<string, IconType> = {
  FaBriefcase,
  FaCopyright,
  FaGavel,
  FaBalanceScale,
  FaHandHoldingUsd,
}

/**
 * PracticeAreas — Quiet Luxury grid.
 * Soft panel (#F6F2EA) bg, thin brass hairline borders between cards,
 * generous white space, small-caps tracked section label,
 * large Cormorant heading. No JS — CSS hover only.
 */
export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      style={{
        backgroundColor: PANEL,
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <p
            style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-4 font-medium uppercase"
          >
            What We Do
          </p>
          <h2
            id="practice-areas-heading"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: GREEN,
              fontWeight: 500,
              lineHeight: 1.1,
            }}
            className="text-[2.25rem] sm:text-[2.75rem]"
          >
            Areas of Practice
          </h2>
          {/* Brass hairline */}
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: BRASS }}
            className="mt-5"
            aria-hidden="true"
          />
        </div>

        {/* Card grid — brass hairline gap between cards */}
        <ul
          style={{ backgroundColor: `${BRASS}33` }}
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {practiceAreas.map((area) => {
            const Icon: IconType = ICON_MAP[area.icon] ?? FaGavel

            return (
              <li
                key={area.title}
                style={{ backgroundColor: STONE }}
                className="flex flex-col p-8 transition-shadow hover:shadow-[0_4px_24px_rgba(31,58,46,0.08)]"
              >
                {/* Icon in small framed square */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.75rem",
                    height: "2.75rem",
                    border: `1px solid ${BRASS}55`,
                    backgroundColor: PANEL,
                    marginBottom: "1.5rem",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Icon style={{ color: BRASS, fontSize: "1.1rem" }} />
                </span>

                {/* Title — Cormorant serif */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    color: GREEN,
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
                    backgroundColor: BRASS,
                    marginBottom: "0.875rem",
                  }}
                  aria-hidden="true"
                />

                <p
                  style={{ color: `${CHARCOAL}99`, lineHeight: 1.7 }}
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

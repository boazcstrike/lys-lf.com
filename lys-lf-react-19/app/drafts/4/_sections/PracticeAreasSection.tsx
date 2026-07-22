/**
 * PracticeAreasSection — Heritage Traditional (server component)
 * Cream background, double-rule frame, left-aligned serif heading block,
 * animated OrnamentalDivider, PracticeCard for hover interactivity.
 * Passes iconName string (not the component) to avoid server→client fn boundary.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: section double-rules use --d6-accent2 (#6B1F2A exact parity); original oxblood
 * #6B1F2A is mapped to --d6-accent2 which preserves the exact Heritage Traditional color.
 */

import practiceAreas from "@/app/assets/data/practice-areas"
import Reveal from "../_components/Reveal"
import OrnamentalDivider from "../_components/OrnamentalDivider"
import PracticeCard from "../_components/PracticeCard"

export default function PracticeAreasSection() {
  return (
    <section
      id="practice-areas"
      aria-labelledby="pa-heading"
      style={{ backgroundColor: "var(--d6-bg)" }}
    >
      {/* Double-rule top border */}
      <div className="border-t-4" style={{ borderColor: "var(--d6-accent2)" }} aria-hidden="true" />
      <div
        className="border-t"
        style={{ borderColor: "var(--d6-accent2)", marginTop: "3px" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        {/* Heading block — left-aligned editorial intro (asymmetry vs. the grid) */}
        <Reveal>
          <h2
            id="pa-heading"
            className="text-2xl sm:text-3xl leading-[1.1] mb-2"
            style={{
              fontFamily: "var(--font-libre)",
              color: "var(--d6-heading)",
              fontWeight: 700,
              // Match the hero h1's display-serif tracking for heading parity.
              letterSpacing: "-0.01em",
            }}
          >
            Areas of Practice
          </h2>

          {/* Subtitle — small gold label on the light cream bg. Uses the
              text-safe accent (--d6-accent-text) so it clears WCAG AA where the
              decorative gold would fall short as small copy. */}
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent-text)" }}
          >
            Our Fields of Expertise
          </p>

          <OrnamentalDivider className="mt-6 mb-8 max-w-sm" color="var(--d6-accent)" />
        </Reveal>

        {/* Cards grid — role="list" on wrapper; each PracticeCard has role="listitem" */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          role="list"
        >
          {practiceAreas.map((area, i) => (
            <PracticeCard
              key={area.title}
              title={area.title}
              description={area.description}
              iconName={area.icon}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Double-rule bottom border */}
      <div className="border-b" style={{ borderColor: "var(--d6-accent2)" }} aria-hidden="true" />
      <div
        className="border-b-4"
        style={{ borderColor: "var(--d6-accent2)", marginBottom: "3px" }}
        aria-hidden="true"
      />
    </section>
  )
}

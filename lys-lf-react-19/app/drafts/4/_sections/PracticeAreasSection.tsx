/**
 * PracticeAreasSection — Heritage Traditional (server component)
 * Cream background, double-rule frame, centered serif heading,
 * animated OrnamentalDivider, PracticeCard for hover interactivity.
 * Passes iconName string (not the component) to avoid server→client fn boundary.
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
      style={{ backgroundColor: "#F4EFE6" }}
    >
      {/* Double-rule top border */}
      <div className="border-t-4" style={{ borderColor: "#6B1F2A" }} aria-hidden="true" />
      <div
        className="border-t"
        style={{ borderColor: "#6B1F2A", marginTop: "3px" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
        {/* Heading block */}
        <Reveal>
          <h2
            id="pa-heading"
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: "var(--font-libre)", color: "#3B2F2F", fontWeight: 700 }}
          >
            Areas of Practice
          </h2>

          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "#9C7A3C" }}
          >
            Our Fields of Expertise
          </p>

          <OrnamentalDivider className="my-8 max-w-sm mx-auto" />
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
      <div className="border-b" style={{ borderColor: "#6B1F2A" }} aria-hidden="true" />
      <div
        className="border-b-4"
        style={{ borderColor: "#6B1F2A", marginBottom: "3px" }}
        aria-hidden="true"
      />
    </section>
  )
}

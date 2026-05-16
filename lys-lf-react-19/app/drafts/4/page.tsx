/**
 * Draft 4 — Heritage Traditional
 * Formal, classic law-firm aesthetic: cream bg, oxblood/burgundy primary,
 * antique gold accents, Libre Baskerville headings, Lora body copy.
 * Static-export safe; interactivity isolated into "use client" leaf components.
 */

import HeroSection from "./_sections/HeroSection"
import PracticeAreasSection from "./_sections/PracticeAreasSection"
import BusinessProfileSection from "./_sections/BusinessProfileSection"
import TeamSection from "./_sections/TeamSection"
import CtaBannerSection from "./_sections/CtaBannerSection"
import ContactSection from "./_sections/ContactSection"
import FooterSection from "./_sections/FooterSection"

export default function Draft4Page() {
  return (
    <div
      style={{
        backgroundColor: "#F4EFE6",
        fontFamily: "var(--font-lora)",
        color: "#3B2F2F",
        // Smooth in-page anchor scrolling (e.g. #contact CTA).
        scrollBehavior: "smooth",
      }}
    >
      {/* 1. Hero / Header */}
      <HeroSection />

      {/* 2. Practice Areas */}
      <PracticeAreasSection />

      {/* 3. Business Profile */}
      <BusinessProfileSection />

      {/* 4. Team */}
      <TeamSection />

      {/* 5. CTA Banner */}
      <CtaBannerSection />

      {/* 6. Contact + Map */}
      <ContactSection />

      {/* 7. Footer */}
      <FooterSection />
    </div>
  )
}

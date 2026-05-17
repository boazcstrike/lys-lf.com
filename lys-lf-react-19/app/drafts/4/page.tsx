/**
 * Draft 4 — Heritage Traditional
 * Formal, classic law-firm aesthetic: cream bg, oxblood/burgundy primary,
 * antique gold accents, Libre Baskerville headings, Lora body copy.
 * Static-export safe; interactivity isolated into "use client" leaf components.
 *
 * Theme: ThemeProvider injects --d6-* CSS custom properties.
 *        defaultScheme "d4-default" reproduces the original Heritage palette.
 *        ColorSwitcher exposes d4-default + 7 shared luxury schemes.
 */

import type { Metadata } from "next"
import ThemeProvider from "@/app/drafts/_theme/ThemeProvider"

export const metadata: Metadata = {
  title: "Draft 4 — Heritage Traditional | LYS Law Firm",
  robots: { index: false, follow: false },
}
import ColorSwitcher from "@/app/drafts/_theme/ColorSwitcher"
import HeroSection from "./_sections/HeroSection"
import PracticeAreasSection from "./_sections/PracticeAreasSection"
import BusinessProfileSection from "./_sections/BusinessProfileSection"
import TeamSection from "./_sections/TeamSection"
import CtaBannerSection from "./_sections/CtaBannerSection"
import ContactSection from "./_sections/ContactSection"
import FooterSection from "./_sections/FooterSection"

export default function Draft4Page() {
  return (
    <ThemeProvider defaultScheme="d4-default" storageKey="lys-scheme-d4">
      <ColorSwitcher />

      {/* Root wrapper: bg and text driven by CSS vars; fonts kept per-section. */}
      <div
        style={{
          backgroundColor: "var(--d6-bg)",
          fontFamily: "var(--font-lora)",
          color: "var(--d6-text)",
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
    </ThemeProvider>
  )
}

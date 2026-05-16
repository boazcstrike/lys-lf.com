/**
 * Draft 5 — Swiss Architectural
 *
 * International Typographic Style: strict modular grid, visible 1px black
 * structural rules, big red section index numbers, hard left-aligned baseline
 * grid, generous white space, flat rectangular photo blocks, no rounded
 * corners, no shadows.
 *
 * Palette: #FFFFFF bg | #0A0A0A structure/text | #D72638 accent (red) | #F2F2F2 panel
 * Fonts: Space Grotesk (display, numerals) + Inter (body/UI, tight tracking)
 *
 * Pure static orchestrator — no "use client" needed here.
 */

import type { Metadata } from "next"

import Hero from "./_sections/Hero"
import PracticeAreas from "./_sections/PracticeAreas"
import BusinessProfile from "./_sections/BusinessProfile"
import Team from "./_sections/Team"
import CtaBanner from "./_sections/CtaBanner"
import Contacts from "./_sections/Contacts"
import Footer from "./_sections/Footer"

export const metadata: Metadata = {
  title: "Draft 5 — Swiss Architectural | LYS Law Firm",
  robots: { index: false, follow: false },
}

export default function Draft5Page() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "var(--font-inter)",
        overflowX: "hidden",
        color: "#0A0A0A",
      }}
    >
      {/* 01 — Hero: huge wordmark, structural grid lines, photo block */}
      <Hero />

      {/* 02 — Practice areas: indexed list with 1px rules */}
      <PracticeAreas />

      {/* 03 — Business profile: two-column with photo */}
      <BusinessProfile />

      {/* 04 — Team: typographic grid, initials for associates */}
      <Team />

      {/* 05 — CTA banner: red field, white type */}
      <CtaBanner />

      {/* 06 — Contacts: address + hours + map embed */}
      <Contacts />

      {/* Footer — logo + firm name + credit */}
      <Footer />
    </main>
  )
}

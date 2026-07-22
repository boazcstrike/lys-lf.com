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
 * Theme: defaultScheme="d5-default" (Swiss Architectural) — storageKey "lys-scheme-d5"
 * allows the user to switch to any of the 7 shared luxury schemes.
 *
 * Accent: the draft-default palette is re-toned by a local accent layer
 * (AccentProvider) that defaults to a navy/gold law-firm pairing while keeping
 * the original Swiss red selectable (see _components/accent.ts). This overrides
 * only the accent family and only for the default scheme — luxury schemes are
 * untouched.
 *
 * Motion: below-the-fold sections fade/rise into view via <Reveal> (reduced-
 * motion-safe, transform+opacity only). The Hero stays instant as the LCP.
 */

import type { Metadata } from "next"

import ThemeProvider from "@/app/drafts/_theme/ThemeProvider"
import ColorSwitcher from "@/app/drafts/_theme/ColorSwitcher"
import AccentProvider from "./_components/AccentProvider"
import AccentSwitcher from "./_components/AccentSwitcher"
import Reveal from "./_components/Reveal"
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
    <ThemeProvider defaultScheme="d5-default" storageKey="lys-scheme-d5">
      <ColorSwitcher />

      <AccentProvider>
        {/* Design-tool only (dev): switch between Navy & Gold and Swiss Red */}
        <AccentSwitcher />

        {/* 01 — Hero: huge wordmark, structural grid lines, photo block.
            Above the fold → rendered instantly (LCP), no scroll reveal. */}
        <Hero />

        {/* 02 — Practice areas: indexed list with 1px rules */}
        <Reveal as="div">
          <PracticeAreas />
        </Reveal>

        {/* 03 — Business profile: two-column with photo */}
        <Reveal as="div">
          <BusinessProfile />
        </Reveal>

        {/* 04 — Team: typographic grid, initials for associates */}
        <Reveal as="div">
          <Team />
        </Reveal>

        {/* 05 — CTA banner: accent field, white type */}
        <Reveal as="div">
          <CtaBanner />
        </Reveal>

        {/* 06 — Contacts: address + hours + map embed */}
        <Reveal as="div">
          <Contacts />
        </Reveal>

        {/* Footer — logo + firm name + credit */}
        <Reveal as="div">
          <Footer />
        </Reveal>
      </AccentProvider>
    </ThemeProvider>
  )
}

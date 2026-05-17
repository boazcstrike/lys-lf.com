import type { Metadata } from "next"

import Hero from "./_sections/Hero"
import PracticeAreas from "./_sections/PracticeAreas"
import BusinessProfile from "./_sections/BusinessProfile"
import Team from "./_sections/Team"
import CTABanner from "./_sections/CTABanner"
import Contacts from "./_sections/Contacts"
import Footer from "./_sections/Footer"
import ThemeProvider from "@/app/drafts/_theme/ThemeProvider"
import ColorSwitcher from "@/app/drafts/_theme/ColorSwitcher"

export const metadata: Metadata = {
  title: "Draft 2 — Quiet Luxury | LYS Law Firm",
  robots: { index: false, follow: false },
}

/**
 * Draft 2 — "Quiet Luxury"
 *
 * Design direction: calm boutique-prestige, premium restraint.
 * Palette: warm stone #EFEAE1 bg / deep forest green #1F3A2E primary /
 *          muted brass #A98B5D accent / warm charcoal #2B2622 text.
 * Fonts: Cormorant Garamond (headings) + Source Sans 3 (body).
 *
 * Theme: defaultScheme="d2-default" (Minimal Corporate) — storageKey
 * "lys-scheme-d2" allows switching to all 7 shared luxury schemes.
 */
export default function Draft2Page() {
  return (
    <ThemeProvider defaultScheme="d2-default" storageKey="lys-scheme-d2">
      <ColorSwitcher />

      {/* 1. Hero — serif headline + framed photo */}
      <Hero />

      {/* 2. Practice Areas — brass-bordered card grid */}
      <PracticeAreas />

      {/* 3. Business Profile — editorial text + photo collage */}
      <BusinessProfile />

      {/* 4. Team — portrait cards + typographic monograms */}
      <Team />

      {/* 5. CTA Banner — dark panel strip, "Have Legal Problems? Let's Talk." */}
      <CTABanner />

      {/* 6. Contacts — address, hours, phone, email, embedded map */}
      <Contacts />

      {/* 7. Footer — white logo + firm name + attribution */}
      <Footer />
    </ThemeProvider>
  )
}

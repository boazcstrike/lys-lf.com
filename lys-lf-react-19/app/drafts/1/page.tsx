/**
 * Draft 1: "Editorial Prestige" — page.tsx
 *
 * Composes all 7 sections in document order. No 'use client' needed here;
 * all sections are server components (no hooks or browser APIs at top level).
 * Interactive sub-components (Reveal, CountUpYear) carry their own "use client".
 * ThemeProvider and ColorSwitcher are client components — safe to nest under
 * this server component.
 *
 * Sections:
 *   1. Hero            — full-bleed asymmetric hero, single h1
 *   2. PracticeAreas   — ivory grid with gold hairline separators
 *   3. BusinessProfile — navy, drop-cap first paragraph, react-markdown
 *   4. Team            — ivory, partner portraits + associate monograms
 *   5. CtaBanner       — navy photo banner "Have Legal Problems? Let's Talk."
 *   6. Contacts        — ivory, address + Google Maps embed
 *   7. Footer          — navy, white logo, firm name, byline
 *
 * Background rhythm: navy → ivory → navy → ivory → navy → ivory → navy
 *
 * Theme: defaultScheme="d1-default" (Editorial Prestige Default)
 * storageKey="lys-scheme-d1" — persists user's scheme choice per draft.
 */

import type { Metadata } from "next"
import Hero from "@/app/drafts/1/_sections/Hero"
import PracticeAreas from "@/app/drafts/1/_sections/PracticeAreas"
import BusinessProfile from "@/app/drafts/1/_sections/BusinessProfile"
import Team from "@/app/drafts/1/_sections/Team"
import CtaBanner from "@/app/drafts/1/_sections/CtaBanner"
import Contacts from "@/app/drafts/1/_sections/Contacts"
import Footer from "@/app/drafts/1/_sections/Footer"
import ThemeProvider from "@/app/drafts/_theme/ThemeProvider"
import ColorSwitcher from "@/app/drafts/_theme/ColorSwitcher"

export const metadata: Metadata = {
  title: "Draft 1 — Editorial Prestige | LYS Law Firm",
  robots: { index: false, follow: false },
}

/**
 * Draft 1 page — default export required by Next.js App Router.
 * Static export safe (no server actions, no dynamic data fetching).
 */
export default function Draft1Page() {
  return (
    <ThemeProvider defaultScheme="d1-default" storageKey="lys-scheme-d1">
      <ColorSwitcher />
      <Hero />
      <PracticeAreas />
      <BusinessProfile />
      <Team />
      <CtaBanner />
      <Contacts />
      <Footer />
    </ThemeProvider>
  )
}

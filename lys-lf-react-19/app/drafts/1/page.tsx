/**
 * Draft 1: "Editorial Prestige" — page.tsx
 *
 * Composes all 7 sections in document order. No 'use client' needed here;
 * all sections are server components (no hooks or browser APIs at top level).
 * Interactive sub-components (Reveal, CountUpYear) carry their own "use client".
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
 */

import Hero from "@/app/drafts/1/_sections/Hero"
import PracticeAreas from "@/app/drafts/1/_sections/PracticeAreas"
import BusinessProfile from "@/app/drafts/1/_sections/BusinessProfile"
import Team from "@/app/drafts/1/_sections/Team"
import CtaBanner from "@/app/drafts/1/_sections/CtaBanner"
import Contacts from "@/app/drafts/1/_sections/Contacts"
import Footer from "@/app/drafts/1/_sections/Footer"

/**
 * Draft 1 page — default export required by Next.js App Router.
 * Static export safe (no server actions, no dynamic data fetching).
 */
export default function Draft1Page() {
  return (
    /*
      scrollBehavior:smooth enables CSS smooth scrolling for all anchor links
      (e.g., #contact, #practice-areas) without any JS scroll library.
      overflowX:hidden prevents any horizontal scroll from animated elements.
      backgroundColor:ivory so rendering gaps between sections fall back
      to ivory rather than the browser default white.
    */
    <div
      style={{
        backgroundColor: "#FBF8F1",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <Hero />
      <PracticeAreas />
      <BusinessProfile />
      <Team />
      <CtaBanner />
      <Contacts />
      <Footer />
    </div>
  )
}

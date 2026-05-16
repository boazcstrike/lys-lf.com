import Hero from "./_sections/Hero"
import PracticeAreas from "./_sections/PracticeAreas"
import BusinessProfile from "./_sections/BusinessProfile"
import Team from "./_sections/Team"
import CTABanner from "./_sections/CTABanner"
import Contacts from "./_sections/Contacts"
import Footer from "./_sections/Footer"

/**
 * Draft 2 — "Quiet Luxury"
 *
 * Design direction: calm boutique-prestige, premium restraint.
 * Palette: warm stone #EFEAE1 bg / deep forest green #1F3A2E primary /
 *          muted brass #A98B5D accent / warm charcoal #2B2622 text.
 * Fonts: Cormorant Garamond (headings) + Source Sans 3 (body).
 * All sections are server components — no "use client" needed here.
 */
export default function Draft2Page() {
  return (
    <div
      style={{
        backgroundColor: "#EFEAE1",
        color: "#2B2622",
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="min-h-screen antialiased"
    >
      {/* 1. Hero — serif headline + framed photo */}
      <Hero />

      {/* 2. Practice Areas — brass-bordered card grid */}
      <PracticeAreas />

      {/* 3. Business Profile — editorial text + photo collage */}
      <BusinessProfile />

      {/* 4. Team — portrait cards + typographic monograms */}
      <Team />

      {/* 5. CTA Banner — forest-green strip, "Have Legal Problems? Let's Talk." */}
      <CTABanner />

      {/* 6. Contacts — address, hours, phone, email, embedded map */}
      <Contacts />

      {/* 7. Footer — white logo + firm name + attribution */}
      <Footer />
    </div>
  )
}

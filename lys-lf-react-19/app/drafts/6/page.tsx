import type { Metadata } from "next"

import Hero from "./_sections/Hero"
import PracticeAreas from "./_sections/PracticeAreas"
import BusinessProfile from "./_sections/BusinessProfile"
import Team from "./_sections/Team"
import CtaBanner from "./_sections/CtaBanner"
import Contacts from "./_sections/Contacts"
import Footer from "./_sections/Footer"
import ScrollProgress from "./_components/ScrollProgress"
import FloatingNav from "./_components/FloatingNav"
import MobileNav from "./_components/MobileNav"
import ThemeProvider from "@/app/drafts/_theme/ThemeProvider"
import ColorSwitcher from "@/app/drafts/_theme/ColorSwitcher"

export const metadata: Metadata = {
  title: "Draft 6 — Kinetic Editorial | LYS Law Firm",
  robots: { index: false, follow: false },
}

/**
 * Draft 6 — "Kinetic Editorial"
 *
 * The most motion-forward of the six redesigns. Direction vs the others:
 *  - Draft 1 Editorial Prestige · 2 Minimal Corporate · 3 Dark
 *    Authoritative · 4 Heritage Traditional · 5 Swiss Architectural ·
 *    Actual site (static).
 *  - Draft 6 keeps the dark authority of #3 but layers scroll-driven
 *    parallax, staggered Reveal entrances, pointer-magnetic CTAs, a
 *    scroll-spy rail, a reading-progress bar, count-up stats, and a
 *    kinetic marquee.
 *
 * Palette: #000000 base · #14213d navy panels · #D2A24C amber-gold accent ·
 * #e5e5e5 / #ffffff text. The default accent is the restrained amber-gold
 * "Kinetic Amber" scheme (chosen for law-firm gravitas over the original
 * vibrant #fca311 orange, which remains selectable as "kinetic-orange").
 * Every interaction respects prefers-reduced-motion. All draft styling is
 * inline — globals/root layout untouched. scroll-behavior: smooth for
 * anchor + scroll-spy nav.
 *
 * Theme: defaultScheme="kinetic" (Kinetic Amber, #D2A24C) — storageKey
 * "lys-scheme-d6" lets the user switch to any of the shared luxury schemes.
 * Note: the "kinetic" accent token is defined in the shared
 * app/drafts/_theme/schemes.ts (outside this folder); this draft consumes
 * it via --d6-* custom properties and does not hard-code the hex.
 */
export default function Draft6Page() {
  return (
    <ThemeProvider defaultScheme="kinetic" storageKey="lys-scheme-d6">
      <ScrollProgress />
      <FloatingNav />
      <MobileNav />
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

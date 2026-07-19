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
 * Palette (requested): #000000 base · #14213d panels · #fca311 accent ·
 * #e5e5e5 / #ffffff text. Every interaction respects
 * prefers-reduced-motion. All styling inline — globals/root layout
 * untouched. scroll-behavior: smooth for anchor + scroll-spy nav.
 *
 * Theme: defaultScheme="kinetic" (Kinetic Orange) — storageKey "lys-scheme-d6"
 * allows the user to switch to any of the 7 shared luxury schemes.
 */
export default function Draft6Page() {
  return (
    <ThemeProvider defaultScheme="kinetic" storageKey="lys-scheme-d6">
      <ScrollProgress />
      <FloatingNav />
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

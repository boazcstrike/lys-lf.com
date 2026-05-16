import type { Metadata } from "next"
import HeroClient from "./_components/HeroClient"
import PracticeAreas from "./_sections/PracticeAreas"
import BusinessProfile from "./_sections/BusinessProfile"
import Team from "./_sections/Team"
import CtaBanner from "./_sections/CtaBanner"
import Contacts from "./_sections/Contacts"
import Footer from "./_sections/Footer"

export const metadata: Metadata = {
  title: "Draft 3 — Dark Authoritative | LYS Law Firm",
  robots: { index: false, follow: false },
}

/**
 * Draft 3: "Dark Authoritative"
 * Palette: near-black #0B0B0C, panels #141414, brass/gold #B08D57,
 * off-white #EDEDED, muted #9A9A9A.
 * Fonts: headings var(--font-cormorant), body var(--font-inter).
 * All styling inline — no changes to globals.css or root layout.
 * scroll-behavior: smooth applied here for anchor nav.
 */
export default function Draft3Page() {
  return (
    <div
      style={{
        backgroundColor: "#0B0B0C",
        color: "#EDEDED",
        fontFamily: "var(--font-inter)",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <HeroClient />
      <PracticeAreas />
      <BusinessProfile />
      <Team />
      <CtaBanner />
      <Contacts />
      <Footer />
    </div>
  )
}

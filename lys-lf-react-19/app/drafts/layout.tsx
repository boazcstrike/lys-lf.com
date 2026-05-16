import type { Metadata } from "next"
import {
  Playfair_Display,
  Source_Sans_3,
  Inter,
  Cormorant_Garamond,
  Libre_Baskerville,
  Lora,
  Space_Grotesk,
} from "next/font/google"
import React from "react"
import DraftSwitcher from "@/app/drafts/_components/draft-switcher"

/**
 * Font set shared across all 5 redesign drafts. Each draft picks the
 * CSS variables that match its direction. Root layout fonts stay untouched.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  // Drafts are internal previews — keep them out of search even if deployed.
  robots: { index: false, follow: false },
}

interface DraftsLayoutProps {
  children: React.ReactNode
}

export default function DraftsLayout({ children }: DraftsLayoutProps) {
  const fontVars = [
    playfair.variable,
    sourceSans.variable,
    inter.variable,
    cormorant.variable,
    libreBaskerville.variable,
    lora.variable,
    spaceGrotesk.variable,
  ].join(" ")

  return (
    <div className={fontVars}>
      {children}
      <DraftSwitcher />
    </div>
  )
}

/**
 * Draft 4 — Heritage Traditional default palette.
 *
 * All 17 tokens extracted EXACTLY from the current Draft 4 source files.
 * bg/text/heading: cream #F4EFE6 / dark-brown #3B2F2F
 * accent:          heritage gold #9C7A3C
 * panel:           near-black brown #1E1414 (footer)
 * hero scrim:      three stops from HeroSection gradient rgba(27,18,18,…)
 */

import type { Scheme } from "../schemes"

export const d4_DEFAULT: Scheme = {
  id: "d4-default",
  name: "Heritage Traditional (Default)",
  tokens: {
    // Page background — cream parchment
    bg: "#F4EFE6",
    // Dark feature panel — footer near-black brown
    panel: "#1E1414",
    // Heritage gold — ornamental dividers, labels, icon bg accent
    accent: "#9C7A3C",
    // Oxblood — original draft4 secondary: icon square bg, portrait frame, double-rule borders, contact links
    accent2: "#6B1F2A",
    // Text on gold-filled buttons — cream
    accentContrast: "#F4EFE6",
    // Main headings — dark brown
    heading: "#3B2F2F",
    // Body text — same dark brown
    text: "#3B2F2F",
    // Muted body — dark brown at 66% opacity
    muted: "rgba(59,47,47,0.66)",
    // Faint — dark brown at 40% opacity
    faint: "rgba(59,47,47,0.40)",
    // Hairline borders — warm parchment tan (card + info box borders)
    hair: "#C9B9A0",
    // Soft accent tint — gold at 16% (hover shadows, subtle fills)
    accentSoft: "rgba(156,122,60,0.16)",
    // Accent rule — gold at 50% (ornamental diamond lines)
    accentLine: "rgba(156,122,60,0.50)",
    // Hero overlay gradient — top stop (darkest)
    scrimTop: "rgba(27,18,18,0.84)",
    // Hero overlay gradient — mid stop
    scrimMid: "rgba(27,18,18,0.72)",
    // Hero overlay gradient — bottom stop
    scrimBot: "rgba(27,18,18,0.90)",
    // Image scrim for non-hero photo overlays — oxblood tint
    imgScrim: "rgba(107,31,42,0.40)",
    // Hero foreground text — cream (h1, CTA button label)
    heroText: "#F4EFE6",
    // Hero muted text — warm mid-tone (tagline, description)
    heroMuted: "#D9CFC2",
    // Guaranteed-dark structural band (Partners, Footer slabs)
    slab: "#1E1414",
    slabText: "#F4EFE6",
  },
}

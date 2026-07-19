/**
 * Draft 3 — Dark Authoritative default palette.
 *
 * Tokens extracted verbatim from draft-3 source files (page.tsx, HeroClient,
 * PracticeAreas, BusinessProfile, Team, CtaBanner, Contacts, Footer).
 * Must reproduce the original dark look exactly when selected as Default.
 */

import type { Scheme } from "../schemes"

export const d3_DEFAULT: Scheme = {
  id: "d3-default",
  name: "Dark Authoritative (Default)",
  tokens: {
    // Near-black page background — page.tsx root + HeroClient, CtaBanner, Footer, BusinessProfile
    bg: "#0B0B0C",
    // Dark panel — PracticeAreas, Team, Contacts section bg; monogram placeholder bg
    panel: "#141414",
    // Brass/gold — all accent elements throughout draft 3
    accent: "#B08D57",
    // Accent2 — same as accent for d3-default (no secondary accent distinction)
    accent2: "#B08D57",
    // Text on brass buttons — primary CTA text color
    accentContrast: "#0B0B0C",
    // Off-white headings — h1/h2/h3 color, firm name, page root color
    heading: "#EDEDED",
    // Body text — team bio (#E2E2E2) is the warmest body copy; page root inherits heading
    text: "#E2E2E2",
    // Muted body — tagline, paragraphs, address/hours, copyright (#9A9A9A)
    muted: "#9A9A9A",
    // Very faint tint — secondary button hover bg (rgba(176,141,87,0.08))
    faint: "rgba(176,141,87,0.08)",
    // Gold hairline borders — team role separator, BusinessProfile frame (0.2 alpha)
    hair: "rgba(176,141,87,0.20)",
    // Soft gold wash — PracticeAreas grid gap background
    accentSoft: "rgba(176,141,87,0.15)",
    // Gold border lines — CtaBanner inset border, Footer top border, photo frames (0.3)
    accentLine: "rgba(176,141,87,0.30)",
    // Hero gradient top stop — HeroClient linear-gradient 0%
    scrimTop: "rgba(11,11,12,0.60)",
    // Hero gradient mid stop — HeroClient linear-gradient 40%
    scrimMid: "rgba(11,11,12,0.78)",
    // Hero gradient bottom stop — HeroClient linear-gradient 100%
    scrimBot: "rgba(11,11,12,0.97)",
    // Image overlay scrim — not explicitly used in draft 3; closest analogue
    imgScrim: "rgba(0,0,0,0.72)",
    // Hero heading color — h1 in HeroClient
    heroText: "#EDEDED",
    // Hero tagline color — tagline p in HeroClient
    heroMuted: "#9A9A9A",
    // Guaranteed-dark structural band (Partners, Footer slabs)
    // #0B0B0C = exact original d3 Footer/CtaBanner bg => d3-default parity kept
    slab: "#0B0B0C",
    slabText: "#EDEDED",
  },
}

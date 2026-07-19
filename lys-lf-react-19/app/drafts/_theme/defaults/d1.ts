/**
 * Draft 1 — Editorial Prestige default palette.
 *
 * Tokens extracted from the EXACT current hex values in draft 1's
 * sections/components (Hero, PracticeAreas, BusinessProfile, Team,
 * CtaBanner, Contacts, Footer).
 *
 * Palette: ivory #FBF8F1 · navy #14213D · gold #C5A572 · charcoal #1A1A2E
 */

import type { Scheme } from "../schemes"

export const d1_DEFAULT: Scheme = {
  id: "d1-default",
  name: "Editorial Prestige (Default)",
  tokens: {
    // Ivory — page wrapper background, fallback between sections
    bg: "#FBF8F1",
    // Navy — dark section backgrounds (Hero right panel, BusinessProfile, CtaBanner overlay, Footer)
    panel: "#14213D",
    // Gold — all accent uses: eyebrow labels, hairline rules, icons, CTA fill, borders
    accent: "#C5A572",
    // Accent2 — same as accent for d1-default (no secondary accent distinction)
    accent2: "#C5A572",
    // Navy — text on gold-filled buttons (solid CTA: color #14213D on #C5A572 bg)
    accentContrast: "#14213D",
    // Navy — headings on ivory sections (PracticeAreas h2/h3, Team h2, Contacts h2)
    heading: "#14213D",
    // Charcoal — body text on ivory sections (DetailRow content, contact links)
    text: "#1A1A2E",
    // Charcoal 72% — section intro paragraphs on ivory (PracticeAreas description, Team intro)
    muted: "rgba(26,26,46,0.72)",
    // Charcoal 40% — faint secondary labels on ivory
    faint: "rgba(26,26,46,0.40)",
    // Gold 35% — decorative hairline in Team section role divider (opacity: 0.35)
    hair: "rgba(197,165,114,0.35)",
    // Gold 6% — associate card hover background tint
    accentSoft: "rgba(197,165,114,0.06)",
    // Gold 50% — practice card hover outline + accentLine usage
    accentLine: "rgba(197,165,114,0.5)",
    // Transparent — top stop of hero photo-to-navy gradient (mobile: from transparent 38%)
    scrimTop: "rgba(20,33,61,0)",
    // Navy 55% — mid stop of desktop hero right-edge gradient fade
    scrimMid: "rgba(20,33,61,0.55)",
    // Navy 100% — bottom stop of mobile hero photo gradient (solid navy)
    scrimBot: "rgba(20,33,61,1)",
    // Navy 86% — CTA banner full-bleed photo overlay (opacity: 0.86)
    imgScrim: "rgba(20,33,61,0.86)",
    // Ivory — text on dark/photo panels (Hero h1, BusinessProfile body, Footer firm name)
    heroText: "#FBF8F1",
    // Ivory 85% — secondary text on dark panels (Hero tagline at opacity 0.85)
    heroMuted: "rgba(251,248,241,0.85)",
    // Guaranteed-dark structural band (Partners, Footer slabs)
    slab: "#14213D",
    slabText: "#FBF8F1",
  },
}

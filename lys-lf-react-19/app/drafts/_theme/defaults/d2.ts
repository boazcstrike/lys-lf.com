/**
 * Draft 2 — "Quiet Luxury" default palette.
 *
 * Tokens mapped from Draft 2's EXACT current hex values:
 *   GREEN   #1F3A2E  — deep forest green (headings, accented text, dark bg)
 *   BRASS   #A98B5D  — muted brass (accent, hairlines, labels)
 *   CHARCOAL #2B2622 — warm charcoal (body text)
 *   STONE   #EFEAE1  — warm stone (page background, card backgrounds)
 *   PANEL   #F6F2EA  — warm off-white (alternate section bg, button bg on green)
 *
 * Token mapping rationale:
 *   bg           → STONE  (page wrapper bg: "#EFEAE1")
 *   panel        → GREEN  (dark sections: CTABanner bg, Footer bg "#1F3A2E")
 *   accent       → BRASS  ("#A98B5D" — hairlines, labels, icon color)
 *   accentContrast → GREEN ("#1F3A2E" — text on brass buttons e.g. Send an Email)
 *   heading      → GREEN  ("#1F3A2E" — all Cormorant headings)
 *   text         → CHARCOAL ("#2B2622" — body copy color: CHARCOAL)
 *   muted        → CHARCOAL@73% ("rgba(43,38,34,0.73)" — ${CHARCOAL}bb ≈ 0xbb/0xff)
 *   faint        → CHARCOAL@60% ("rgba(43,38,34,0.60)" — ${CHARCOAL}99 ≈ 0x99/0xff)
 *   hair         → BRASS@20%   ("rgba(169,139,93,0.20)" — ${BRASS}33 ≈ 0x33/0xff)
 *   accentSoft   → BRASS@8%    ("rgba(169,139,93,0.08)" — card hover shadow basis)
 *   accentLine   → BRASS@33%   ("rgba(169,139,93,0.33)" — ${BRASS}55 ≈ 0x55/0xff)
 *   scrimTop     → green shadow ("rgba(31,58,46,0.14)" — photo shadow top value)
 *   scrimMid     → green shadow ("rgba(31,58,46,0.10)" — collage shadow value)
 *   scrimBot     → green shadow ("rgba(31,58,46,0.08)" — contacts map shadow)
 *   imgScrim     → green shadow ("rgba(31,58,46,0.14)" — hero photo shadow)
 *   heroText     → PANEL  ("#F6F2EA" — text on green dark sections)
 *   heroMuted    → PANEL@40% ("rgba(246,242,234,0.40)" — ${PANEL}66 ≈ 0x66/0xff)
 *
 * NOTE: Draft 2 has no hero photo with scrim overlays — the scrim tokens are
 * mapped to the green-tinted shadow values used in the photo frames. They are
 * gap tokens; reported in REPORT section of commit.
 */

import type { Scheme } from "../schemes"

export const d2_DEFAULT: Scheme = {
  id: "d2-default",
  name: "Minimal Corporate (Default)",
  tokens: {
    bg: "#EFEAE1",
    panel: "#1F3A2E",
    accent: "#A98B5D",
    accent2: "#A98B5D",
    accentContrast: "#1F3A2E",
    heading: "#1F3A2E",
    text: "#2B2622",
    muted: "rgba(43,38,34,0.73)",
    faint: "rgba(43,38,34,0.60)",
    hair: "rgba(169,139,93,0.20)",
    accentSoft: "rgba(169,139,93,0.08)",
    accentLine: "rgba(169,139,93,0.33)",
    scrimTop: "rgba(31,58,46,0.14)",
    scrimMid: "rgba(31,58,46,0.10)",
    scrimBot: "rgba(31,58,46,0.08)",
    imgScrim: "rgba(31,58,46,0.14)",
    heroText: "#F6F2EA",
    // FIX 3: raised from 0.40 -> 0.78 for AA contrast on dark-green footer panel
    heroMuted: "rgba(246,242,234,0.78)",
    // Guaranteed-dark structural band (Partners, Footer slabs)
    slab: "#1F3A2E",
    slabText: "#F6F2EA",
  },
}

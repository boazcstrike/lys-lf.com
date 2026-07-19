/**
 * Draft 5 — Swiss Architectural default palette.
 *
 * Exact hex values extracted from the original draft 5 source files.
 * Palette: #FFFFFF bg | #0A0A0A structure/text | #D72638 accent (red) | #F2F2F2 panel (LIGHT)
 *
 * NOTE — hair token:
 *   Draft 5 uses opaque 1px solid #0A0A0A structural rules throughout.
 *   So hair = "#0A0A0A" (fully opaque) in the d5-default. When switching to
 *   luxury dark schemes, those schemes supply their own hair token (typically
 *   a semi-transparent white) which is intentional — scheme changes alter the look.
 *
 * NOTE — panel token:
 *   In d5-default, panel = #F2F2F2 (light grey) — used for BusinessProfile and
 *   Contacts light-grey sections, and Team InitialsBlock backgrounds.
 *   Other/luxury schemes define panel as a dark slab; switching is intentional.
 *
 * NOTE — muted / faint:
 *   Draft 5 uses inline opacity (0.65–0.72 for body, 0.35–0.45 for eyebrow labels)
 *   applied on top of #0A0A0A text. The muted/faint tokens encode those midpoints.
 */

import type { Scheme } from "../schemes"

export const d5_DEFAULT: Scheme = {
  id: "d5-default",
  name: "Swiss Architectural (Default)",
  tokens: {
    // Page background — pure white
    bg: "#FFFFFF",
    // Panel — light grey (#F2F2F2): BusinessProfile, Contacts left col, Team initials
    panel: "#F2F2F2",
    // Accent — Swiss red
    accent: "#D72638",
    // Accent2 — same as accent for d5-default (no secondary accent distinction)
    accent2: "#D72638",
    // Text on red (CTA banner buttons, LYS badge, accentContrast buttons)
    accentContrast: "#FFFFFF",
    // Headings — near-black structural ink
    heading: "#0A0A0A",
    // Body text — near-black (sections apply opacity over this)
    text: "#0A0A0A",
    // Muted body text (opacity ~0.65–0.72 range midpoint on #0A0A0A)
    muted: "rgba(10,10,10,0.68)",
    // Faint eyebrow / label text (opacity ~0.35–0.45 range midpoint on #0A0A0A)
    faint: "rgba(10,10,10,0.40)",
    // Structural lines — OPAQUE black (draft 5 uses 1px solid #0A0A0A everywhere)
    hair: "#0A0A0A",
    // Accent soft tint — red at very low opacity for backgrounds/highlight
    accentSoft: "rgba(215,38,56,0.10)",
    // Accent line — red at mid opacity for borders
    accentLine: "rgba(215,38,56,0.40)",
    // Scrims — for photo overlays (Hero right panel dark overlay)
    scrimTop: "rgba(10,10,10,0.18)",
    scrimMid: "rgba(10,10,10,0.30)",
    scrimBot: "rgba(10,10,10,0.60)",
    // Image scrim — Hero photo overlay (original: rgba(10,10,10,0.18))
    imgScrim: "rgba(10,10,10,0.18)",
    // Text on photos — white labels on Hero photo block
    heroText: "#FFFFFF",
    // Faint text on photos — white at 0.6 opacity (photo location label)
    heroMuted: "rgba(255,255,255,0.60)",
    // Guaranteed-dark structural band (Partners, Footer slabs)
    // d5-default: exact parity with original #0A0A0A hardcodes — no visual change
    slab: "#0A0A0A",
    slabText: "#FFFFFF",
  },
}

/**
 * Shared color-scheme engine — usable by every draft.
 *
 * SchemeId  — union of the 8 luxury ids + 5 draft-default ids.
 * SCHEMES   — all 13 scheme objects (8 luxury + 5 draft defaults).
 * SHARED_SWITCH_LIST — the 8 luxury ids in canonical order.
 * offeredFor(defaultId) — [defaultId, ...SHARED_SWITCH_LIST] deduped.
 * schemeCssVars(id) — inline React.CSSProperties of --d6-* vars.
 * TOKEN_TO_CSS_VAR — token key → CSS custom property name map.
 */

import type React from "react"
import { DRAFT_DEFAULTS } from "./defaults"

// ---------------------------------------------------------------------------
// Token shape
// ---------------------------------------------------------------------------

export interface SchemeTokens {
  bg: string
  panel: string
  /** Decorative accent — hairlines, borders, icons, CTA fills, swatches. */
  accent: string
  accent2: string
  /**
   * Optional text-safe accent for SMALL accent-coloured copy (eyebrow labels,
   * ~10-12px uppercase) on the scheme's light background. Decorative golds can
   * fall below WCAG AA (4.5:1) as label text; set this to a darker, AA-passing
   * variant of the accent hue. Falls back to `accent` when omitted (dark-bg
   * schemes where the accent already clears AA as text). The decorative `accent`
   * is intentionally left untouched so borders/fills keep their brightness.
   */
  accentText?: string
  accentContrast: string
  heading: string
  text: string
  muted: string
  faint: string
  hair: string
  accentSoft: string
  accentLine: string
  scrimTop: string
  scrimMid: string
  scrimBot: string
  imgScrim: string
  heroText: string
  heroMuted: string
  /** Guaranteed-dark structural band background (Partners, Footer slabs). */
  slab: string
  /** Light text colour for use on `slab` backgrounds. */
  slabText: string
}

export interface Scheme {
  id: SchemeId
  name: string
  tokens: SchemeTokens
}

// ---------------------------------------------------------------------------
// SchemeId union — 7 luxury + 5 draft-default identifiers
// ---------------------------------------------------------------------------

export type SchemeId =
  // Luxury shared schemes
  | "editorial"
  | "dark-authoritative"
  | "platinum-noir"
  | "sterling-mist"
  | "onyx-champagne"
  | "royal-navy-gold"
  | "kinetic"
  | "kinetic-orange"
  // Per-draft default identifiers
  | "d1-default"
  | "d2-default"
  | "d3-default"
  | "d4-default"
  | "d5-default"

// ---------------------------------------------------------------------------
// Luxury scheme definitions — EXACT hex from draft-6/theme.ts
// ---------------------------------------------------------------------------

const LUXURY_SCHEMES: readonly Scheme[] = [
  {
    id: "editorial",
    name: "Editorial Prestige",
    tokens: {
      bg: "#FBF8F1",
      panel: "#14213D",
      accent: "#C5A572",
      accent2: "#C5A572",
      // Deep bronze-gold for label text on ivory/stone: ~5.6:1 vs #FBF8F1
      // (decorative #C5A572 is only ~2.2:1 and fails AA at small sizes).
      accentText: "#7C5E2E",
      accentContrast: "#1A1A2E",
      heading: "#14213D",
      text: "#2A2A33",
      muted: "rgba(26,26,46,0.66)",
      faint: "rgba(26,26,46,0.40)",
      hair: "rgba(20,33,61,0.16)",
      accentSoft: "rgba(197,165,114,0.16)",
      accentLine: "rgba(197,165,114,0.5)",
      scrimTop: "rgba(10,12,20,0.45)",
      scrimMid: "rgba(20,33,61,0.55)",
      scrimBot: "rgba(8,10,16,0.94)",
      imgScrim: "rgba(20,33,61,0.72)",
      heroText: "#FBF8F1",
      heroMuted: "rgba(251,248,241,0.72)",
      slab: "#14213D",
      slabText: "#FBF8F1",
    },
  },
  {
    id: "dark-authoritative",
    name: "Dark Authoritative",
    tokens: {
      bg: "#0B0B0C",
      panel: "#141414",
      accent: "#B08D57",
      accent2: "#B08D57",
      accentContrast: "#0B0B0C",
      heading: "#EDEDED",
      text: "#D7D7D7",
      muted: "rgba(237,237,237,0.62)",
      faint: "rgba(237,237,237,0.32)",
      hair: "rgba(255,255,255,0.10)",
      accentSoft: "rgba(176,141,87,0.16)",
      accentLine: "rgba(176,141,87,0.45)",
      scrimTop: "rgba(0,0,0,0.5)",
      scrimMid: "rgba(11,11,12,0.55)",
      scrimBot: "rgba(0,0,0,0.96)",
      imgScrim: "rgba(0,0,0,0.72)",
      heroText: "#EDEDED",
      heroMuted: "rgba(237,237,237,0.66)",
      slab: "#141414",
      slabText: "#EDEDED",
    },
  },
  {
    id: "platinum-noir",
    name: "Platinum Noir",
    tokens: {
      bg: "#0A0A0B",
      panel: "#1A1C1F",
      accent: "#C7CCD1",
      accent2: "#C7CCD1",
      accentContrast: "#0A0A0B",
      heading: "#F1F3F5",
      text: "#D6DADE",
      muted: "rgba(232,234,237,0.60)",
      faint: "rgba(232,234,237,0.30)",
      hair: "rgba(255,255,255,0.10)",
      accentSoft: "rgba(199,204,209,0.14)",
      accentLine: "rgba(199,204,209,0.45)",
      scrimTop: "rgba(0,0,0,0.5)",
      scrimMid: "rgba(10,10,11,0.55)",
      scrimBot: "rgba(0,0,0,0.96)",
      imgScrim: "rgba(0,0,0,0.70)",
      heroText: "#F1F3F5",
      heroMuted: "rgba(241,243,245,0.65)",
      slab: "#1A1C1F",
      slabText: "#F1F3F5",
    },
  },
  {
    id: "sterling-mist",
    name: "Sterling Mist",
    tokens: {
      bg: "#F4F5F7",
      panel: "#1C2530",
      accent: "#5E6B7A",
      accent2: "#5E6B7A",
      accentContrast: "#FFFFFF",
      heading: "#1C2530",
      text: "#2C3540",
      muted: "rgba(28,37,48,0.62)",
      faint: "rgba(28,37,48,0.38)",
      hair: "rgba(28,37,48,0.16)",
      accentSoft: "rgba(110,123,138,0.16)",
      accentLine: "rgba(110,123,138,0.5)",
      scrimTop: "rgba(10,14,20,0.42)",
      scrimMid: "rgba(28,37,48,0.55)",
      scrimBot: "rgba(10,14,20,0.92)",
      imgScrim: "rgba(28,37,48,0.70)",
      heroText: "#F4F5F7",
      heroMuted: "rgba(244,245,247,0.72)",
      slab: "#1C2530",
      slabText: "#F4F5F7",
    },
  },
  {
    id: "onyx-champagne",
    name: "Onyx & Champagne",
    tokens: {
      bg: "#0C0A07",
      panel: "#1A150E",
      accent: "#D4AF37",
      accent2: "#D4AF37",
      accentContrast: "#0C0A07",
      heading: "#F2EDE3",
      text: "#DAD2C2",
      muted: "rgba(242,237,227,0.60)",
      faint: "rgba(242,237,227,0.30)",
      hair: "rgba(212,175,55,0.16)",
      accentSoft: "rgba(212,175,55,0.14)",
      accentLine: "rgba(212,175,55,0.45)",
      scrimTop: "rgba(0,0,0,0.5)",
      scrimMid: "rgba(12,10,7,0.6)",
      scrimBot: "rgba(0,0,0,0.96)",
      imgScrim: "rgba(0,0,0,0.72)",
      heroText: "#F2EDE3",
      heroMuted: "rgba(242,237,227,0.66)",
      slab: "#1A150E",
      slabText: "#F2EDE3",
    },
  },
  {
    id: "royal-navy-gold",
    name: "Royal Navy Gold",
    tokens: {
      bg: "#0B1A2F",
      panel: "#112844",
      accent: "#CBA14A",
      accent2: "#CBA14A",
      accentContrast: "#0B1A2F",
      heading: "#F0EBDF",
      text: "#D8D2C4",
      muted: "rgba(240,235,223,0.62)",
      faint: "rgba(240,235,223,0.32)",
      hair: "rgba(203,161,74,0.18)",
      accentSoft: "rgba(203,161,74,0.14)",
      accentLine: "rgba(203,161,74,0.45)",
      scrimTop: "rgba(4,10,20,0.5)",
      scrimMid: "rgba(11,26,47,0.6)",
      scrimBot: "rgba(3,7,14,0.95)",
      imgScrim: "rgba(4,10,20,0.72)",
      heroText: "#F0EBDF",
      heroMuted: "rgba(240,235,223,0.66)",
      slab: "#112844",
      slabText: "#F0EBDF",
    },
  },
  {
    // DEFAULT kinetic identity — restrained amber-gold replaces the vibrant
    // orange for law-firm gravitas. The original orange is preserved verbatim
    // as the separate "kinetic-orange" scheme below (non-destructive), so it
    // stays selectable. Keeping this id as "kinetic" leaves every draft's
    // defaultScheme wiring (e.g. draft 6) untouched.
    id: "kinetic",
    name: "Kinetic Amber",
    tokens: {
      bg: "#000000",
      panel: "#14213d",
      accent: "#D2A24C",
      accent2: "#D2A24C",
      accentContrast: "#000000",
      heading: "#ffffff",
      text: "#e5e5e5",
      muted: "rgba(229,229,229,0.62)",
      faint: "rgba(229,229,229,0.32)",
      hair: "rgba(255,255,255,0.12)",
      accentSoft: "rgba(210,162,76,0.14)",
      accentLine: "rgba(210,162,76,0.45)",
      scrimTop: "rgba(0,0,0,0.45)",
      scrimMid: "rgba(20,33,61,0.55)",
      scrimBot: "rgba(0,0,0,0.96)",
      imgScrim: "rgba(0,0,0,0.72)",
      heroText: "#ffffff",
      heroMuted: "rgba(229,229,229,0.62)",
      slab: "#14213D",
      slabText: "#FFFFFF",
    },
  },
  {
    // Original vibrant-orange kinetic accent, preserved as an opt-in option.
    id: "kinetic-orange",
    name: "Kinetic Orange",
    tokens: {
      bg: "#000000",
      panel: "#14213d",
      accent: "#fca311",
      accent2: "#fca311",
      accentContrast: "#000000",
      heading: "#ffffff",
      text: "#e5e5e5",
      muted: "rgba(229,229,229,0.62)",
      faint: "rgba(229,229,229,0.32)",
      hair: "rgba(255,255,255,0.12)",
      accentSoft: "rgba(252,163,17,0.14)",
      accentLine: "rgba(252,163,17,0.45)",
      scrimTop: "rgba(0,0,0,0.45)",
      scrimMid: "rgba(20,33,61,0.55)",
      scrimBot: "rgba(0,0,0,0.96)",
      imgScrim: "rgba(0,0,0,0.72)",
      heroText: "#ffffff",
      heroMuted: "rgba(229,229,229,0.62)",
      slab: "#14213D",
      slabText: "#FFFFFF",
    },
  },
]

// ---------------------------------------------------------------------------
// Full scheme registry
// ---------------------------------------------------------------------------

export const SCHEMES: readonly Scheme[] = [
  ...LUXURY_SCHEMES,
  ...DRAFT_DEFAULTS,
]

// ---------------------------------------------------------------------------
// CSS variable map — token key → --d6-* custom property name
// NOTE: The "--d6-" prefix is a cosmetic legacy from draft 6. It is shared
// across all drafts intentionally. Do NOT rename — would regress draft-6.
// ---------------------------------------------------------------------------

export const TOKEN_TO_CSS_VAR: Record<keyof SchemeTokens, string> = {
  bg: "--d6-bg",
  panel: "--d6-panel",
  accent: "--d6-accent",
  accent2: "--d6-accent2",
  accentText: "--d6-accent-text",
  accentContrast: "--d6-accent-contrast",
  heading: "--d6-heading",
  text: "--d6-text",
  muted: "--d6-muted",
  faint: "--d6-faint",
  hair: "--d6-hair",
  accentSoft: "--d6-accent-soft",
  accentLine: "--d6-accent-line",
  scrimTop: "--d6-scrim-top",
  scrimMid: "--d6-scrim-mid",
  scrimBot: "--d6-scrim-bot",
  imgScrim: "--d6-img-scrim",
  heroText: "--d6-hero-text",
  heroMuted: "--d6-hero-muted",
  slab: "--d6-slab",
  slabText: "--d6-slab-text",
}

/**
 * Returns an inline-style React.CSSProperties object of --d6-* custom
 * properties for the given scheme id.  Spread directly on a container's
 * `style` prop.
 *
 * @example
 * <div style={{ ...schemeCssVars("kinetic") }} />
 */
export function schemeCssVars(id: SchemeId): React.CSSProperties {
  // SCHEMES always contains at least 7 entries; fallback to first for safety.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const scheme = (SCHEMES.find((s) => s.id === id) ?? SCHEMES[0])!
  const tokens = scheme.tokens as SchemeTokens

  const vars: React.CSSProperties = {}

  for (const key of Object.keys(TOKEN_TO_CSS_VAR) as Array<keyof SchemeTokens>) {
    const value = tokens[key]
    // Optional tokens (e.g. accentText) may be undefined — skip here and
    // resolve their fallback explicitly below so no `undefined` leaks into
    // the inline no-FOUC script's JSON payload.
    if (value === undefined) continue
    const cssVar = TOKEN_TO_CSS_VAR[key]
    // React's CSSProperties allows custom property assignment via index
    ;(vars as Record<string, string>)[cssVar] = value
  }

  // Text-safe accent: schemes that omit `accentText` (dark backgrounds where
  // the decorative accent already clears WCAG AA as label text) fall back to
  // the accent itself, so --d6-accent-text is always defined for consumers.
  ;(vars as Record<string, string>)[TOKEN_TO_CSS_VAR.accentText] =
    tokens.accentText ?? tokens.accent

  return vars
}

// ---------------------------------------------------------------------------
// Switchable list — 7 luxury ids in canonical order
// ---------------------------------------------------------------------------

export const SHARED_SWITCH_LIST: SchemeId[] = [
  "editorial",
  "dark-authoritative",
  "platinum-noir",
  "sterling-mist",
  "onyx-champagne",
  "royal-navy-gold",
  "kinetic",
  "kinetic-orange",
]

/**
 * Returns the ordered list of scheme ids offered by a draft's switcher.
 * The draft's own default is always first; the 7 luxury schemes follow
 * (deduped — so "kinetic" is not listed twice when defaultId === "kinetic").
 */
export function offeredFor(defaultId: SchemeId): SchemeId[] {
  const seen = new Set<SchemeId>([defaultId])
  const result: SchemeId[] = [defaultId]
  for (const id of SHARED_SWITCH_LIST) {
    if (!seen.has(id)) {
      seen.add(id)
      result.push(id)
    }
  }
  return result
}

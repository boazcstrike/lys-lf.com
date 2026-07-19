/**
 * Draft 6 — local theme constants.
 *
 * MOTION and FONT are stable exports consumed by all sections and components
 * in this draft.
 *
 * Color-scheme API (SchemeId, Scheme, SCHEMES, schemeCssVars, etc.) has been
 * moved to the shared module at app/drafts/_theme/schemes.ts.
 * Re-exported here for backward-compatibility with any remaining local imports.
 */

// ---------------------------------------------------------------------------
// Motion & Typography (owned by draft-6 section/component code)
// ---------------------------------------------------------------------------

/** Motion constants — one rhythm across the whole draft. */
export const MOTION = {
  /** micro-interaction (hover / press) */
  fast: "180ms",
  /** standard enter/exit */
  base: "320ms",
  /** larger spatial reveals */
  slow: "560ms",
  /** ease-out for enters */
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** gentle spring for press feedback */
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const

export const FONT = {
  display: "var(--font-playfair)",
  body: "var(--font-inter)",
  mono: "var(--font-space-grotesk)",
} as const

// ---------------------------------------------------------------------------
// Scheme API re-export — back-compat for any local import of the old shape
// ---------------------------------------------------------------------------

export * from "@/app/drafts/_theme/schemes"

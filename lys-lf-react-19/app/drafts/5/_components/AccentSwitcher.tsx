"use client"

/**
 * AccentSwitcher — dev-only toggle for draft 5's accent family (Navy & Gold vs
 * Swiss Red). Mirrors ColorSwitcher's dev-only gate: it compiles to `return
 * null` in production (process.env.NODE_ENV is statically inlined by Next), so
 * the control never ships.
 *
 * Hidden whenever a non-default (luxury) scheme is active, since the accent
 * override does not apply there. Fixed top-left; does not collide with
 * ColorSwitcher (bottom-left), draft-switcher (bottom-center), or the
 * back-to-top button (bottom-right).
 */

import { ACCENTS, useAccent, type AccentId } from "./AccentProvider"

export default function AccentSwitcher() {
  if (process.env.NODE_ENV !== "development") return null
  return <AccentSwitcherPanel />
}

function AccentSwitcherPanel() {
  const { accent, setAccent, active } = useAccent()

  // Override is inert on luxury schemes — hide the control there.
  if (!active) return null

  const ids = Object.keys(ACCENTS) as AccentId[]

  return (
    <div
      role="group"
      aria-label="Accent colour"
      style={{
        position: "fixed",
        top: "1.25rem",
        left: "1.25rem",
        zIndex: 1100,
        display: "flex",
        gap: "0.375rem",
        padding: "0.375rem",
        background: "var(--d6-panel)",
        border: "1px solid var(--d6-hair)",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      }}
    >
      {ids.map((id) => {
        const def = ACCENTS[id]
        const isActive = id === accent
        return (
          <button
            key={id}
            type="button"
            onClick={() => setAccent(id)}
            aria-pressed={isActive}
            title={def.name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              minHeight: "36px",
              padding: "0.35rem 0.6rem",
              cursor: "pointer",
              borderRadius: "0.375rem",
              border: isActive
                ? "1px solid var(--d6-heading)"
                : "1px solid transparent",
              background: isActive ? "rgba(0,0,0,0.05)" : "transparent",
              color: "var(--d6-text)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "0.9rem",
                height: "0.9rem",
                borderRadius: "50%",
                background: def.accent,
                border: "1.5px solid rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}
            />
            {def.name}
          </button>
        )
      })}
    </div>
  )
}

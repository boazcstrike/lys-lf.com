"use client"

/**
 * Shared ColorSwitcher — always-visible floating colour-scheme selector.
 *
 * Position: fixed bottom-left (left 1.25rem, bottom 1.5rem, z 1100).
 * Does NOT collide with:
 *   - Draft-switcher  → bottom-center
 *   - Back-to-top btn → bottom-right
 *   - FloatingNav     → right edge, vertical mid
 *
 * UX: collapsed = 46 px round button (palette icon + accent ring).
 *      Click → vertical popover panel above the button listing all schemes.
 *      The draft's own default scheme is shown first with a "Default" badge.
 *      Selecting a scheme calls setScheme and keeps panel open for preview.
 *      Esc or button-click closes.
 *
 * Accessibility (WCAG 2.2 AA / APG listbox pattern):
 *   - aria-haspopup="listbox" + aria-expanded on trigger
 *   - role="listbox" + aria-activedescendant on panel (tabIndex=0)
 *   - role="option" + aria-selected + unique id on each row
 *   - Keyboard: ArrowDown/Up, Home/End move cursor; Enter/Space selects; Esc closes
 *   - Focus indicators via CSS :focus-visible only (no DOM mutation)
 *   - Active-descendant highlighted via .cs-opt-active class
 *   - aria-live="polite" status region announces selection changes
 *   - Min 44 px tap targets; names + swatch (not colour-only)
 *
 * Reduced-motion: panel animation and option background transition disabled
 *   when prefers-reduced-motion is active.
 *
 * Styling: --d6-* CSS custom properties so the switcher reflects the
 *   currently active scheme regardless of which draft is hosting it.
 *
 * Dev-only: this floating picker is a design tool and must never ship in a
 *   production bundle. The default export gates on `process.env.NODE_ENV`
 *   (statically inlined by Next at build time), mirroring
 *   `_components/draft-switcher.tsx`. In `next build` the gate becomes
 *   `return null` and the hook-using implementation is tree-shaken out.
 */

import { useEffect, useRef, useState } from "react"
import { useScheme } from "./ThemeProvider"
import type { SchemeId } from "./ThemeProvider"

/* ------------------------------------------------------------------ */
/* Swatch helper                                                        */
/* ------------------------------------------------------------------ */

function Swatch({ bg, accent }: { bg: string; accent: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        width: "1.25rem",
        height: "1.25rem",
        borderRadius: "50%",
        background: bg,
        border: "1.5px solid rgba(255,255,255,0.18)",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent dot occupies bottom-right quadrant */}
      <span
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "50%",
          height: "50%",
          background: accent,
          borderTopLeftRadius: "50%",
        }}
      />
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Palette icon SVG                                                     */
/* ------------------------------------------------------------------ */

function PaletteIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.423-.162-.813-.435-1.101a1.667 1.667 0 0 1 1.22-2.815H16c3.314 0 6-2.686 6-6C22 6.477 17.523 2 12 2z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* ColorSwitcher                                                        */
/* ------------------------------------------------------------------ */

/**
 * Dev-only gate. Renders nothing outside `next dev`. Because
 * `process.env.NODE_ENV` is statically inlined at build time, this compiles to
 * `return null` in production and `ColorSwitcherPanel` (with all its hooks)
 * is tree-shaken out of the bundle. Keeping the hooks in the child component
 * avoids a conditional-hooks lint violation in the gate itself.
 */
export default function ColorSwitcher() {
  if (process.env.NODE_ENV !== "development") return null
  return <ColorSwitcherPanel />
}

function ColorSwitcherPanel() {
  const { scheme, setScheme, schemes, defaultScheme } = useScheme()
  const [open, setOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // APG listbox: visual cursor (active-descendant), init to current scheme.
  const [activeOptionId, setActiveOptionId] = useState<SchemeId>(scheme)

  // Announce selection changes to screen readers. Empty string on mount
  // so no announcement fires until the user makes a deliberate change.
  const [announcement, setAnnouncement] = useState("")

  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  /* Detect reduced-motion once on mount, update on OS change */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  /* Sync active-descendant cursor to current scheme whenever panel opens */
  useEffect(() => {
    if (open) {
      setActiveOptionId(scheme)
    }
  }, [open, scheme])

  /* Focus the listbox div when panel opens so keyboard works immediately */
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      panelRef.current?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  /* Commit a scheme selection and announce to screen readers */
  function commitSelection(id: SchemeId) {
    setScheme(id)
    const name = schemes.find((s) => s.id === id)?.name ?? id
    setAnnouncement(`${name} colour scheme`)
  }

  /* ── APG listbox keyboard handler ── */
  function handleListboxKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const ids: SchemeId[] = schemes.map((s) => s.id)
    const last = ids.length - 1
    const currentIndex = ids.indexOf(activeOptionId)

    // Safe indexed access — ids is non-empty (schemes always has entries).
    const at = (i: number): SchemeId => ids[i] as SchemeId

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault()
        setActiveOptionId(at(Math.min(currentIndex + 1, last)))
        break
      }
      case "ArrowUp": {
        e.preventDefault()
        setActiveOptionId(at(Math.max(currentIndex - 1, 0)))
        break
      }
      case "Home": {
        e.preventDefault()
        setActiveOptionId(at(0))
        break
      }
      case "End": {
        e.preventDefault()
        setActiveOptionId(at(last))
        break
      }
      case "Enter":
      case " ": {
        e.preventDefault()
        commitSelection(activeOptionId)
        break
      }
      case "Escape": {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
      }
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        left: "1.25rem",
        bottom: "1.5rem",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5rem",
      }}
    >
      {/* ── Scoped styles: focus-visible rings, active-descendant highlight ── */}
      <style>{`
        @keyframes shared-cs-enter {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        .cs-trigger:focus-visible {
          box-shadow: 0 0 0 2px var(--d6-accent);
          outline: none;
        }
        .cs-listbox:focus-visible {
          outline: 2px solid var(--d6-accent);
          outline-offset: 2px;
        }
        .cs-opt[aria-selected="true"] {
          background: rgba(255,255,255,0.07);
        }
        .cs-listbox:focus-visible .cs-opt-active {
          box-shadow: inset 0 0 0 2px var(--d6-accent);
        }
      `}</style>

      {/* ── Visually-hidden live region — announces selection to screen readers ── */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {announcement}
      </span>

      {/* ── Popover panel (above the trigger button) ── */}
      {open && (
        <div
          ref={panelRef}
          role="listbox"
          className="cs-listbox"
          tabIndex={0}
          aria-label="Colour schemes"
          aria-orientation="vertical"
          aria-activedescendant={`cs-opt-${activeOptionId}`}
          onKeyDown={handleListboxKeyDown}
          style={{
            background: "var(--d6-panel)",
            border: "1px solid var(--d6-hair)",
            borderRadius: "0.75rem",
            padding: "0.375rem 0",
            minWidth: "14rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            animation: reducedMotion
              ? "none"
              : "shared-cs-enter 220ms cubic-bezier(0.16,1,0.3,1) both",
            transformOrigin: "bottom left",
            outline: "none",
          }}
        >
          {schemes.map((s) => {
            const isActive = s.id === scheme
            const isDefault = s.id === defaultScheme
            const isCursor = s.id === activeOptionId
            return (
              <div
                key={s.id}
                id={`cs-opt-${s.id}`}
                role="option"
                aria-selected={isActive}
                className={`cs-opt${isCursor ? " cs-opt-active" : ""}`}
                onClick={() => commitSelection(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  width: "calc(100% - 0.5rem)",
                  padding: "0.5rem 0.875rem",
                  cursor: "pointer",
                  color: "var(--d6-text)",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.02em",
                  textAlign: "left",
                  minHeight: "44px",
                  borderRadius: "0.375rem",
                  margin: "0 0.25rem",
                  transition: reducedMotion ? "none" : "background 160ms ease",
                  userSelect: "none",
                }}
              >
                <Swatch bg={s.tokens.bg} accent={s.tokens.accent} />
                <span style={{ flex: 1 }}>{s.name}</span>
                {/* "Default" badge — marks this draft's own default scheme */}
                {isDefault && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.04em",
                      color: "var(--d6-accent)",
                      opacity: 0.8,
                      border: "1px solid var(--d6-accent-line)",
                      borderRadius: "0.25rem",
                      padding: "0.0625rem 0.3125rem",
                      lineHeight: 1.4,
                      flexShrink: 0,
                    }}
                  >
                    Default
                  </span>
                )}
                {/* Active indicator — visible check mark */}
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--d6-accent)",
                    opacity: isActive ? 1 : 0,
                    transition: reducedMotion ? "none" : "opacity 160ms ease",
                    width: "1rem",
                    textAlign: "center",
                  }}
                >
                  ✓
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        ref={triggerRef}
        type="button"
        className="cs-trigger"
        aria-label="Change colour scheme"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          border: "2px solid var(--d6-accent)",
          background: "var(--d6-bg)",
          color: "var(--d6-accent)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? "0 0 0 3px var(--d6-accent), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 2px 12px rgba(0,0,0,0.35)",
          transition: reducedMotion
            ? "none"
            : "box-shadow 220ms cubic-bezier(0.16,1,0.3,1), background 220ms ease",
          outline: "none",
        }}
      >
        <PaletteIcon />
      </button>
    </div>
  )
}

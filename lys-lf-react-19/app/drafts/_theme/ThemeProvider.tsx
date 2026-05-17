"use client"

/**
 * Shared ThemeProvider — usable by every draft.
 *
 * Props:
 *   defaultScheme  SchemeId — this draft's own default (e.g. "kinetic")
 *   storageKey     string   — localStorage key (e.g. "lys-scheme-d6")
 *   children       ReactNode
 *
 * Context (via useScheme()):
 *   scheme         SchemeId              — currently active scheme id
 *   setScheme      (id: SchemeId) => void
 *   schemes        Scheme[]              — ordered list offered to switcher
 *   defaultScheme  SchemeId              — this draft's own default id
 *
 * No-FOUC: an inline <script> applies --d6-* vars before React paint by
 * reading localStorage before hydration.  The root element id is
 * `${storageKey}-root` (unique per draft).
 *
 * Exports:
 *   default   ThemeProvider
 *   named     useScheme()
 *   re-export SchemeId (type), Scheme (type)
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"

import {
  SCHEMES,
  schemeCssVars,
  offeredFor,
  type SchemeId,
  type Scheme,
} from "./schemes"

export type { SchemeId, Scheme }

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface SchemeContextValue {
  scheme: SchemeId
  setScheme: (id: SchemeId) => void
  /** Ordered list of schemes offered by this draft's switcher. */
  schemes: Scheme[]
  /** The draft's own default scheme id. */
  defaultScheme: SchemeId
}

const SchemeContext = createContext<SchemeContextValue | null>(null)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type CssVarMap = Record<string, string>

function buildSchemeVarMapJson(offered: SchemeId[]): string {
  const result: Record<string, CssVarMap> = {}
  for (const id of offered) {
    result[id] = schemeCssVars(id) as CssVarMap
  }
  return JSON.stringify(result)
}

function buildNoFoucScript(
  storageKey: string,
  rootId: string,
  defaultId: string,
  offered: SchemeId[]
): string {
  const mapJson = buildSchemeVarMapJson(offered)
  return `(function(){
  var KEY=${JSON.stringify(storageKey)};
  var VALID=${JSON.stringify(offered)};
  var MAP=${mapJson};
  var stored;
  try { stored = localStorage.getItem(KEY); } catch(e) {}
  var id = (stored && VALID.indexOf(stored) !== -1) ? stored : ${JSON.stringify(defaultId)};
  var root = document.getElementById(${JSON.stringify(rootId)});
  if (!root) return;
  var vars = MAP[id];
  if (!vars) return;
  for (var k in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, k)) {
      root.style.setProperty(k, vars[k]);
    }
  }
})();`
}

// ---------------------------------------------------------------------------
// ThemeProvider
// ---------------------------------------------------------------------------

interface ThemeProviderProps {
  defaultScheme: SchemeId
  storageKey: string
  children: React.ReactNode
}

export default function ThemeProvider({
  defaultScheme,
  storageKey,
  children,
}: ThemeProviderProps) {
  const offered: SchemeId[] = useMemo(() => offeredFor(defaultScheme), [defaultScheme])

  const offeredSchemeObjects: Scheme[] = useMemo(
    () => offered.map((id) => SCHEMES.find((s) => s.id === id)).filter((s): s is Scheme => Boolean(s)),
    [offered]
  )

  const validOfferedSet = useMemo(() => new Set<string>(offered), [offered])

  const rootId = `${storageKey}-root`

  // SSR-safe lazy init: read localStorage only in browser
  const [scheme, setSchemeState] = useState<SchemeId>(() => {
    if (typeof window === "undefined") return defaultScheme
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored && validOfferedSet.has(stored)) return stored as SchemeId
    } catch {
      // ignore (private browsing, quota, etc.)
    }
    return defaultScheme
  })

  const setScheme = useCallback(
    (id: SchemeId) => {
      try {
        localStorage.setItem(storageKey, id)
      } catch {
        // ignore write errors
      }
      setSchemeState(id)
    },
    [storageKey]
  )

  const contextValue = useMemo<SchemeContextValue>(
    () => ({ scheme, setScheme, schemes: offeredSchemeObjects, defaultScheme }),
    [scheme, setScheme, offeredSchemeObjects, defaultScheme]
  )

  // Respect prefers-reduced-motion. Tracked via useEffect (not at render)
  // so SSR and first client render agree — avoids hydration mismatch.
  // Runtime OS preference changes are picked up via the change listener.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const transitionStyle: React.CSSProperties = prefersReducedMotion
    ? { transition: "none" }
    : { transition: "background-color 320ms ease, color 320ms ease" }

  const rootStyle: React.CSSProperties = {
    ...schemeCssVars(scheme),
    backgroundColor: "var(--d6-bg)",
    color: "var(--d6-text)",
    fontFamily: "var(--font-inter)",
    overflowX: "hidden",
    scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
    minHeight: "100dvh",
    ...transitionStyle,
  }

  // Build no-FOUC script once per (storageKey, defaultScheme, offered) combo.
  const noFoucScript = useMemo(
    () => buildNoFoucScript(storageKey, rootId, defaultScheme, offered),
    // offered is stable per defaultScheme; join() produces a stable cache key
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storageKey, rootId, defaultScheme, offered.join(",")]
  )

  return (
    <SchemeContext.Provider value={contextValue}>
      <div id={rootId} style={rootStyle}>
        {/* No-FOUC: apply CSS vars before React hydration */}
        <script
          dangerouslySetInnerHTML={{ __html: noFoucScript }}
          suppressHydrationWarning
        />
        {/* Skip-link styles — scoped here so they pick up --d6-* vars */}
        <style>{`
          .d6-skip {
            position: absolute;
            left: -9999px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
            text-decoration: none;
          }
          .d6-skip:focus-visible {
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 9999;
            width: auto;
            height: auto;
            overflow: visible;
            padding: 0.75rem 1.25rem;
            background: var(--d6-bg);
            color: var(--d6-accent);
            border: 2px solid var(--d6-accent);
            font-weight: 600;
            border-radius: 0.375rem;
            white-space: nowrap;
          }
        `}</style>
        {/* Skip link — first focusable element, visible on :focus-visible */}
        <a href="#home" className="d6-skip">
          Skip to main content
        </a>
        {children}
      </div>
    </SchemeContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// useScheme hook
// ---------------------------------------------------------------------------

/**
 * Access the active color scheme and switcher from any child component.
 *
 * Must be called within a <ThemeProvider> subtree.
 *
 * @example
 * const { scheme, setScheme, schemes, defaultScheme } = useScheme()
 */
export function useScheme(): SchemeContextValue {
  const ctx = useContext(SchemeContext)
  if (!ctx) {
    throw new Error("useScheme must be used within <ThemeProvider>")
  }
  return ctx
}

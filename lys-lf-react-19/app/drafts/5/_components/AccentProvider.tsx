"use client"

/**
 * AccentProvider — re-tones draft 5's accent family without touching the rest
 * of the palette.
 *
 * Draft 5's default scheme is Swiss red. This provider overrides ONLY the
 * accent tokens (--d6-accent, --d6-accent2, --d6-accent-contrast) on a wrapper
 * div, defaulting to a navy/gold law-firm pairing while keeping the original
 * Swiss red selectable (via AccentSwitcher). The override applies only while
 * the draft's own default scheme is active — when the user picks a luxury
 * scheme from the ColorSwitcher, that scheme's accents are left untouched.
 *
 * Choice persists to localStorage. Context is consumed by AccentSwitcher.
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react"
import type { CSSProperties } from "react"
import { useScheme } from "@/app/drafts/_theme/ThemeProvider"

export type AccentId = "navy-gold" | "swiss-red"

interface AccentDef {
  name: string
  accent: string
  accent2: string
  accentContrast: string
}

export const ACCENTS: Record<AccentId, AccentDef> = {
  "navy-gold": {
    name: "Navy & Gold",
    accent: "#14213D",
    accent2: "#C5A572",
    accentContrast: "#FFFFFF",
  },
  "swiss-red": {
    name: "Swiss Red",
    accent: "#D72638",
    accent2: "#D72638",
    accentContrast: "#FFFFFF",
  },
}

const STORAGE_KEY = "lys-accent-d5"
const DEFAULT_ACCENT: AccentId = "navy-gold"

function isAccentId(v: unknown): v is AccentId {
  return v === "navy-gold" || v === "swiss-red"
}

interface AccentContextValue {
  accent: AccentId
  setAccent: (id: AccentId) => void
  /** True only while the draft's default scheme is active (override in effect). */
  active: boolean
}

const AccentContext = createContext<AccentContextValue | null>(null)

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error("useAccent must be used within <AccentProvider>")
  return ctx
}

export default function AccentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { scheme, defaultScheme } = useScheme()
  const [accent, setAccentState] = useState<AccentId>(DEFAULT_ACCENT)

  // Restore persisted choice after mount (SSR-safe).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (isAccentId(stored)) setAccentState(stored)
    } catch {
      // ignore (private browsing, quota)
    }
  }, [])

  const setAccent = useCallback((id: AccentId) => {
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // ignore write errors
    }
    setAccentState(id)
  }, [])

  // Override the accent family only on the draft's own default scheme.
  const active = scheme === defaultScheme

  const overrideStyle = useMemo<CSSProperties>(() => {
    if (!active) return {}
    const def = ACCENTS[accent]
    return {
      "--d6-accent": def.accent,
      "--d6-accent2": def.accent2,
      "--d6-accent-contrast": def.accentContrast,
    } as CSSProperties
  }, [active, accent])

  const contextValue = useMemo<AccentContextValue>(
    () => ({ accent, setAccent, active }),
    [accent, setAccent, active]
  )

  return (
    <AccentContext.Provider value={contextValue}>
      <div style={overrideStyle}>{children}</div>
    </AccentContext.Provider>
  )
}

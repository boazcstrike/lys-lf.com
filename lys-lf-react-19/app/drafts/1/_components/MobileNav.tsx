"use client"

/**
 * MobileNav — hamburger disclosure for the primary nav below the md breakpoint,
 * where the SiteHeader's desktop <ul> is hidden.
 *
 * Accessibility:
 *   - Trigger: aria-expanded + aria-controls, 44px tap target.
 *   - Open panel: role="dialog" aria-modal, Esc closes and restores focus,
 *     focus moves to the first link, Tab is trapped within the panel.
 *   - Body scroll locked while open.
 *   - Styled via the active scheme's --d6-* custom properties.
 */

import React, { useEffect, useRef, useState } from "react"
import { NAV_ITEMS } from "./nav-items"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus())

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
    }
  }, [open])

  // Trap Tab focus within the open panel.
  function onPanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    if (!focusables || focusables.length === 0) return
    const first = focusables[0]!
    const last = focusables[focusables.length - 1]!
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="d1-mobile-nav-panel"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
        style={{ color: "var(--d6-heading)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="d1-mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onKeyDown={onPanelKeyDown}
          className="fixed inset-0 z-[1200] flex flex-col"
          style={{ backgroundColor: "var(--d6-bg)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid var(--d6-hair)" }}
          >
            <span
              className="text-[11px] font-semibold uppercase"
              style={{ color: "var(--d6-accent-text)", letterSpacing: "0.24em" }}
            >
              Menu
            </span>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
              className="inline-flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
              style={{ color: "var(--d6-heading)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-1 flex-col justify-center gap-2 px-8">
            {NAV_ITEMS.map(({ label, href }, i) => (
              <a
                key={label}
                ref={i === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-2xl font-semibold uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
                style={{ color: "var(--d6-heading)", fontFamily: "var(--font-playfair)" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

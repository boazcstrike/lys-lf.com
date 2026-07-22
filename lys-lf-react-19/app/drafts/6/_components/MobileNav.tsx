"use client"

/**
 * MobileNav — hamburger disclosure for draft 6 below the lg breakpoint, where
 * the desktop FloatingNav rail (hidden lg:flex) is not shown. Ensures
 * navigation is never desktop-only.
 *
 * Accessibility: aria-expanded trigger, role="dialog" aria-modal panel, Esc to
 * close + focus restore, first-link focus on open, Tab trapped, body scroll
 * locked. Reads NAV_ITEMS ({ id, label }) and links to `#${id}`.
 */

import React, { useEffect, useRef, useState } from "react"
import { FONT, MOTION } from "./theme"
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
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="d6-mobile-nav-panel"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: "1.1rem",
          right: "1.1rem",
          zIndex: 1090,
          width: "44px",
          height: "44px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid var(--d6-hair)",
          background: "var(--d6-bg)",
          color: "var(--d6-heading)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.20)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="d6-mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onKeyDown={onPanelKeyDown}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            display: "flex",
            flexDirection: "column",
            background: "var(--d6-bg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid var(--d6-hair)",
            }}
          >
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--d6-accent)",
              }}
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
              style={{
                width: "44px",
                height: "44px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                color: "var(--d6-heading)",
                cursor: "pointer",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Primary"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0 2rem",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                style={{
                  padding: "0.75rem 0",
                  fontFamily: FONT.display,
                  fontSize: "1.75rem",
                  letterSpacing: "0.02em",
                  color: "var(--d6-heading)",
                  textDecoration: "none",
                  transition: `color ${MOTION.fast} ${MOTION.easeOut}`,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

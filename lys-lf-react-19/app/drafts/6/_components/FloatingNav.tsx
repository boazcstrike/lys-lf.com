"use client"

import { useEffect, useState } from "react"
import { FONT, MOTION } from "./theme"

const FN_STYLE = `
.d6-fn-link:focus-visible {
  outline: 2px solid var(--d6-accent);
  outline-offset: 2px;
}
.d6-fn-link:focus-visible .d6-fn-label {
  opacity: 1 !important;
  transform: none !important;
}
`

interface NavItem {
  id: string
  label: string
}

const ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "practice-areas", label: "Practice" },
  { id: "about", label: "Firm" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
]

/**
 * FloatingNav — right-edge vertical scroll-spy rail (desktop) that
 * highlights the active section via IntersectionObserver and animates a
 * sliding orange indicator. Each tick expands its label on active.
 * Hidden under lg; small-screen users keep native scroll + in-page
 * anchor links, so navigation is never gesture/hover-only.
 */
export default function FloatingNav() {
  const [active, setActive] = useState<string>("home")

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <style>{FN_STYLE}</style>
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex"
      style={{
        position: "fixed",
        right: "1.6rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1090,
        flexDirection: "column",
        gap: "1.1rem",
        alignItems: "flex-end",
      }}
    >
      {ITEMS.map((item) => {
        const isActive = active === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "location" : undefined}
            className="d6-fn-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
            }}
          >
            <span
              className="d6-fn-label"
              style={{
                fontFamily: FONT.body,
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? "var(--d6-accent)" : "var(--d6-muted)",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(8px)",
                transition: `all ${MOTION.base} ${MOTION.easeOut}`,
              }}
            >
              {item.label}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                height: isActive ? "26px" : "10px",
                width: "2px",
                backgroundColor: isActive ? "var(--d6-accent)" : "var(--d6-faint)",
                transition: `all ${MOTION.base} ${MOTION.spring}`,
              }}
            />
          </a>
        )
      })}
    </nav>
    </>
  )
}

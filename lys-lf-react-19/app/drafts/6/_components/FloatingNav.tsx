"use client"

import { FONT, MOTION } from "./theme"
import { NAV_ITEMS } from "./nav-items"
import { useScrollSpy } from "./useScrollSpy"

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

/**
 * FloatingNav — right-edge vertical scroll-spy rail (desktop) that
 * highlights the active section via IntersectionObserver and animates a
 * sliding orange indicator. Each tick expands its label on active.
 * Hidden under lg; on small screens the paired MobileNav (rendered in
 * page.tsx) provides an equivalent menu, so navigation is never
 * gesture/hover-only and never desktop-only.
 */
export default function FloatingNav() {
  const active = useScrollSpy(NAV_ITEMS)

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
      {NAV_ITEMS.map((item) => {
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

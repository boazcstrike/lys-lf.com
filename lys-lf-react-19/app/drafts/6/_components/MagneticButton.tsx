"use client"

import { useRef, useState } from "react"
import type { CSSProperties } from "react"
import { MOTION } from "./theme"

const MB_STYLE = `
.d6-magnetic:focus-visible {
  outline: 2px solid var(--d6-accent);
  outline-offset: 3px;
}
`

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  /** Visual style. */
  variant?: "solid" | "ghost"
  external?: boolean
  style?: CSSProperties
}

/**
 * MagneticButton — pointer-following CTA.
 *
 * The button drifts toward the cursor while hovered (max ~10px) and
 * springs back on leave; an orange/white glow tracks the pointer. Press
 * adds scale(0.96). reduced-motion disables the drift but keeps a fully
 * usable accessible link (never hover-only for the action itself).
 */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  external = false,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [pressed, setPressed] = useState(false)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    setOffset({
      x: Math.max(-10, Math.min(10, dx * 0.25)),
      y: Math.max(-10, Math.min(10, dy * 0.25)),
    })
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  function reset() {
    setOffset({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
    setPressed(false)
  }

  const isSolid = variant === "solid"
  const base: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "52px",
    padding: "0.85rem 2.4rem",
    fontFamily: "var(--font-inter)",
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    textDecoration: "none",
    overflow: "hidden",
    cursor: "pointer",
    color: isSolid ? "var(--d6-accent-contrast)" : "var(--d6-hero-text)",
    backgroundColor: isSolid ? "var(--d6-accent)" : "transparent",
    border: isSolid ? "1px solid var(--d6-accent)" : "1px solid var(--d6-hair)",
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${pressed ? 0.96 : 1})`,
    transition: `transform ${MOTION.fast} ${MOTION.spring}`,
    willChange: "transform",
    outlineOffset: "3px",
    ...style,
  }

  const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <>
    <style>{MB_STYLE}</style>
    <a
      ref={ref}
      href={href}
      {...extraProps}
      className="d6-magnetic"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={base}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120px circle at ${glow.x}% ${glow.y}%, ${
            isSolid ? "rgba(255,255,255,0.35)" : "var(--d6-accent-soft)"
          }, transparent 60%)`,
          transition: `opacity ${MOTION.base} ease-out`,
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </a>
    </>
  )
}

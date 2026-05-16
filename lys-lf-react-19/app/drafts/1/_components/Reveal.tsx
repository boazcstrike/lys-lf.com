"use client"

/**
 * Reveal — IntersectionObserver scroll-reveal wrapper.
 *
 * Renders children at opacity 0, translateY 16px.
 * Once the element enters the viewport it transitions to
 * opacity 1, translateY 0 (ease-out, 280ms).
 *
 * `delay` (ms) staggers children in grids/lists — keep to 30–50ms increments.
 *
 * Respects `prefers-reduced-motion`: skips the animation and renders
 * the final visible state immediately.
 *
 * Space is always reserved (no CLS) — only opacity + transform are animated.
 */

import React, { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  delay?: number       // ms, default 0
  className?: string
}

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect prefers-reduced-motion once on the client.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    if (mq.matches) setVisible(true)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const style: React.CSSProperties = reducedMotion
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 280ms ease-out ${delay}ms, transform 280ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

"use client"

/**
 * OrnamentalDivider — gold rules with center diamond.
 * Lines draw in via scaleX 0→1 from center on IntersectionObserver reveal.
 * Honors prefers-reduced-motion: shows fully drawn immediately.
 */

import { useEffect, useRef, useState } from "react"

interface OrnamentalDividerProps {
  /** Extra CSS classes on the wrapper div. */
  className?: string
  /** Gold color override. Defaults to heritage gold. */
  color?: string
}

export default function OrnamentalDivider({
  className = "",
  color = "#9C7A3C",
}: OrnamentalDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setDrawn(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const lineStyle: React.CSSProperties = {
    flex: 1,
    height: "1px",
    backgroundColor: color,
    transformOrigin: "center",
    // Slow elegant draw-in (500ms); snap to final if already drawn.
    transform: drawn ? "scaleX(1)" : "scaleX(0)",
    transition: "transform 500ms ease-out",
  }

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span style={lineStyle} />
      {/* Rotated diamond center gem */}
      <span
        className="w-2.5 h-2.5 rotate-45 flex-shrink-0 inline-block border"
        style={{ borderColor: color }}
      />
      <span style={{ ...lineStyle }} />
    </div>
  )
}

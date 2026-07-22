"use client"

/**
 * Reveal — scroll-triggered fade + rise animation.
 *
 * IntersectionObserver, reveals once, honors prefers-reduced-motion.
 * Reserves layout via opacity so no CLS occurs.
 *
 * @param delay     stagger delay in ms (used for grids/lists)
 * @param y         rise distance in px (default 12 — Subtle tier)
 * @param as        wrapper element tag (default "div")
 * @param once      unobserve after first reveal (default true)
 */

import React, { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  once?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  y = 12,
  className = "",
  as = "div",
  once = true,
}: RevealProps): React.ReactNode {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          window.setTimeout(() => setVisible(true), delay)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, once])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 340ms cubic-bezier(0.22,0.61,0.36,1), transform 340ms cubic-bezier(0.22,0.61,0.36,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}

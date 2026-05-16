"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Stagger delay in ms (0–200 typical). Default 0. */
  delay?: number
  /** Wrapper element tag. Default "div". */
  as?: "div" | "li" | "section"
  style?: CSSProperties
  className?: string
}

/**
 * Reveal — IntersectionObserver scroll-reveal wrapper.
 * Opacity 0→1 + translateY 16px→0, once, ease-out 280ms.
 * Honors prefers-reduced-motion: skips animation, shows immediately.
 * Reserve space via containing element so no CLS on trigger.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className,
}: RevealProps) {
  // HTMLElement covers div, li, section — no unsafe narrowing needed
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    // Check prefers-reduced-motion once on mount
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setReduced(true)
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const motionStyle: CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 280ms ease-out ${delay}ms, transform 280ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }

  const mergedStyle = { ...motionStyle, ...style }

  if (Tag === "li") {
    return (
      <li
        ref={ref as React.RefObject<HTMLLIElement>}
        className={className}
        style={mergedStyle}
      >
        {children}
      </li>
    )
  }

  if (Tag === "section") {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={className}
        style={mergedStyle}
      >
        {children}
      </section>
    )
  }

  // Default: div
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={mergedStyle}
    >
      {children}
    </div>
  )
}

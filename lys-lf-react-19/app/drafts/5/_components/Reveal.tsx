"use client"

/**
 * Reveal — IntersectionObserver scroll-reveal wrapper for draft 5.
 *
 * Fades + rises the wrapped section into view on transform+opacity only
 * (no layout shift, no CLS). Fires once. Honors prefers-reduced-motion by
 * showing content immediately with no transition. Reserves layout via opacity
 * so nothing jumps. Matches the Swiss/architectural restraint of this draft:
 * a quiet 24px rise, no scale or bounce.
 */

import React, { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  as?: "div" | "section" | "article" | "li"
  className?: string
  style?: CSSProperties
}

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setReduced(true)
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    // Already on screen at mount (anchor jump / short page): reveal next frame
    // so it animates in rather than sitting invisible.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const motionStyle: CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 560ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 560ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }

  const merged = { ...motionStyle, ...style }

  if (Tag === "section")
    return (
      <section ref={ref as React.RefObject<HTMLElement>} className={className} style={merged}>
        {children}
      </section>
    )
  if (Tag === "article")
    return (
      <article ref={ref as React.RefObject<HTMLElement>} className={className} style={merged}>
        {children}
      </article>
    )
  if (Tag === "li")
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={className} style={merged}>
        {children}
      </li>
    )
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={merged}>
      {children}
    </div>
  )
}

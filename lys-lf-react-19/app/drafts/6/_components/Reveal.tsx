"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { MOTION } from "./theme"

type RevealVariant = "up" | "left" | "right" | "scale" | "clip"

interface RevealProps {
  children: ReactNode
  /** Stagger delay in ms. Default 0. */
  delay?: number
  /** Entrance motion. Default "up". */
  variant?: RevealVariant
  as?: "div" | "li" | "section" | "article"
  style?: CSSProperties
  className?: string
}

const HIDDEN: Record<RevealVariant, CSSProperties> = {
  up: { opacity: 0, transform: "translateY(28px)" },
  left: { opacity: 0, transform: "translateX(-32px)" },
  right: { opacity: 0, transform: "translateX(32px)" },
  scale: { opacity: 0, transform: "scale(0.94)" },
  clip: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
}

const SHOWN: CSSProperties = {
  opacity: 1,
  transform: "none",
  clipPath: "inset(0 0% 0 0)",
}

/**
 * Reveal — IntersectionObserver scroll-reveal wrapper for Draft 6.
 *
 * Supports directional / scale / clip-path entrances on transform+opacity
 * only (no layout-shift, no CLS). Fires once. Honors
 * prefers-reduced-motion (shows immediately, no transition).
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  style,
  className,
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
    // Already on screen at mount (anchor jump / fast scroll / short page):
    // reveal next frame so content never sits invisible waiting for a
    // scroll tick — deferred one frame so the entrance still animates
    // instead of snapping in.
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
        ...(visible ? SHOWN : HIDDEN[variant]),
        transition: `opacity ${MOTION.slow} ${MOTION.easeOut} ${delay}ms, transform ${MOTION.slow} ${MOTION.easeOut} ${delay}ms, clip-path ${MOTION.slow} ${MOTION.easeOut} ${delay}ms`,
        willChange: "opacity, transform",
      }

  const merged = { ...motionStyle, ...style }

  if (Tag === "li")
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={className} style={merged}>
        {children}
      </li>
    )
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
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={merged}>
      {children}
    </div>
  )
}

"use client"

/**
 * Reveal — scroll-triggered fade + rise animation.
 * Uses IntersectionObserver; reveals once. Honors prefers-reduced-motion.
 * Reserves space via opacity so no CLS occurs.
 */

import { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  /** Stagger delay in ms (0–300). Default 0. */
  delay?: number
  className?: string
}

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Immediately show if user prefers reduced motion — skip all animation.
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
        if (entry && entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // opacity 0 reserves layout space — no CLS.
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 280ms ease-out ${delay}ms, transform 280ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

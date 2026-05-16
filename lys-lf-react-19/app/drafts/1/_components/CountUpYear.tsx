"use client"

/**
 * CountUpYear — animates a 4-digit year counting up from (year - 10) to the
 * target value when the element scrolls into view.
 *
 * Duration: ~600ms, linear via requestAnimationFrame.
 * Respects `prefers-reduced-motion` — renders the final number immediately.
 * No layout shift: always reserves space for 4 digits.
 */

import React, { useEffect, useRef, useState } from "react"

interface CountUpYearProps {
  year: number
  className?: string
  style?: React.CSSProperties
}

export default function CountUpYear({ year, className, style }: CountUpYearProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(year)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Skip animation when the user prefers reduced motion.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const duration = 600 // ms
    const startValue = year - 10
    const range = year - startValue // = 10
    const startTime = performance.now()

    let raf: number
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.round(startValue + range * progress)
      setDisplayed(current)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, year])

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      aria-label={`Established ${year}`}
    >
      {displayed}
    </span>
  )
}

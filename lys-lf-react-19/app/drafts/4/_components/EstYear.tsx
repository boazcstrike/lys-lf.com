"use client"

/**
 * EstYear — animated count-up of the firm's established year.
 * Triggers once on IntersectionObserver. Honors prefers-reduced-motion
 * (no-op — shows final value immediately if reduced motion is set).
 * Counts from (year - 10) to year over ~600ms with ease-out cubic.
 */

import { useEffect, useRef, useState } from "react"

interface EstYearProps {
  year: number
}

export default function EstYear({ year }: EstYearProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(year)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Skip count-up; static year already shown via useState(year).
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && !triggered) {
          setTriggered(true)
          observer.disconnect()

          const start = year - 10
          const duration = 600
          const startTime = performance.now()

          function step(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(start + (year - start) * eased))
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [year, triggered])

  return <span ref={ref}>{display}</span>
}

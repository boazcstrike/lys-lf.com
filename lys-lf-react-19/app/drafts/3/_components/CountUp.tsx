"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Final number to count to (e.g. 2015). */
  target: number
  /** Animation duration in ms. Default 1200. */
  duration?: number
  /** Delay before count starts in ms. Default 0. */
  delay?: number
  /** Pass true when prefers-reduced-motion is active — shows target immediately. */
  reduced?: boolean
}

/**
 * CountUp — animates an integer from near-target up to `target`.
 * Starts from ~82% of target to avoid counting from zero for a year value.
 * Uses requestAnimationFrame with ease-out cubic easing.
 * Honors `reduced` prop — if true, shows final value immediately.
 */
export default function CountUp({
  target,
  duration = 1200,
  delay = 0,
  reduced = false,
}: CountUpProps) {
  // Start near target so the count-up is brief and readable
  const startValue = Math.floor(target * 0.82)
  const [value, setValue] = useState(reduced ? target : startValue)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduced) {
      setValue(target)
      return
    }

    const startAnimation = () => {
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(startValue + (target - startValue) * eased)
        setValue(current)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    timeoutRef.current = setTimeout(startAnimation, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delay, reduced])

  return <span aria-label={String(target)}>{value}</span>
}

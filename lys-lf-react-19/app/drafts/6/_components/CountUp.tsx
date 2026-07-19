"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  target: number
  /** ms. Default 1600. */
  duration?: number
  /** ms before counting starts. Default 0. */
  delay?: number
}

/**
 * CountUp — animates an integer 0→target once it scrolls into view.
 * ease-out cubic. Reserves width via tabular-nums so there's no CLS.
 * prefers-reduced-motion: renders the final value immediately.
 */
export default function CountUp({ target, duration = 1600, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setValue(target)
      setDone(true)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const startAt = performance.now() + delay
        const tick = (now: number) => {
          if (now < startAt) {
            requestAnimationFrame(tick)
            return
          }
          const p = Math.min((now - startAt) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
          else setDone(true)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, delay, done])

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  )
}

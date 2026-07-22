"use client"

/**
 * useScrollSpy — returns the id of the section currently in the viewport's
 * reading band, for highlighting the active FloatingNav tick.
 *
 * Uses one IntersectionObserver over all section elements. The rootMargin
 * shrinks the viewport to a horizontal band around the vertical middle, so a
 * section becomes "active" as it crosses center rather than on first pixel.
 * The last section to intersect wins, which tracks natural downward scroll.
 *
 * SSR-safe (observer wired in useEffect). Cleans up on unmount.
 */

import { useEffect, useState } from "react"

interface SpyItem {
  id: string
}

export function useScrollSpy(
  items: SpyItem[],
  rootMargin = "-45% 0px -50% 0px"
): string {
  const [active, setActive] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin, threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items, rootMargin])

  return active
}

"use client"

import { useEffect, useState } from "react"
import { MOTION } from "./theme"

/**
 * ScrollProgress — fixed 3px orange reading-progress bar pinned to the
 * top of the viewport, plus a back-to-top pill that fades in past 60%
 * scroll. rAF-throttled scroll listener (debounce-throttle). Honors
 * reduced-motion by using instant scroll on the jump-to-top action.
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        setPct(max > 0 ? (h.scrollTop / max) * 100 : 0)
        raf = 0
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const showTop = pct > 60

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${pct}%`,
          backgroundColor: "var(--d6-accent)",
          zIndex: 1100,
          boxShadow: "0 0 12px var(--d6-accent)",
          transition: `width 80ms linear`,
        }}
      />
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "1.5rem",
          zIndex: 1100,
          height: "46px",
          width: "46px",
          borderRadius: "999px",
          border: "1px solid var(--d6-accent)",
          backgroundColor: "var(--d6-bg)",
          color: "var(--d6-accent)",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)",
          pointerEvents: showTop ? "auto" : "none",
          transition: `opacity ${MOTION.base} ${MOTION.easeOut}, transform ${MOTION.base} ${MOTION.spring}`,
        }}
      >
        ↑
      </button>
    </>
  )
}

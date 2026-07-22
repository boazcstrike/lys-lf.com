"use client"

/**
 * AnimatedLogo
 *
 * A reusable, accessible animation wrapper around the existing raster
 * law-firm wordmark. Each variant *enhances* the mark (fade, clip-path
 * reveal, or a masked sheen sweep) and never redraws or replaces its
 * identity.
 *
 * Restarting an animation: CSS animations only run on mount. To replay a
 * variant, change the React `key` of the rendered element so it remounts.
 * The showcase page drives this with a per-panel replay counter.
 *
 * Accessibility:
 *  - The wrapper carries `role="img"` + `aria-label`; inner <img> layers are
 *    decorative (`alt=""`, `aria-hidden`) so the mark is announced once.
 *  - All motion is disabled under `prefers-reduced-motion` (see the CSS
 *    module), which resets every variant to its final, fully-visible state.
 */

import type { CSSProperties } from "react"
import styles from "./AnimatedLogo.module.css"

export type LogoVariant = "fade-up" | "expand" | "wipe" | "shimmer" | "float"
export type LogoTheme = "light" | "dark"

interface AnimatedLogoProps {
  /** Which animation to play. */
  variant: LogoVariant
  /** Light panels use the black mark; dark panels use the white mark. */
  theme: LogoTheme
  /** Optional class applied to the wrapper (e.g. width constraints). */
  className?: string
}

/** Number of vertical bands used to build the staggered fade-up reveal. */
const FADE_UP_BANDS = 5

/** Per-band delay so the staggered reveal sweeps left-to-right, in ms. */
const FADE_UP_STAGGER_MS = 90

/** Theme -> raster asset. Both are transparent PNGs at 1700x400 (17:4). */
const LOGO_SRC: Record<LogoTheme, string> = {
  light: "/images/lys-logo.png", // black art, for light backgrounds
  dark: "/images/white-logo.png", // white art, for dark backgrounds
}

const LOGO_ALT = "Lim & Yutatco-Sze Law Firm"

export default function AnimatedLogo({
  variant,
  theme,
  className,
}: AnimatedLogoProps) {
  const src = LOGO_SRC[theme]

  return (
    <div
      role="img"
      aria-label={LOGO_ALT}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {renderVariant(variant, src)}
    </div>
  )
}

/** Renders the layer(s) for a given variant. */
function renderVariant(variant: LogoVariant, src: string) {
  switch (variant) {
    case "fade-up":
      return renderFadeUp(src)
    case "shimmer":
      return renderShimmer(src)
    case "expand":
      return renderSingle(src, styles.expand)
    case "wipe":
      return renderSingle(src, styles.wipe)
    case "float":
      return renderSingle(src, styles.float)
    default:
      return renderSingle(src, undefined)
  }
}

/** A single decorative image layer with an optional animation class. */
function renderSingle(src: string, animationClass: string | undefined) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      className={[styles.layer, animationClass].filter(Boolean).join(" ")}
    />
  )
}

/**
 * Staggered fade-up: the same raster mark is stacked in vertical bands
 * (isolated with clip-path) that fade and rise into place in sequence.
 */
function renderFadeUp(src: string) {
  return Array.from({ length: FADE_UP_BANDS }, (_, index) => {
    const start = (index / FADE_UP_BANDS) * 100
    const end = 100 - ((index + 1) / FADE_UP_BANDS) * 100
    const style: CSSProperties = {
      clipPath: `inset(0 ${end}% 0 ${start}%)`,
      animationDelay: `${index * FADE_UP_STAGGER_MS}ms`,
    }

    return (
      <img
        key={index}
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        style={style}
        className={`${styles.layer} ${styles.fadeUpLayer}`}
      />
    )
  })
}

/**
 * Gold sheen sweep: the base mark fades in, then a gold highlight — masked
 * by the logo's own alpha so it only paints the mark — sweeps across. A
 * softer white sheen also runs on hover. The `--logo` custom property feeds
 * the CSS mask with the current theme's PNG.
 */
function renderShimmer(src: string) {
  const maskStyle = { "--logo": `url(${src})` } as CSSProperties

  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        className={`${styles.layer} ${styles.shimmerBase}`}
      />
      <span aria-hidden="true" style={maskStyle} className={styles.sheen} />
      <span aria-hidden="true" style={maskStyle} className={styles.sheenHover} />
    </>
  )
}

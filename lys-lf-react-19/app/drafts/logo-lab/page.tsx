"use client"

/**
 * Logo Lab — /drafts/logo-lab
 *
 * An internal showcase of restrained, prestige-appropriate animations for the
 * existing law-firm wordmark. Each variant lives in its own labeled panel with
 * a Replay button. Light panels use the black mark; dark panels use the white
 * mark. All variants respect `prefers-reduced-motion` (handled inside
 * AnimatedLogo's CSS module).
 *
 * Replaying: CSS animations only run on mount, so each panel keeps a small
 * counter and passes it as the React `key` to AnimatedLogo — bumping it
 * remounts the logo and restarts the animation from the top.
 *
 * This page is a client component (it holds replay state). It inherits
 * `robots: noindex` from the drafts layout, so no metadata export is needed.
 */

import { useState } from "react"
import AnimatedLogo, {
  type LogoTheme,
  type LogoVariant,
} from "./_components/AnimatedLogo"

interface PanelSpec {
  variant: LogoVariant
  theme: LogoTheme
  title: string
  description: string
}

/** The five variants on show, ordered to alternate light and dark panels. */
const PANELS: readonly PanelSpec[] = [
  {
    variant: "fade-up",
    theme: "light",
    title: "Staggered Fade-Up",
    description:
      "The mark rises into place in vertical bands, left to right — a quiet, editorial entrance.",
  },
  {
    variant: "expand",
    theme: "dark",
    title: "Center Expand",
    description:
      "A clip-path opens from the ampersand outward, so the flanking rules draw out and the wordmark expands into view.",
  },
  {
    variant: "wipe",
    theme: "light",
    title: "Mask-Wipe Reveal",
    description:
      "A single left-to-right wipe uncovers the mark via clip-path over the artwork.",
  },
  {
    variant: "shimmer",
    theme: "dark",
    title: "Gold Sheen Sweep",
    description:
      "A gold highlight — masked to the mark's own shapes — sweeps across on load. Hover for a softer pass.",
  },
  {
    variant: "float",
    theme: "light",
    title: "Float & Settle",
    description:
      "The mark drifts down from above and settles with a soft, understated overshoot.",
  },
] as const

export default function LogoLabPage() {
  // One replay counter per variant. Bumping a counter remounts that logo.
  const [replayKeys, setReplayKeys] = useState<Record<string, number>>({})

  const replay = (variant: LogoVariant) =>
    setReplayKeys((prev) => ({ ...prev, [variant]: (prev[variant] ?? 0) + 1 }))

  return (
    <main
      style={{ backgroundColor: "#111417", color: "#e9e6df", minHeight: "100vh" }}
      className="px-6 py-16 md:px-12"
    >
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-12 text-center">
          <p
            className="mb-3 text-xs uppercase"
            style={{ letterSpacing: "0.35em", color: "#c9a227" }}
          >
            Logo Lab
          </p>
          <h1
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Animated Wordmark Studies
          </h1>
          <p
            className="mx-auto mt-4 max-w-[46em] text-sm md:text-base"
            style={{ fontFamily: "var(--font-source-sans)", opacity: 0.7 }}
          >
            Five restrained motion treatments for the existing logo. Each
            enhances the mark with CSS clip-path or a masked sheen — never a
            redraw. Motion is disabled automatically for visitors who prefer
            reduced motion.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PANELS.map((panel) => (
            <LogoPanel
              key={panel.variant}
              panel={panel}
              replayKey={replayKeys[panel.variant] ?? 0}
              onReplay={() => replay(panel.variant)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

interface LogoPanelProps {
  panel: PanelSpec
  replayKey: number
  onReplay: () => void
}

function LogoPanel({ panel, replayKey, onReplay }: LogoPanelProps) {
  const isDark = panel.theme === "dark"

  return (
    <section
      className="flex flex-col overflow-hidden rounded-lg"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      aria-label={`${panel.title} variant`}
    >
      {/* Stage — background matches the theme the mark was designed for. */}
      <div
        className="flex items-center justify-center px-8 py-14 md:py-16"
        style={{ backgroundColor: isDark ? "#0e1b2b" : "#f7f5f0" }}
      >
        <AnimatedLogo
          key={replayKey}
          variant={panel.variant}
          theme={panel.theme}
          className="w-full max-w-[24em]"
        />
      </div>

      {/* Caption + controls. */}
      <div
        className="flex items-start justify-between gap-4 px-6 py-5"
        style={{ backgroundColor: "#161a1e" }}
      >
        <div>
          <h2
            className="text-base"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            {panel.title}
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ fontFamily: "var(--font-source-sans)", opacity: 0.65 }}
          >
            {panel.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onReplay}
          aria-label={`Replay the ${panel.title} animation`}
          className="shrink-0 rounded-full px-4 py-1.5 text-xs uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            letterSpacing: "0.12em",
            color: "#c9a227",
            border: "1px solid rgba(201,162,39,0.5)",
            outlineColor: "#c9a227",
          }}
        >
          Replay
        </button>
      </div>
    </section>
  )
}

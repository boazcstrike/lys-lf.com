/**
 * Drafts index — navigation hub for the redesign explorations.
 *
 * Serves route `/drafts`. Lists all six redesign directions plus a card
 * that links back to the live / production homepage. Pure server component:
 * no client hooks, no browser APIs. Fonts arrive as CSS variables from
 * `app/drafts/layout.tsx`; robots noindex is also set there, so it is not
 * repeated here.
 *
 * Palette follows the drafts' shared tokens:
 *   Near-black: #0F0F14 / #16161C   Warm gray: #A8A29A   Gold: #C5A572
 */

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Redesign Drafts | LYS Law Firm",
}

// ─── Palette constants (mirrors the drafts' shared design tokens) ──────────────
const GOLD = "#C5A572"
const BG = "#0F0F14"
const CARD_BG = "#16161C"
const CARD_BORDER = "rgba(197, 165, 114, 0.14)"
const WARM_GRAY = "#A8A29A"

/**
 * One entry per navigable destination. The six drafts carry a numeric badge;
 * the live site uses the "★" badge to read as the reference, not a draft.
 */
interface DraftEntry {
  /** Badge glyph — draft number or a star for the live design. */
  badge: string
  /** Direction name, mirrored from the DraftSwitcher metadata. */
  name: string
  /** One-line descriptor written per direction. */
  descriptor: string
  /** Destination route. */
  href: string
  /** Short kicker shown above the name (e.g. "Draft 01" / "Live"). */
  kicker: string
}

const ENTRIES: readonly DraftEntry[] = [
  {
    badge: "1",
    name: "Editorial Prestige",
    descriptor:
      "Asymmetric serif hero and gold hairlines — a magazine-grade sense of authority.",
    href: "/drafts/1",
    kicker: "Draft 01",
  },
  {
    badge: "2",
    name: "Minimal Corporate",
    descriptor:
      "Restrained grid, generous whitespace, and quiet confidence for a modern practice.",
    href: "/drafts/2",
    kicker: "Draft 02",
  },
  {
    badge: "3",
    name: "Dark Authoritative",
    descriptor:
      "Deep, cinematic backdrops with luminous accents that command the room.",
    href: "/drafts/3",
    kicker: "Draft 03",
  },
  {
    badge: "4",
    name: "Heritage Traditional",
    descriptor:
      "Ornamental dividers and classical proportions that honour an established legacy.",
    href: "/drafts/4",
    kicker: "Draft 04",
  },
  {
    badge: "5",
    name: "Contemporary Bold",
    descriptor:
      "High-contrast type and confident colour blocks for a forward-looking firm.",
    href: "/drafts/5",
    kicker: "Draft 05",
  },
  {
    badge: "6",
    name: "Kinetic Editorial",
    descriptor:
      "Motion-led storytelling — scroll reveals, magnetic buttons, and a living layout.",
    href: "/drafts/6",
    kicker: "Draft 06",
  },
  {
    badge: "★",
    name: "Live / Production",
    descriptor:
      "The current published homepage — the reference point every draft is measured against.",
    href: "/",
    kicker: "Live",
  },
  {
    badge: "✦",
    name: "Logo Animations",
    descriptor:
      "The animation lab — five grounded motion studies of the firm's wordmark, each with a replay control.",
    href: "/drafts/logo-lab",
    kicker: "Lab",
  },
] as const

// ─── Card ─────────────────────────────────────────────────────────────────────
function DraftCard({ entry }: { entry: DraftEntry }) {
  const isLive = entry.badge === "★"
  const isLab = entry.badge === "✦"
  // Reference cards (live site, logo lab) get a tinted badge + their own cue verb.
  const isReference = isLive || isLab
  const cueLabel = isLive ? "Visit site" : isLab ? "Open lab" : "View draft"

  return (
    <li className="drafts-card group relative">
      {/* Whole-card primary link. The overlay <span> stretches the hit area
          across the card while keeping a single semantic link for a11y. */}
      <Link
        href={entry.href}
        aria-label={`${entry.name} — ${entry.kicker}. ${entry.descriptor}`}
        className="drafts-card__link flex h-full flex-col rounded-xl border p-7 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 sm:p-8"
        style={{
          backgroundColor: CARD_BG,
          borderColor: CARD_BORDER,
        }}
      >
        {/* Badge + kicker row */}
        <div className="mb-8 flex items-center justify-between">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full border text-base font-semibold"
            style={{
              borderColor: GOLD,
              color: GOLD,
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              backgroundColor: isReference ? "rgba(197, 165, 114, 0.10)" : "transparent",
            }}
          >
            {entry.badge}
          </span>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.24em]"
            style={{
              color: GOLD,
              fontFamily: "var(--font-source-sans), system-ui, sans-serif",
            }}
          >
            {entry.kicker}
          </span>
        </div>

        {/* Direction name */}
        <h2
          className="mb-4 text-2xl leading-tight sm:text-[1.7rem]"
          style={{
            color: "#F4F1EA",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 600,
          }}
        >
          {entry.name}
        </h2>

        {/* One-line descriptor */}
        <p
          className="mb-8 max-w-[42ch] text-sm leading-[1.7]"
          style={{
            color: WARM_GRAY,
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.05rem",
          }}
        >
          {entry.descriptor}
        </p>

        {/* Footer affordance: "View" cue pinned to the card bottom */}
        <span
          className="drafts-card__cue mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{
            color: GOLD,
            fontFamily: "var(--font-source-sans), system-ui, sans-serif",
          }}
        >
          {cueLabel}
          <span aria-hidden="true" className="drafts-card__arrow">
            →
          </span>
        </span>
      </Link>

      {/* Secondary affordance: open in a new tab. Sits above the primary link
          (z-index) so its own click is not swallowed by the card link. */}
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${entry.name} in a new tab`}
        className="drafts-card__newtab absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-md text-sm outline-none transition-colors focus-visible:ring-2"
        style={{ color: WARM_GRAY }}
      >
        <span aria-hidden="true">↗</span>
      </a>
    </li>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DraftsIndexPage() {
  return (
    <main
      className="min-h-[100svh] px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Page header ── */}
        <header className="mb-16 lg:mb-20">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em]"
            style={{
              color: GOLD,
              fontFamily: "var(--font-source-sans), system-ui, sans-serif",
            }}
          >
            LYS Law Firm · Internal Preview
          </p>

          <h1
            className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{
              color: "#F4F1EA",
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            Redesign Drafts
          </h1>

          {/* Gold hairline, echoing the drafts' signature rule */}
          <div
            aria-hidden="true"
            className="mt-8 mb-7 h-px w-24"
            style={{ backgroundColor: GOLD }}
          />

          <p
            className="max-w-[58ch] text-base leading-[1.7] lg:text-lg"
            style={{
              color: WARM_GRAY,
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            Six distinct design directions for the firm&rsquo;s new homepage,
            shown alongside the live production site. Open any card to explore
            the full experience.
          </p>
        </header>

        {/* ── Card grid: 1 / 2 / 3 columns ── */}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((entry) => (
            <DraftCard key={entry.href} entry={entry} />
          ))}
        </ul>
      </div>

      {/*
        Scoped hover / focus polish. Kept inline so this page stays
        self-contained and does not touch globals.css. Reduced-motion users
        get instant state changes with no movement on the arrow cue.
      */}
      <style>{`
        .drafts-card__link:hover {
          border-color: rgba(197, 165, 114, 0.55) !important;
          background-color: #1B1B22 !important;
        }
        .drafts-card__link:focus-visible {
          --tw-ring-color: ${GOLD};
          --tw-ring-offset-color: ${BG};
        }
        .drafts-card__arrow {
          transition: transform 220ms ease-out;
        }
        .group:hover .drafts-card__arrow {
          transform: translateX(4px);
        }
        .drafts-card__newtab:hover {
          color: ${GOLD};
          background-color: rgba(197, 165, 114, 0.12);
        }
        .drafts-card__newtab:focus-visible {
          --tw-ring-color: ${GOLD};
          color: ${GOLD};
        }
        @media (prefers-reduced-motion: reduce) {
          .drafts-card__arrow { transition: none; }
          .group:hover .drafts-card__arrow { transform: none; }
        }
      `}</style>
    </main>
  )
}

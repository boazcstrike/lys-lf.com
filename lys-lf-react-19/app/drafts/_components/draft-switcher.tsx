"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * DraftSwitcher — developer-only floating navigation between the 5
 * redesign drafts.
 *
 * Hard dev gate: `process.env.NODE_ENV` is statically inlined by Next at
 * build time, so in `next build` / static export this component compiles
 * to `return null` and is tree-shaken out. It renders ONLY under
 * `next dev`. It must never appear in a production bundle.
 */

const DRAFTS = [
  { n: 1, label: "Editorial Prestige" },
  { n: 2, label: "Minimal Corporate" },
  { n: 3, label: "Dark Authoritative" },
  { n: 4, label: "Heritage Traditional" },
  { n: 5, label: "Contemporary Bold" },
  { n: 6, label: "Kinetic Editorial" },
] as const

const TOTAL = DRAFTS.length

function currentDraftFromPath(pathname: string): number {
  const match = pathname.match(/\/drafts\/(\d+)/)
  if (!match) return 1
  const n = Number(match[1])
  return n >= 1 && n <= TOTAL ? n : 1
}

const DraftSwitcher: React.FC = () => {
  if (process.env.NODE_ENV !== "development") return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname() ?? "/drafts/1"
  const isLogoLab = pathname.startsWith("/drafts/logo-lab")
  const current = currentDraftFromPath(pathname)
  const prev = current === 1 ? TOTAL : current - 1
  const next = current === TOTAL ? 1 : current + 1
  const activeLabel = DRAFTS[current - 1]?.label ?? ""

  return (
    <div
      role="navigation"
      aria-label="Draft switcher (development only)"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      className="fixed bottom-5 left-1/2 z-[1000] -translate-x-1/2 select-none"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-neutral-900/90 px-2 py-2 text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur">
        <span className="hidden px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 sm:inline">
          DEV
        </span>

        <Link
          href={`/drafts/${prev}`}
          aria-label={`Previous draft (${DRAFTS[prev - 1]?.label})`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-white/10"
        >
          ‹
        </Link>

        <div className="flex items-center gap-1 px-1">
          {DRAFTS.map((d) => {
            const isActive = d.n === current
            return (
              <Link
                key={d.n}
                href={`/drafts/${d.n}`}
                aria-label={`Draft ${d.n}: ${d.label}`}
                aria-current={isActive ? "page" : undefined}
                title={d.label}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-amber-400 text-neutral-900"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {d.n}
              </Link>
            )
          })}
        </div>

        <Link
          href={`/drafts/${next}`}
          aria-label={`Next draft (${DRAFTS[next - 1]?.label})`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-white/10"
        >
          ›
        </Link>

        {/* Divider between the draft dots and the destination pills. */}
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-white/15" />

        {/* Fixed destinations: hub index, live site, and the logo lab. */}
        <Link
          href="/drafts"
          aria-label="All drafts (index)"
          title="All drafts"
          className="flex h-9 items-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          All
        </Link>
        <Link
          href="/"
          aria-label="Live production site"
          title="Live site"
          className="flex h-9 items-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          Live
        </Link>
        <Link
          href="/drafts/logo-lab"
          aria-label="Logo animation lab"
          title="Logo lab"
          aria-current={isLogoLab ? "page" : undefined}
          className={`flex h-9 items-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            isLogoLab
              ? "bg-amber-400 text-neutral-900"
              : "text-amber-300/90 hover:bg-white/10 hover:text-amber-200"
          }`}
        >
          Logo
        </Link>

        <span className="hidden max-w-[12em] truncate px-3 text-xs font-medium text-white/80 lg:inline">
          {isLogoLab ? "Logo Lab" : `${current}/${TOTAL} · ${activeLabel}`}
        </span>
      </div>
    </div>
  )
}

export default DraftSwitcher

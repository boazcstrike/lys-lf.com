"use client"

import { useState, useId, useRef, useEffect } from "react"
import teamRoles from "@/app/assets/data/team"
import Reveal from "../_components/Reveal"
import { FONT, MOTION } from "../_components/theme"

/** 1–2 letter monogram; strips "Atty." prefix. */
function getInitials(name: string): string {
  const clean = name.replace(/^Atty\.\s*/i, "").trim()
  const parts = clean.split(/\s+/)
  if (parts.length <= 1) return (parts[0]?.[0] ?? "?").toUpperCase()
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase()
}

/**
 * Team — interactive roster (Draft 6).
 *
 * Partners: portrait cards with a solid info bar below the photo ensuring
 * name + role are always readable on a solid background. Bio reveals on
 * hover (mouse), click/tap (pinned toggle), or keyboard. Associates: monogram
 * tiles that flip their accent on hover. Scroll-staggered via Reveal.
 *
 * Colors: fully migrated to CSS custom properties (--d6-* vars).
 */
function PartnerCard({
  name,
  img,
  bio,
  delay,
}: {
  name: string
  img?: string
  bio?: string
  delay: number
}) {
  const bioId = useId()
  // `open`: bio panel is expanded (by any means)
  // `pinned`: user clicked/tapped — mouse-leave won't collapse
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  function handleMouseEnter() {
    setOpen(true)
  }

  function handleMouseLeave() {
    if (!pinned) setOpen(false)
  }

  function handleBioButtonClick() {
    if (!pinned) {
      // First click: pin open
      setOpen(true)
      setPinned(true)
    } else {
      // Second click: unpin + close
      setOpen(false)
      setPinned(false)
    }
  }

  function handleCardFocus() {
    setOpen(true)
  }

  function handleCardBlur(e: React.FocusEvent<HTMLElement>) {
    // Only close if focus leaves the entire card subtree
    if (!cardRef.current?.contains(e.relatedTarget as Node | null)) {
      if (!pinned) setOpen(false)
    }
  }

  const hasBio = Boolean(bio)
  const buttonLabel = open ? `Hide bio: ${name}` : `Read bio: ${name}`

  return (
    <Reveal delay={delay} variant="up">
      <article
        ref={cardRef}
        aria-label={name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleCardFocus}
        onBlur={handleCardBlur}
        style={{
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${open ? "var(--d6-accent)" : "var(--d6-hair)"}`,
          transition: reducedMotion ? "none" : `border-color ${MOTION.base} ${MOTION.easeOut}`,
          overflow: "hidden",
        }}
      >
        {/* ── Photo block (fixed 3/4 aspect) ── */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3 / 4",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {img ? (
            <img
              src={img}
              alt={`Portrait of ${name}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
                transform: reducedMotion ? "scale(1)" : open ? "scale(1.06)" : "scale(1)",
                transition: reducedMotion ? "none" : `transform ${MOTION.slow} ${MOTION.easeOut}`,
              }}
            />
          ) : (
            /* Initials placeholder */
            <div
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--d6-panel)",
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: "4rem",
                color: "var(--d6-accent)",
              }}
            >
              {getInitials(name)}
            </div>
          )}
        </div>

        {/* ── Solid info bar — always visible, always readable ── */}
        <div
          style={{
            backgroundColor: "var(--d6-bg)",
            padding: "1rem 1.25rem 0",
          }}
        >
          <h3
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "var(--d6-heading)",
              margin: 0,
            }}
          >
            {name}
          </h3>

          {/* Accent tick — grows when open */}
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: open ? "44px" : "22px",
              height: "2px",
              backgroundColor: "var(--d6-accent)",
              margin: "0.55rem 0",
              transition: reducedMotion ? "none" : `width ${MOTION.base} ${MOTION.spring}`,
            }}
          />

          {/* "Read bio" affordance button — always visible when bio exists */}
          {hasBio && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={bioId}
              aria-label={buttonLabel}
              onClick={handleBioButtonClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                minHeight: "44px",
                minWidth: "44px",
                padding: "0.25rem 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: FONT.body,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--d6-accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {/* (i) glyph */}
              <svg
                aria-hidden="true"
                focusable="false"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
                <line x1="7" y1="6" x2="7" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="3.75" r="0.875" fill="currentColor" />
              </svg>

              <span>{open ? "Hide bio" : "Read bio"}</span>

              {/* Chevron — rotates when open */}
              <svg
                aria-hidden="true"
                focusable="false"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  flexShrink: 0,
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: `transform ${MOTION.base} ${MOTION.easeOut}`,
                }}
              >
                <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Bio panel — expands below solid info bar ── */}
        {hasBio && (
          <div
            id={bioId}
            role="region"
            aria-label={`Bio: ${name}`}
            style={{
              backgroundColor: "var(--d6-bg)",
              overflow: "hidden",
              maxHeight: open ? "24rem" : "0",
              opacity: open ? 1 : 0,
              transition: reducedMotion
                ? "none"
                : `max-height ${MOTION.slow} ${MOTION.easeOut}, opacity ${MOTION.base} ${MOTION.easeOut}`,
            }}
          >
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "var(--d6-text)",
                margin: 0,
                padding: "0.75rem 1.25rem 1.25rem",
              }}
            >
              {bio}
            </p>
          </div>
        )}

        {/* Bottom padding for info bar when no bio or bio closed */}
        <div
          style={{
            backgroundColor: "var(--d6-bg)",
            paddingBottom: "1rem",
          }}
        />
      </article>
    </Reveal>
  )
}

function AssociateTile({ name, delay }: { name: string; delay: number }) {
  const [hover, setHover] = useState(false)
  return (
    <Reveal delay={delay} variant="scale">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem 1.25rem",
          border: `1px solid ${hover ? "var(--d6-accent)" : "var(--d6-hair)"}`,
          backgroundColor: hover ? "var(--d6-accent-soft)" : "transparent",
          transition: `all ${MOTION.base} ${MOTION.easeOut}`,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: "0.95rem",
            color: hover ? "var(--d6-accent-contrast)" : "var(--d6-accent)",
            backgroundColor: hover ? "var(--d6-accent)" : "transparent",
            border: `1px solid var(--d6-accent)`,
            transition: `all ${MOTION.base} ${MOTION.spring}`,
          }}
        >
          {getInitials(name)}
        </span>
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: "0.92rem",
            fontWeight: 500,
            color: "var(--d6-text)",
          }}
        >
          {name}
        </span>
      </div>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section
      id="team"
      style={{
        backgroundColor: "var(--d6-bg)",
        padding: "clamp(4rem,9vw,7rem) clamp(1.25rem,5vw,5rem)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <Reveal variant="left">
          <p
            style={{
              fontFamily: FONT.body,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--d6-accent)",
              margin: "0 0 0.75rem",
            }}
          >
            Our People
          </p>
          <h2
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: "var(--d6-heading)",
              margin: "0 0 0.5rem",
            }}
          >
            The Team
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "var(--d6-accent)",
              margin: "1.25rem 0 3rem",
            }}
          />
        </Reveal>

        {teamRoles.map((role) => {
          const isPartners = role.position === "Partners"
          return (
            <div key={role.position} style={{ marginBottom: "3.5rem" }}>
              <Reveal variant="up">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "24px",
                      height: "2px",
                      backgroundColor: "var(--d6-accent)",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: FONT.body,
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--d6-muted)",
                      margin: 0,
                    }}
                  >
                    {role.position}
                  </h3>
                </div>
              </Reveal>

              {isPartners ? (
                <div
                  style={{
                    display: "grid",
                    gap: "1.5rem",
                    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                    maxWidth: "640px",
                  }}
                >
                  {role.employees.map((emp, i) => (
                    <PartnerCard
                      key={emp.key}
                      name={emp.name}
                      img={emp.img}
                      bio={emp.bio}
                      delay={i * 120}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                  }}
                >
                  {role.employees.map((emp, i) => (
                    <AssociateTile
                      key={emp.key}
                      name={emp.name}
                      delay={i * 80}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

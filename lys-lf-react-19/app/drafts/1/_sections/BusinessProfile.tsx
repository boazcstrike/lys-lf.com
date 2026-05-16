/**
 * Business Profile section — Editorial Prestige Draft 1
 *
 * Two-column editorial layout (desktop): decorative photo column left,
 * text column right. Paragraphs rendered via react-markdown so **bold**
 * markdown renders as styled <strong>. Drop-cap on first paragraph.
 *
 * Scroll reveal: each column fades up when it enters the viewport.
 * Photo column is delayed by 60ms to stagger the two panels.
 *
 * Dark navy background contrasts with ivory Practice Areas above and below.
 */

import React from "react"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import businessProfile from "@/app/assets/data/business-profile"
import Reveal from "@/app/drafts/1/_components/Reveal"

// ─── Small-caps section label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-xs tracking-[0.22em] uppercase"
      style={{
        color: "#C5A572",
        fontFamily: "var(--font-source-sans)",
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  )
}

// ─── Thin gold hairline rule ──────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px ${className}`}
      style={{ backgroundColor: "#C5A572" }}
    />
  )
}

// ─── react-markdown component overrides ──────────────────────────────────────
// Ivory text + source-sans for body paragraphs; gold for **bold** spans.
const mdBodyComponents: Components = {
  p({ children }) {
    return (
      <p
        className="mb-4 text-sm leading-[1.72] last:mb-0 md:text-base"
        style={{
          color: "#FBF8F1",
          fontFamily: "var(--font-source-sans)",
          opacity: 0.83,
          maxWidth: "64ch",
        }}
      >
        {children}
      </p>
    )
  },
  strong({ children }) {
    return (
      <strong style={{ color: "#C5A572", fontWeight: 700, opacity: 1 }}>
        {children}
      </strong>
    )
  },
}

// ─── Section ─────────────────────────────────────────────────────────────────
const BusinessProfile: React.FC = () => {
  const [firstParagraph, ...restParagraphs] = businessProfile.paragraphs

  return (
    <section
      id="about"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#14213D" }}
      aria-labelledby="profile-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">

          {/* ── Left: decorative layered photos (desktop only) ── */}
          <Reveal delay={60} className="relative hidden lg:block">
            <img
              src="/images/optimized/LYS-20.webp"
              alt="LYS Law Firm attorneys in a professional setting"
              className="h-[520px] w-full object-cover object-top"
            />
            {/* Offset secondary photo — editorial depth */}
            <div
              className="absolute -bottom-8 -right-8 h-52 w-52 overflow-hidden"
              style={{ outline: "4px solid #FBF8F1" }}
            >
              <img
                src="/images/optimized/LYS-16.webp"
                alt="LYS Law Firm office environment"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Gold badge — "Since YYYY" */}
            <div
              className="absolute top-6 left-6 px-4 py-3"
              style={{ backgroundColor: "#C5A572" }}
            >
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase"
                style={{
                  color: "#14213D",
                  fontFamily: "var(--font-source-sans)",
                }}
              >
                Since 2015
              </p>
            </div>
          </Reveal>

          {/* ── Right: editorial text content ── */}
          <Reveal className="flex flex-col justify-center">
            <SectionLabel>Who We Are</SectionLabel>

            <h2
              id="profile-heading"
              className="mb-5 text-3xl leading-tight md:text-4xl"
              style={{
                color: "#FBF8F1",
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
              }}
            >
              {businessProfile.title}
            </h2>

            <GoldRule className="mb-8 w-16" />

            {/* First paragraph with drop-cap initial letter */}
            {firstParagraph && (
              <div className="mb-4 overflow-hidden">
                {/*
                  Drop-cap: first character floated left with oversized Playfair.
                  The rest of the paragraph runs inline so **bold** still renders.
                */}
                <p
                  className="text-sm leading-[1.72] md:text-base"
                  style={{
                    color: "#FBF8F1",
                    fontFamily: "var(--font-source-sans)",
                    opacity: 0.83,
                    maxWidth: "64ch",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="float-left mr-2 select-none text-[4.5rem] leading-[0.85]"
                    style={{
                      color: "#C5A572",
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      marginTop: "0.05em",
                    }}
                  >
                    {firstParagraph.charAt(0)}
                  </span>
                  <ReactMarkdown
                    components={{
                      p({ children }) {
                        return <>{children}</>
                      },
                      strong({ children }) {
                        return (
                          <strong style={{ color: "#C5A572", fontWeight: 700 }}>
                            {children}
                          </strong>
                        )
                      },
                    }}
                  >
                    {firstParagraph.slice(1)}
                  </ReactMarkdown>
                </p>
              </div>
            )}

            {/* Remaining paragraphs */}
            <div>
              {restParagraphs.map((para, i) => (
                <ReactMarkdown key={i} components={mdBodyComponents}>
                  {para}
                </ReactMarkdown>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default BusinessProfile

/**
 * CTA Banner section — Editorial Prestige Draft 1
 *
 * Full-width photo banner with dark overlay. Large serif headline
 * "Have Legal Problems? Let's Talk." with gold CTA buttons.
 * Uses LYS-33 as a dramatic backdrop.
 *
 * Scroll reveal: centered content block fades up on entry.
 * Hover/press: solid button opacity lift; outline button opacity lift.
 *   Both buttons apply scale(0.97) on active (press). 180ms ease-out.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "@/app/drafts/1/_components/Reveal"

const CtaBanner: React.FC = () => {
  return (
    <section
      aria-label="Call to action — contact the firm"
      className="relative flex min-h-[420px] items-center justify-center overflow-hidden py-20 md:py-28"
    >
      {/* Background photo */}
      <img
        src="/images/optimized/LYS-33.webp"
        alt="LYS Law Firm attorneys in a formal consultation setting"
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Deep navy overlay — meets 4.5:1 contrast with ivory text */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: "var(--d6-panel)", opacity: 0.86 }}
      />

      {/* Decorative gold hairline rules top and bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-1/2 w-16 -translate-x-1/2"
        style={{ height: "1px", backgroundColor: "var(--d6-accent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 w-16 -translate-x-1/2"
        style={{ height: "1px", backgroundColor: "var(--d6-accent)" }}
      />

      {/* Centered content — revealed on scroll */}
      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Small-caps eyebrow */}
        <p
          className="mb-5 text-xs tracking-[0.22em] uppercase"
          style={{
            color: "var(--d6-accent)",
            fontFamily: "var(--font-source-sans)",
            fontWeight: 600,
          }}
        >
          Get in Touch
        </p>

        {/* Main headline — h2 (h1 lives in Hero) */}
        <h2
          className="mb-6 text-3xl leading-tight md:text-4xl xl:text-5xl"
          style={{
            color: "var(--d6-hero-text)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
          }}
        >
          Have Legal Problems?{" "}
          <span style={{ color: "var(--d6-accent)" }}>Let&apos;s Talk.</span>
        </h2>

        {/* Supporting line */}
        <p
          className="mb-10 max-w-[52ch] mx-auto text-sm leading-[1.7] md:text-base"
          style={{
            color: "var(--d6-hero-text)",
            fontFamily: "var(--font-source-sans)",
            opacity: 0.70,
          }}
        >
          Our experienced attorneys are ready to provide the expert counsel
          you need. Reach us by phone or email today.
        </p>

        {/* CTA buttons — hover + press via CSS class */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="cta-btn-solid inline-flex min-h-[44px] items-center justify-center px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
            style={{
              backgroundColor: "var(--d6-accent)",
              color: "var(--d6-accent-contrast)",
              fontFamily: "var(--font-source-sans)",
              transition: "transform 180ms ease-out, opacity 180ms ease-out",
            }}
          >
            Call Us
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="cta-btn-outline inline-flex min-h-[44px] items-center justify-center border px-8 py-3 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
            style={{
              borderColor: "var(--d6-accent)",
              color: "var(--d6-accent)",
              fontFamily: "var(--font-source-sans)",
              transition: "transform 180ms ease-out, opacity 180ms ease-out",
            }}
          >
            Email Us
          </a>
        </div>
      </Reveal>

      <style>{`
        .cta-btn-solid:hover  { opacity: 0.88; }
        .cta-btn-solid:active { transform: scale(0.97); }
        .cta-btn-outline:hover  { opacity: 0.78; }
        .cta-btn-outline:active { transform: scale(0.97); }
        @media (prefers-reduced-motion: reduce) {
          .cta-btn-solid,
          .cta-btn-outline { transition: none !important; }
          .cta-btn-solid:active,
          .cta-btn-outline:active { transform: none; }
        }
      `}</style>
    </section>
  )
}

export default CtaBanner

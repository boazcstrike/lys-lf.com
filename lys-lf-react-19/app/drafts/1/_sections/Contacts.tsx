/**
 * Contacts section — Editorial Prestige Draft 1
 *
 * Two-column layout: left = contact details (address, office hours,
 * phone, email); right = embedded Google Maps iframe.
 * Ivory background to complement the dark CTA banner above.
 *
 * Scroll reveal: left column fades up; map column follows with 80ms delay.
 * Hover: phone/email links animate a gold underline grow instead of opacity fade.
 *
 * Map embed uses no API key:
 * https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "@/app/drafts/1/_components/Reveal"

// ─── Small-caps section label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      // Legibility: 14px/700 with tightened tracking, and the AA-safe
      // --d6-accent-text (deep bronze ~5.6:1 on ivory) — decorative --d6-accent
      // gold is only ~2.2:1 and fails WCAG AA at this size. Same hue family, so
      // the editorial gold reading is preserved while the text stays readable.
      className="mb-3 text-sm tracking-[0.18em] uppercase"
      style={{
        color: "var(--d6-accent-text)",
        fontFamily: "var(--font-source-sans)",
        fontWeight: 700,
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
      style={{ backgroundColor: "var(--d6-accent)" }}
    />
  )
}

// ─── Detail row: gold label + content ────────────────────────────────────────
interface DetailRowProps {
  label: string
  children: React.ReactNode
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="mb-7 last:mb-0">
      <p
        className="mb-1.5 text-xs tracking-[0.18em] uppercase"
        style={{
          // AA-safe accent text on ivory (see SectionLabel note).
          color: "var(--d6-accent-text)",
          fontFamily: "var(--font-source-sans)",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <div
        className="text-sm leading-[1.7]"
        style={{ color: "var(--d6-text)", fontFamily: "var(--font-source-sans)" }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
const Contacts: React.FC = () => {
  const { address } = siteConfig.location
  const { contact, officeHours } = siteConfig

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--d6-bg)" }}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: contact details ── */}
          <Reveal>
            <SectionLabel>Find Us</SectionLabel>

            <h2
              id="contact-heading"
              className="mb-5 text-3xl leading-tight md:text-4xl"
              style={{
                color: "var(--d6-heading)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
              }}
            >
              Contact &amp; Location
            </h2>

            <GoldRule className="mb-10 w-16" />

            <DetailRow label="Office Address">
              <address className="not-italic">
                <span className="block">{address.line1}</span>
                <span className="block">{address.line2}</span>
                <span className="block">{address.line3}</span>
                <span className="block">
                  {address.city}, {address.postalCode}
                </span>
              </address>
            </DetailRow>

            <DetailRow label="Office Hours">
              <p>
                {officeHours.days}
                <br />
                {officeHours.hours}
              </p>
            </DetailRow>

            <DetailRow label="Telephone">
              {/* Gold underline grow on hover via contact-link CSS */}
              <a
                href={`tel:${contact.phone}`}
                className="contact-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
                style={{ color: "var(--d6-heading)" }}
              >
                {contact.phoneDisplay}
              </a>
            </DetailRow>

            <DetailRow label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="contact-link break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
                style={{ color: "var(--d6-heading)" }}
              >
                {contact.email}
              </a>
            </DetailRow>
          </Reveal>

          {/* ── Right: Google Maps embed ── */}
          <Reveal delay={80} className="flex flex-col">
            <p
              className="mb-4 text-xs tracking-[0.18em] uppercase"
              style={{
                // AA-safe accent text on ivory (see SectionLabel note).
                color: "var(--d6-accent-text)",
                fontFamily: "var(--font-source-sans)",
                fontWeight: 600,
              }}
            >
              Map
            </p>

            {/*
              Responsive iframe: padding-bottom % keeps a 4:3 ratio on mobile.
              On lg+ flex-1 fills the column; min-height guards against collapse.
            */}
            <div
              className="relative w-full overflow-hidden lg:flex-1 lg:min-h-[420px]"
              style={{
                paddingBottom: "75%",
                border: "1px solid var(--d6-accent)",
              }}
            >
              <iframe
                title="map"
                src="https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps showing LYS Law Firm office location in Alabang, Muntinlupa City"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/*
        Gold underline grow: the link has a pseudo-underline that scales from 0
        to full width on hover — more editorial than a plain opacity change.
      */}
      <style>{`
        .contact-link {
          display: inline;
          background-image: linear-gradient(var(--d6-accent), var(--d6-accent));
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: left bottom;
          transition: background-size 220ms ease-out;
          text-decoration: none;
        }
        .contact-link:hover {
          background-size: 100% 1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-link { transition: none !important; }
          .contact-link:hover { background-size: 0% 1px; text-decoration: underline; }
        }
      `}</style>
    </section>
  )
}

export default Contacts

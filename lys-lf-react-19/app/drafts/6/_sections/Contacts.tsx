import React from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"
import { FONT } from "../_components/theme"

/**
 * Contacts — split detail / map block (Draft 6).
 *
 * Left: address, hours, phone, email — each group reveals on scroll with
 * a staggered slide-in and an animated accent tick. Right: Google Maps
 * iframe framed by a 1px hair border. Colors via CSS custom properties
 * (--d6-*). Link hover via scoped <style> block to stay a server component.
 */
export default function Contacts() {
  const { address, coordinates } = siteConfig.location
  const { officeHours, contact } = siteConfig
  const mapSrc = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=en&z=16&output=embed`

  const Block = ({
    label,
    delay,
    children,
  }: {
    label: string
    delay: number
    children: React.ReactNode
  }) => (
    <Reveal delay={delay} variant="left">
      <div
        style={{
          padding: "1.5rem 0",
          borderBottom: "1px solid var(--d6-hair)",
        }}
      >
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: FONT.body,
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--d6-accent)",
            margin: "0 0 0.75rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: "18px", height: "2px", backgroundColor: "var(--d6-accent)" }}
          />
          {label}
        </p>
        {children}
      </div>
    </Reveal>
  )

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--d6-bg)",
        padding: "clamp(4rem,9vw,7rem) clamp(1.25rem,5vw,5rem)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <Reveal variant="up">
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
            Find Us
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
            Contact &amp; Location
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "var(--d6-accent)",
              margin: "1.25rem 0 2.5rem",
            }}
          />
        </Reveal>

        <div
          className="d6-contact-grid"
          style={{
            display: "grid",
            gap: "clamp(2rem,5vw,4rem)",
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Details */}
          <div>
            <Block label="Address" delay={0}>
              <address
                style={{
                  fontStyle: "normal",
                  fontFamily: FONT.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "var(--d6-muted)",
                }}
              >
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.line3}
                <br />
                {address.city}, {address.postalCode}
              </address>
            </Block>

            <Block label="Office Hours" delay={90}>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "var(--d6-muted)",
                  margin: 0,
                }}
              >
                {officeHours.days}
                <br />
                {officeHours.hours}
              </p>
            </Block>

            <Block label="Phone" delay={180}>
              <a
                href={`tel:${contact.phone}`}
                className="d6-clink"
                style={{
                  fontFamily: FONT.body,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                {contact.phoneDisplay}
              </a>
            </Block>

            <Block label="Email" delay={270}>
              <a
                href={`mailto:${contact.email}`}
                className="d6-clink"
                style={{
                  fontFamily: FONT.body,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  wordBreak: "break-all",
                }}
              >
                {contact.email}
              </a>
            </Block>
          </div>

          {/* Map */}
          <Reveal variant="clip">
            <div
              style={{
                position: "relative",
                height: "100%",
                minHeight: "380px",
                border: "1px solid var(--d6-hair)",
                overflow: "hidden",
              }}
            >
              <iframe
                title="Map showing the Lim and Yutatco-Sze Law Firm office in Filinvest City, Alabang"
                src={mapSrc}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  filter: "grayscale(0.4) contrast(1.05)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .d6-clink { color: var(--d6-text); }
        .d6-clink:hover, .d6-clink:focus-visible { color: var(--d6-accent); }
        .d6-clink:focus-visible { outline: 2px solid var(--d6-accent); outline-offset: 2px; }
        @media (min-width: 1024px) {
          .d6-contact-grid { grid-template-columns: 0.9fr 1.1fr; }
        }
      `}</style>
    </section>
  )
}

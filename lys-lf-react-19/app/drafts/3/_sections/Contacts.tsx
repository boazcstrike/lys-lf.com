"use client"

import { useState } from "react"
import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"

/**
 * Contacts section — address, hours, phone, email on left;
 * Google Maps embed (dark-filtered) on right.
 * Contact links have gold grow-underline on hover.
 * Colors use --d6-* CSS custom properties set by ThemeProvider.
 */
export default function Contacts() {
  const { contact, location, officeHours } = siteConfig
  const { address } = location
  const [phoneHover, setPhoneHover] = useState(false)
  const [emailHover, setEmailHover] = useState(false)

  const mapSrc =
    "https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        backgroundColor: "var(--d6-panel)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left — contact details */}
        <Reveal>
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--d6-accent)",
                marginBottom: "1rem",
              }}
            >
              Find Us
            </p>

            <h2
              id="contact-heading"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--d6-heading)",
                margin: 0,
                marginBottom: "1rem",
              }}
            >
              Contact &amp; Location
            </h2>

            <div
              aria-hidden="true"
              style={{
                width: "3rem",
                height: "1px",
                backgroundColor: "var(--d6-accent)",
                marginBottom: "2.5rem",
              }}
            />

            {/* Definition list of contact details */}
            <dl
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: 0,
              }}
            >
              {/* Address */}
              <div>
                <dt
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--d6-accent)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Address
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "var(--d6-muted)",
                    margin: 0,
                  }}
                >
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.line3}
                  <br />
                  {address.city} {address.postalCode}
                </dd>
              </div>

              {/* Telephone */}
              <div>
                <dt
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--d6-accent)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Telephone
                </dt>
                <dd style={{ margin: 0 }}>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    onMouseEnter={() => setPhoneHover(true)}
                    onMouseLeave={() => setPhoneHover(false)}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      color: phoneHover ? "var(--d6-accent)" : "var(--d6-muted)",
                      textDecoration: "none",
                      borderBottom: `1px solid ${phoneHover ? "var(--d6-accent)" : "transparent"}`,
                      transition: "color 200ms ease-out, border-color 200ms ease-out",
                      paddingBottom: "1px",
                    }}
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>

              {/* Email */}
              <div>
                <dt
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--d6-accent)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </dt>
                <dd style={{ margin: 0 }}>
                  <a
                    href={`mailto:${contact.email}`}
                    onMouseEnter={() => setEmailHover(true)}
                    onMouseLeave={() => setEmailHover(false)}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      color: emailHover ? "var(--d6-accent)" : "var(--d6-muted)",
                      textDecoration: "none",
                      borderBottom: `1px solid ${emailHover ? "var(--d6-accent)" : "transparent"}`,
                      transition: "color 200ms ease-out, border-color 200ms ease-out",
                      paddingBottom: "1px",
                      wordBreak: "break-all",
                    }}
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              {/* Office hours */}
              <div>
                <dt
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--d6-accent)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Office Hours
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "var(--d6-muted)",
                    margin: 0,
                  }}
                >
                  {officeHours.days}
                  <br />
                  {officeHours.hours}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Right — Google Maps embed with dark filter */}
        <Reveal delay={50}>
          <div style={{ position: "relative" }}>
            {/* Offset gold accent border behind map */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "-1.5rem",
                bottom: "-1.5rem",
                left: "1.5rem",
                border: "1px solid var(--d6-hair)",
                zIndex: 0,
              }}
            />

            <iframe
              src={mapSrc}
              title="map"
              style={{
                position: "relative",
                zIndex: 1,
                display: "block",
                border: "none",
                width: "100%",
                aspectRatio: "4/3",
                // CSS filter makes the map dark to match the design
                filter:
                  "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

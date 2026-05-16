/**
 * Contacts — Swiss Architectural (Draft 5)
 *
 * Two-column split with a strict 1px black vertical divider.
 * Left (#F2F2F2 panel): address block, office hours, phone, email — each
 * group separated by a 1px rule. All text typeset in Inter tight tracking.
 * Right: Google Maps embed as a plain rectangular iframe block (no API key).
 *
 * Map: https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const Contacts: React.FC = () => {
  const { address } = siteConfig.location
  const { officeHours, contact } = siteConfig

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#F2F2F2", borderBottom: "1px solid #0A0A0A" }}
    >
      {/* Section header row */}
      <div
        className="flex items-baseline justify-between px-6 py-8 lg:px-14 xl:px-20"
        style={{ borderBottom: "1px solid #0A0A0A", backgroundColor: "#FFFFFF" }}
      >
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#D72638",
              lineHeight: 1,
            }}
          >
            06
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#0A0A0A",
              lineHeight: 1,
            }}
          >
            Contact &amp; Location
          </h2>
        </div>
        <span
          className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] sm:block"
          style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.35 }}
          aria-hidden="true"
        >
          Find Us
        </span>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — contact details on light grey */}
        <div
          className="flex flex-col gap-0 lg:w-[40%]"
          style={{ borderRight: "1px solid #0A0A0A" }}
        >
          {/* Address block */}
          <div
            className="px-6 py-8 lg:px-10"
            style={{ borderBottom: "1px solid #0A0A0A" }}
          >
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "#D72638" }}
            >
              Address
            </p>
            <address
              className="not-italic text-sm leading-loose"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.72 }}
            >
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.line3}
              <br />
              {address.city}, {address.postalCode}
            </address>
          </div>

          {/* Office hours block */}
          <div
            className="px-6 py-8 lg:px-10"
            style={{ borderBottom: "1px solid #0A0A0A" }}
          >
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "#D72638" }}
            >
              Office Hours
            </p>
            <p
              className="text-sm leading-loose"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A", opacity: 0.72 }}
            >
              {officeHours.days}
              <br />
              {officeHours.hours}
            </p>
          </div>

          {/* Phone block */}
          <div
            className="px-6 py-8 lg:px-10"
            style={{ borderBottom: "1px solid #0A0A0A" }}
          >
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "#D72638" }}
            >
              Phone
            </p>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D72638]"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A" }}
            >
              {contact.phoneDisplay}
            </a>
          </div>

          {/* Email block */}
          <div className="px-6 py-8 lg:px-10">
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-inter)", color: "#D72638" }}
            >
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="break-all text-sm transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D72638]"
              style={{ fontFamily: "var(--font-inter)", color: "#0A0A0A" }}
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* RIGHT — Google Maps embed (no API key needed) */}
        <div className="relative flex-1" style={{ minHeight: "360px" }}>
          <iframe
            title="map"
            src="https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed"
            className="h-80 w-full border-0 lg:h-full"
            style={{ minHeight: "360px", display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing the location of Lim and Yutatco-Sze Law Firm in Filinvest City, Alabang"
          />
        </div>
      </div>
    </section>
  )
}

export default Contacts

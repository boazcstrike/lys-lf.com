import siteConfig from "@/app/assets/data/site-config"

// Quiet Luxury palette
const GREEN = "#1F3A2E"
const BRASS = "#A98B5D"
const CHARCOAL = "#2B2622"
const STONE = "#EFEAE1"

/**
 * Contacts — address, office hours, phone, email + embedded Google Map.
 * Stone bg. Two-column: contact details left, map iframe right.
 * Map uses coordinate-based embed URL — no API key required.
 */
export default function Contacts() {
  const { contact, location, officeHours } = siteConfig
  const { address } = location

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        backgroundColor: STONE,
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <p
            style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "10px" }}
            className="mb-4 font-medium uppercase"
          >
            Find Us
          </p>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: GREEN,
              fontWeight: 500,
              lineHeight: 1.1,
            }}
            className="text-[2.25rem] sm:text-[2.75rem]"
          >
            Contact &amp; Location
          </h2>
          <div
            style={{ width: "3rem", height: "1px", backgroundColor: BRASS }}
            className="mt-5"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* ── Contact details ──────────────────────────────────── */}
          <div className="space-y-8">
            {/* Office Address */}
            <div>
              <h3
                style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "9px" }}
                className="mb-3 font-medium uppercase"
              >
                Office Address
              </h3>
              <address
                style={{ color: `${CHARCOAL}bb`, lineHeight: 1.8 }}
                className="not-italic text-sm"
              >
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p>{address.line3}</p>
                <p>
                  {address.city}, {address.postalCode}
                </p>
              </address>
            </div>

            <div
              style={{ height: "1px", backgroundColor: `${BRASS}33` }}
              aria-hidden="true"
            />

            {/* Office Hours */}
            <div>
              <h3
                style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "9px" }}
                className="mb-3 font-medium uppercase"
              >
                Office Hours
              </h3>
              <p style={{ color: `${CHARCOAL}bb` }} className="text-sm">
                <span style={{ color: CHARCOAL, fontWeight: 500 }}>
                  {officeHours.days}
                </span>
                {" — "}
                {officeHours.hours}
              </p>
            </div>

            <div
              style={{ height: "1px", backgroundColor: `${BRASS}33` }}
              aria-hidden="true"
            />

            {/* Phone + Email */}
            <div>
              <h3
                style={{ color: BRASS, letterSpacing: "0.22em", fontSize: "9px" }}
                className="mb-3 font-medium uppercase"
              >
                Get in Touch
              </h3>
              <div className="space-y-2 text-sm">
                <p style={{ color: `${CHARCOAL}bb` }}>
                  <span
                    style={{ color: BRASS, letterSpacing: "0.15em", fontSize: "9px" }}
                    className="mr-2 font-medium uppercase"
                  >
                    Tel
                  </span>
                  <a
                    href={`tel:${contact.phone}`}
                    style={{ color: CHARCOAL }}
                    className="transition-colors hover:text-[#1F3A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
                  >
                    {contact.phoneDisplay}
                  </a>
                </p>
                <p style={{ color: `${CHARCOAL}bb` }}>
                  <span
                    style={{ color: BRASS, letterSpacing: "0.15em", fontSize: "9px" }}
                    className="mr-2 font-medium uppercase"
                  >
                    Email
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ color: CHARCOAL }}
                    className="transition-colors hover:text-[#1F3A2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Short brass accent rule */}
            <div
              style={{ width: "3rem", height: "1px", backgroundColor: BRASS }}
              aria-hidden="true"
            />
          </div>

          {/* ── Google Maps embed (no API key) ─────────────────── */}
          <div
            style={{
              overflow: "hidden",
              border: `1px solid ${BRASS}33`,
              boxShadow: "0 4px 24px rgba(31,58,46,0.08)",
            }}
          >
            <iframe
              title="map"
              src="https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ display: "block", border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

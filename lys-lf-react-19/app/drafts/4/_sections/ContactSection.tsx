/**
 * ContactSection — Heritage Traditional (server component)
 * Address, office hours, contact info left; Google Maps embed right.
 * Reveal wraps columns for scroll animation.
 *
 * Colors sourced from --d6-* CSS custom properties (ThemeProvider).
 * Gap: oxblood links (#6B1F2A) and secondary bg (#FAF6F0) mapped to
 * --d6-accent and --d6-bg respectively (closest semantics).
 */

import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"
import OrnamentalDivider from "../_components/OrnamentalDivider"

export default function ContactSection() {
  const { address } = siteConfig.location
  const { phone, phoneDisplay, email } = siteConfig.contact
  const { days, hours } = siteConfig.officeHours

  const mapSrc =
    "https://www.google.com/maps?q=14.4152799,121.0380395&hl=en&z=16&output=embed"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: "var(--d6-bg)" }}
    >
      {/* Thin accent rule at top */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--d6-accent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        {/* Section heading */}
        <Reveal className="text-center mb-12">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: "var(--font-libre)", color: "var(--d6-heading)", fontWeight: 700 }}
          >
            Contact Us
          </h2>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
          >
            We Welcome Your Enquiries
          </p>
          <OrnamentalDivider className="max-w-xs mx-auto" color="var(--d6-accent)" />
        </Reveal>

        {/* Two-column: info left, map right */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* Info column */}
          <Reveal className="flex-1 min-w-0">
            <div
              className="border p-8 h-full"
              style={{ borderColor: "var(--d6-hair)", backgroundColor: "var(--d6-bg)" }}
            >
              {/* Office address */}
              <div className="mb-8">
                <h3
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
                >
                  Office Address
                </h3>
                <address
                  className="not-italic text-sm leading-[1.75]"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--d6-text)" }}
                >
                  {address.line1}<br />
                  {address.line2}<br />
                  {address.line3}<br />
                  {address.city}, {address.postalCode}
                </address>
              </div>

              <div
                className="h-px w-full mb-8"
                style={{ backgroundColor: "var(--d6-hair)" }}
                aria-hidden="true"
              />

              {/* Office hours */}
              <div className="mb-8">
                <h3
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
                >
                  Office Hours
                </h3>
                <p
                  className="text-sm leading-[1.75]"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--d6-text)" }}
                >
                  {days}<br />{hours}
                </p>
              </div>

              <div
                className="h-px w-full mb-8"
                style={{ backgroundColor: "var(--d6-hair)" }}
                aria-hidden="true"
              />

              {/* Contact details */}
              <div>
                <h3
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent)" }}
                >
                  Get in Touch
                </h3>

                <p className="mb-2">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-sm underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    style={{ fontFamily: "var(--font-lora)", color: "var(--d6-accent2)" }}
                  >
                    {phoneDisplay}
                  </a>
                </p>

                <p>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    style={{
                      fontFamily: "var(--font-lora)",
                      color: "var(--d6-accent2)",
                      wordBreak: "break-all",
                    }}
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map column */}
          <Reveal delay={80} className="flex-1 min-w-0">
            <div
              className="border overflow-hidden h-full"
              style={{ borderColor: "var(--d6-hair)", minHeight: "340px" }}
            >
              <iframe
                src={mapSrc}
                title="map"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block", minHeight: "340px" }}
                aria-label="Google Maps showing LYS Law Firm office location"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Thin accent rule at bottom */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--d6-accent)" }}
        aria-hidden="true"
      />
    </section>
  )
}

import siteConfig from "@/app/assets/data/site-config"

/**
 * CTABanner — dark panel full-width strip.
 * "Have Legal Problems? Let's Talk." in large Cormorant serif.
 * Accent color on the second phrase; two CTA links (call + email).
 * No JS — CSS hover only.
 * Colors via CSS custom properties (--d6-*).
 */
export default function CTABanner() {
  const { contact } = siteConfig

  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "var(--d6-panel)",
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          {/* Headline */}
          <div>
            <p
              style={{ color: "var(--d6-accent)", letterSpacing: "0.22em", fontSize: "10px" }}
              className="mb-3 font-medium uppercase"
            >
              Get in Touch
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "var(--d6-hero-text)",
                fontWeight: 400,
                lineHeight: 1.12,
              }}
              className="text-[2rem] sm:text-[2.5rem] md:text-[2.75rem]"
            >
              Have Legal Problems?{" "}
              <span style={{ color: "var(--d6-accent)" }}>Let&rsquo;s Talk.</span>
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex flex-shrink-0 flex-wrap items-center justify-center gap-4 md:justify-end">
            <a
              href={`tel:${contact.phone}`}
              style={{
                border: "1px solid var(--d6-accent)",
                color: "var(--d6-hero-text)",
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-colors hover:bg-[var(--d6-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--d6-panel)]"
            >
              Call {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              style={{
                backgroundColor: "var(--d6-accent)",
                color: "var(--d6-accent-contrast)",
                letterSpacing: "0.1em",
                fontSize: "11px",
                minWidth: "10rem",
                height: "48px",
              }}
              className="inline-flex items-center justify-center px-7 font-medium uppercase transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--d6-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--d6-panel)]"
            >
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

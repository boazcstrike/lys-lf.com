import siteConfig from "@/app/assets/data/site-config"

// Quiet Luxury palette
const GREEN = "#1F3A2E"
const BRASS = "#A98B5D"
const PANEL = "#F6F2EA"

/**
 * Footer — deep forest-green strip.
 * White logo, Cormorant firm name, brass developer credit link.
 * new Date() evaluated at build time — safe for static export.
 */
export default function Footer() {
  const { firmName, firmShortName } = siteConfig
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Site footer"
      style={{
        backgroundColor: GREEN,
        borderTop: `1px solid ${BRASS}33`,
        fontFamily: "var(--font-source-sans), system-ui, sans-serif",
      }}
      className="py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-8 text-center sm:flex-row sm:justify-between sm:text-left">
        {/* White logo + firm name */}
        <div className="flex items-center gap-3">
          <img
            src="/images/optimized/lys-white-logo-darker.webp"
            alt={`${firmShortName} logo`}
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              color: PANEL,
              fontWeight: 500,
              fontSize: "1rem",
              lineHeight: 1.2,
            }}
          >
            {firmName}.
          </span>
        </div>

        {/* Copyright */}
        <p style={{ color: `${PANEL}66`, fontSize: "11px" }}>
          &copy; {year} {firmName}. All rights reserved.
        </p>

        {/* Developer attribution */}
        <p style={{ color: `${PANEL}66`, fontSize: "11px" }}>
          Website by{" "}
          <a
            href="https://www.facebook.com/boazcstrike/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: BRASS }}
            className="underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B5D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3A2E]"
          >
            Boaz Sze
          </a>
        </p>
      </div>
    </footer>
  )
}

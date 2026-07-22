import siteConfig from "@/app/assets/data/site-config"
import Reveal from "../_components/Reveal"
import { FONT } from "../_components/theme"

/**
 * Footer — panel bar with an accent top rule (Draft 6).
 *
 * Logo + firm name + established label on the left, developer credit on
 * the right. Reveal fades the row up on scroll. Colors via CSS custom
 * properties (--d6-*). Link hover via scoped <style> block to stay a
 * server component.
 */
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--d6-panel)",
        borderTop: "2px solid var(--d6-accent)",
      }}
    >
      <Reveal variant="up">
        <div
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          style={{ maxWidth: "1180px", margin: "0 auto", padding: "2.5rem clamp(1.25rem,5vw,5rem)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <img
              src="/images/optimized/lys-white-logo-darker.webp"
              alt="LYS Law Firm logo"
              style={{ height: "40px", width: "auto", objectFit: "contain", display: "block" }}
            />
            <span
              aria-hidden="true"
              style={{ width: "1px", height: "36px", backgroundColor: "var(--d6-accent-line)" }}
            />
            <div>
              <p
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--d6-hero-text)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {siteConfig.firmName}
              </p>
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: "0.62rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--d6-hero-muted)",
                  margin: "0.3rem 0 0",
                }}
              >
                Est. {siteConfig.establishedYear}
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: FONT.body,
              fontSize: "0.72rem",
              color: "var(--d6-hero-muted)",
              margin: 0,
            }}
          >
            Website by{" "}
            <a
              href="https://www.linkedin.com/in/boaz-sze-44b00291/"
              target="_blank"
              rel="noopener noreferrer"
              className="d6-footer-link underline underline-offset-2"
              style={{ color: "var(--d6-hero-muted)" }}
            >
              Boaz Sze
            </a>
          </p>
        </div>
      </Reveal>

      <style>{`
        .d6-footer-link { transition: opacity 180ms ease; }
        .d6-footer-link:hover { opacity: 0.7; }
        .d6-footer-link:focus-visible { outline: 2px solid var(--d6-accent); outline-offset: 2px; }
      `}</style>
    </footer>
  )
}

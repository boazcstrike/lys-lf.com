/**
 * Footer section — Editorial Prestige Draft 1
 *
 * Deep navy background. White logo, firm name, and "Website by Boaz Sze"
 * byline. Gold hairline rule above content. Three-column layout on desktop.
 *
 * Interactivity: "Boaz Sze" link uses the gold underline-grow pattern.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="py-10"
      style={{ backgroundColor: "var(--d6-panel)" }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-20">
        {/* Gold hairline rule */}
        <div
          aria-hidden="true"
          className="mb-8 h-px w-full"
          style={{ backgroundColor: "var(--d6-accent)", opacity: 0.4 }}
        />

        {/* Three-column footer row */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">

          {/* White logo */}
          <div>
            <img
              src="/images/optimized/lys-white-logo-darker.webp"
              alt="Lim and Yutatco-Sze Law Firm logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Firm name */}
          <p
            className="text-center text-sm tracking-wide"
            style={{
              color: "var(--d6-hero-text)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 500,
              opacity: 0.88,
            }}
          >
            Lim &amp; Yutatco-Sze Law Firm.
          </p>

          {/* Copyright + byline */}
          <div className="text-center md:text-right">
            <p
              className="mb-1 text-xs"
              style={{
                color: "var(--d6-hero-text)",
                fontFamily: "var(--font-source-sans)",
                opacity: 0.62,
              }}
            >
              &copy; {currentYear} {siteConfig.firmName}. All rights reserved.
            </p>
            <p
              className="text-xs"
              style={{
                color: "var(--d6-hero-text)",
                fontFamily: "var(--font-source-sans)",
                opacity: 0.58,
              }}
            >
              Website by{" "}
              <a
                href="https://www.linkedin.com/in/boaz-sze-44b00291/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d6-accent)]"
                style={{ color: "var(--d6-accent)", opacity: 1 }}
              >
                Boaz Sze
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Gold underline grow for footer link */}
      <style>{`
        .footer-link {
          background-image: linear-gradient(var(--d6-accent), var(--d6-accent));
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: left bottom;
          transition: background-size 220ms ease-out;
          text-decoration: none;
        }
        .footer-link:hover {
          background-size: 100% 1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-link { transition: none !important; }
          .footer-link:hover { background-size: 0% 1px; text-decoration: underline; }
        }
      `}</style>
    </footer>
  )
}

export default Footer

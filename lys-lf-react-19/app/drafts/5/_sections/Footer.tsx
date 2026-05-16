/**
 * Footer — Swiss Architectural (Draft 5)
 *
 * Strict black bar (#0A0A0A). White logo left-aligned, firm name in Space
 * Grotesk, established year in faint small-caps label. Red 1px top rule.
 * "Website by Boaz Sze" credit right-aligned with external Facebook link.
 * No decorations, no rounded corners.
 */

import React from "react"
import siteConfig from "@/app/assets/data/site-config"

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#0A0A0A", borderTop: "2px solid #D72638" }}>
      <div
        className="flex flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 xl:px-20"
      >
        {/* Left — logo + firm name + established */}
        <div className="flex items-center gap-5">
          <img
            src="/images/optimized/lys-white-logo-darker.webp"
            alt="LYS Law Firm logo"
            className="h-10 w-auto object-contain"
            style={{ display: "block" }}
          />

          {/* Vertical divider */}
          <div
            aria-hidden="true"
            style={{ width: "1px", height: "36px", backgroundColor: "rgba(255,255,255,0.18)" }}
          />

          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#FFFFFF" }}
            >
              {siteConfig.firmName}
            </p>
            <p
              className="mt-0.5 text-[10px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.35)" }}
            >
              Est. {siteConfig.establishedYear}
            </p>
          </div>
        </div>

        {/* Right — developer credit */}
        <p
          className="text-[11px]"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.3)" }}
        >
          Website by{" "}
          <a
            href="https://www.facebook.com/boazcstrike/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D72638]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Boaz Sze
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer

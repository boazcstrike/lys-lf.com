"use client"

/**
 * FooterSection — Heritage Traditional
 * Dark brown footer: white logo + firm name centred,
 * ornamental rule, "Website by Boaz Sze" credit.
 * Client: dynamic copyright year + EstYear count-up.
 */

import siteConfig from "@/app/assets/data/site-config"
import EstYear from "../_components/EstYear"

export default function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{ backgroundColor: "#1E1414" }}
    >
      {/* Gold top accent */}
      <div className="h-1 w-full" style={{ backgroundColor: "#9C7A3C" }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">
        {/* White logo */}
        <img
          src="/images/optimized/lys-white-logo-darker.webp"
          alt={`${siteConfig.firmName} logo`}
          width={72}
          height={72}
          style={{ objectFit: "contain" }}
        />

        {/* Firm name */}
        <p
          className="text-lg sm:text-xl leading-tight"
          style={{ fontFamily: "var(--font-libre)", color: "#F4EFE6", fontWeight: 700 }}
        >
          {siteConfig.firmName}
        </p>

        {/* Established line — count-up on scroll-in */}
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-lora)", color: "#9C7A3C" }}
        >
          Est. <EstYear year={siteConfig.establishedYear} />
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center gap-3 w-full max-w-xs" aria-hidden="true">
          <span className="flex-1 border-t" style={{ borderColor: "rgba(156,122,60,0.4)" }} />
          <span
            className="w-2 h-2 rotate-45 inline-block"
            style={{ backgroundColor: "#9C7A3C" }}
          />
          <span className="flex-1 border-t" style={{ borderColor: "rgba(156,122,60,0.4)" }} />
        </div>

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-lora)", color: "#7A6A5A" }}
        >
          &copy; {siteConfig.establishedYear}&ndash;{currentYear}{" "}
          {siteConfig.firmName}. All rights reserved.
        </p>

        {/* Developer credit */}
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-lora)", color: "#5C4A3A" }}
        >
          Website by{" "}
          <a
            href="https://www.facebook.com/boazcstrike/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-amber-600"
            style={{ color: "#9C7A3C" }}
          >
            Boaz Sze
          </a>
        </p>
      </div>
    </footer>
  )
}

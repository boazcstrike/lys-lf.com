import React, { FC } from "react"

import lysLogo from "@/public/images/optimized/lys-white-logo-darker.webp"

/**
 * Footer component - displays firm branding and credits
 * 
 * Shows:
 * - LYS Logo
 * - Firm name
 * - Website credits
 * 
 * @component
 * @returns {React.ReactNode} Footer element with firm information
 */
const Footer: FC = () => {
  return (
    <footer className="bg-[url('/images/optimized/zwartevilt_@2X.webp')] bg-left-top bg-repeat px-8 py-8 pb-12 flex flex-col items-center">
      <div className="logo-sheen max-w-[20em] mb-4 transition-transform duration-500 hover:-translate-y-1">
        <img src={lysLogo.src} alt="LYS Logo" loading="lazy" />
      </div>
      <span className="text-[#cccccc] text-sm text-center block">
        Lim & Yutatco-Sze Law Firm.
      </span>
      <div className="text-[#cccccc] text-sm text-center block">
        Website by{" "}
        <a
          href="https://www.linkedin.com/in/boaz-sze-44b00291/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#696969] font-semibold transition-colors duration-300 hover:text-white"
        >
          Boaz Sze
        </a>
        .
      </div>
    </footer>
  )
}

export default React.memo(Footer)

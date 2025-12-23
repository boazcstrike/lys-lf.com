import React, { FC } from "react"

import lysLogo from "@/public/images/lys-white-logo-darker.png"

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
    <footer className="bg-[url('/images/zwartevilt_@2X.jpg')] bg-left-top bg-repeat px-8 py-8 pb-12 flex flex-col items-center">
      <div className="max-w-[20em] mb-4">
        <img src={lysLogo.src} alt="LYS Logo" loading="lazy" />
      </div>
      <span className="text-[#cccccc] text-sm text-center block">
        Lim & Yutatco-Sze Law Firm.
      </span>
      <div className="text-[#cccccc] text-sm text-center block">
        Website by{" "}
        <a
          href="https://www.facebook.com/boazcstrike/"
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

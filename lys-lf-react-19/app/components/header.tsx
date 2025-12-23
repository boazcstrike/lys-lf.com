import React, { useState, useEffect, FC } from "react"
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"

import lysLogo from "@/public/images/lys-white-logo-darker.png"

/**
 * Header component - displays hero section with firm logo and contact info
 * 
 * Renders a full-screen header with:
 * - Random background image (one of two options)
 * - LYS Law Firm logo
 * - Phone number and email contact info
 * - Firm description
 * 
 * @component
 * @returns {React.ReactNode} Hero section element
 */
const Header: FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("")

  useEffect(() => {
    const bg = Math.random() < 0.5
      ? "bg-[linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.7)),url('/images/LYS-29.jpg')]"
      : "bg-[linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.7)),url('/images/LYS-24.jpg')]"
    setBackgroundImage(bg)
  }, [])

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-fixed bg-center bg-no-repeat bg-cover px-8 ${backgroundImage}`}
    >
      <div className="max-w-[45em]">
        <img
          src={lysLogo.src}
          alt="lys-landing-logo"
          key={lysLogo.src}
          className="min-w-0"
          fetchPriority="high"
        />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[#bcbcbc] font-['Noticia_Text'] text-[1.55em] tracking-[0.25em] flex items-center gap-2">
            <FaPhoneAlt className="text-[0.75em]" />
            (02)<span className="text-white">8-293-8254</span>
          </h1>
          <h1 className="text-[#bcbcbc] font-['Noticia_Text'] text-[1.55em] flex items-center gap-2">
            <FaEnvelope className="text-[0.75em]" />
            limandsze.lf@gmail.com
          </h1>
        </div>
        <h2 className="text-white text-[1.25em] p-5 text-center">
          The Lim <span className="text-[#bcbcbc]">&</span> Yutatco-Sze Law Firm{" "}
          <span className="text-[#bcbcbc]">(LYS)</span> is a full-service law
          office established in 2015.
        </h2>
        <h3 className="text-white font-['Raleway'] text-[1em] tracking-[0.05em] p-4 text-center">
          It is engaged in diversified practice of law primarily focusing in
          corporate, labor and and tax laws. The Firm likewise represents both
          corporate and individual clients in different courts and administrative
          agencies in the country.
        </h3>
      </div>
    </div>
  )
}

export default React.memo(Header)

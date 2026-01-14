'use client'

import React, { useState, useEffect, FC } from "react"
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"

import lysLogo from "@/public/images/optimized/lys-white-logo-darker.webp"
import { siteConfig, headerConfig } from "@/app/assets/data/site-config"
import Spinner from "@/app/components/spinner"

const Header: FC = (): React.ReactNode => {
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({})
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * headerConfig.backgroundImages.length)
    const selectedImage = headerConfig.backgroundImages[randomIndex]
    
    if (!selectedImage) {
      setIsImageLoaded(true)
      return
    }

    const img = new Image()
    img.onload = () => {
      setBackgroundStyle({
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.7)),url('${selectedImage}')`
      })
      setIsImageLoaded(true)
    }
    img.src = selectedImage
  }, [])

  if (!isImageLoaded) {
    return (
      <section
        aria-label="LYS Law Firm header loading"
        className="flex flex-col items-center justify-center h-screen bg-lys-black px-8"
      >
        <Spinner size="lg" label="Preparing your case..." />
      </section>
    )
  }

  return (
    <section
      aria-label="LYS Law Firm header"
      className="flex flex-col items-center justify-center h-screen bg-fixed bg-center bg-no-repeat bg-cover px-8 animate-fade-in"
      style={backgroundStyle}
    >
      <div className="max-w-[45em]">
        <img
          src={lysLogo.src}
          alt="LYS Law Firm logo"
          className="min-w-0"
          fetchPriority="high"
        />
        <div className="flex flex-col items-center gap-2">
<p className="text-[#bcbcbc] font-noticia text-[1.55em] tracking-[0.25em] flex items-center gap-2">
            <FaPhoneAlt className="text-[0.75em]" aria-hidden="true" />
            <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:underline">
              {siteConfig.contact.phoneDisplay}
            </a>
          </p>
          <p className="text-[#bcbcbc] font-noticia text-[1.55em] flex items-center gap-2">
            <FaEnvelope className="text-[0.75em]" aria-hidden="true" />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
        <h1 className="text-white text-[1.25em] p-5 text-center">
          The Lim <span className="text-lys-gray">&</span> Yutatco-Sze Law Firm <span className="text-lys-gray">({siteConfig.firmShortName})</span> is a full-service law office established in {siteConfig.establishedYear}.
        </h1>
        <p className="text-white font-raleway text-[1em] tracking-[0.05em] p-4 text-center">
          {headerConfig.description}
        </p>
      </div>
    </section>
  )
}

export default React.memo(Header)

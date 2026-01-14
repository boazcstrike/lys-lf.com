"use client"

import React, { FC, useState, useEffect, useRef } from "react"
import Spinner from "@/app/components/spinner"
import type { Employee } from "@/app/types"

const Profile: FC<Omit<Employee, "key">> = ({ img, name, position, mobile, email }): React.ReactNode => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Handle case where image is already cached (onLoad won't fire)
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
      setIsImageLoaded(true)
    }
  }, [])

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        {img && (
          <div className="animate-fade-in delay-75 relative">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size="md" label="Introducing your legal team..." />
              </div>
            )}
            <img
              ref={imgRef}
              src={img}
              alt={`${name} profile photo`}
              className={`rounded-full max-w-[15em] shadow-[2px_2px_16px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${!isImageLoaded ? "opacity-0" : "opacity-100"}`}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)}
            />
          </div>
        )}

        <div className="flex flex-col items-center mt-6 text-center text-[#606060] font-serif">
          <h2 className="text-[1.45em] font-extrabold mb-1">{name}</h2>
          {position && <h5 className="text-[1.25em] font-light mb-4">{position}</h5>}
          <hr className="w-64 mb-4 border-[#bcbcbc]" />
          <div className="space-y-2">
            {mobile && <h3 className="text-base">{mobile}</h3>}
            {email && <h3 className="text-base">{email}</h3>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Profile)

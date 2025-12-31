import React, { FC } from "react"

/**
 * MiniShowcase component - displays a hero section with text overlay
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display in the showcase
 * @returns {React.ReactNode} Hero section with text overlay
 */
interface MiniShowcaseProps {
  text: string
}

const MiniShowcase: FC<MiniShowcaseProps> = ({ text }) => {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/optimized/LYS-38.webp')] bg-cover bg-fixed bg-center bg-no-repeat pt-12 pb-8 text-center">
      <h2 className="font-raleway font-bold uppercase text-[2.6em] text-white my-[1.2em]">
        {text}
      </h2>
    </div>
  )
}

export default React.memo(MiniShowcase)

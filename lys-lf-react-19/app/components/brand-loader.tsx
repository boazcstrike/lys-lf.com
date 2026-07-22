import { FC } from "react"
import { FaBalanceScale } from "react-icons/fa"

import lysLogo from "@/public/images/optimized/lys-white-logo-darker.webp"

interface BrandLoaderProps {
  label?: string
}

/**
 * BrandLoader — full-screen, on-brand loading state.
 *
 * Scales-of-justice icon "weighs" left/right (tilt), the LYS wordmark carries a
 * slow light sheen, and three dots pulse under a status label. Themed to the
 * firm rather than a generic spinner. Reduced-motion users see it static.
 */
const BrandLoader: FC<BrandLoaderProps> = ({
  label = "Preparing your case",
}) => {
  return (
    <div
      role="status"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-lys-black px-8"
    >
      {/* Wordmark with light sheen */}
      <div className="logo-sheen max-w-[16em]">
        <img src={lysLogo.src} alt="LYS Law Firm" fetchPriority="high" />
      </div>

      {/* Balance beam tilts from the top pivot, like weighing evidence */}
      <FaBalanceScale
        aria-hidden="true"
        className="text-lys-gray text-4xl animate-tilt"
        style={{ transformOrigin: "50% 15%" }}
      />

      <div className="flex flex-col items-center gap-3">
        <p className="font-raleway tracking-[0.25em] text-sm uppercase text-lys-gray">
          {label}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-lys-gray animate-dot"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">{label}</span>
    </div>
  )
}

export default BrandLoader

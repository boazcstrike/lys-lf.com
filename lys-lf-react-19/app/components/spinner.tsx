import { FC } from "react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  label?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-9 w-9",
  lg: "h-14 w-14",
}

/**
 * Spinner — branded dual-ring loader.
 *
 * Outer track in brand gray, an inner arc counter-rotating in lys-black for
 * a refined, weighted feel over a plain single-border spin.
 */
const Spinner: FC<SpinnerProps> = ({
  size = "md",
  label = "Loading...",
  fullScreen = false,
}) => {
  const spinnerElement = (
    <div
      role="status"
      aria-label={label}
      className={`relative ${sizeClasses[size]}`}
    >
      {/* Outer ring — full track, forward spin */}
      <span className="absolute inset-0 rounded-full border-2 border-lys-gray/40 border-t-lys-black animate-spin-slow" />
      {/* Inner arc — counter-rotates for depth */}
      <span className="absolute inset-[3px] rounded-full border-2 border-transparent border-b-lys-gray-dark animate-spin-reverse" />
      <span className="sr-only">{label}</span>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinnerElement}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">{spinnerElement}</div>
  )
}

export default Spinner

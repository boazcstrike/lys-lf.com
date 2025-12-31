import { FC } from "react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  label?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
}

const Spinner: FC<SpinnerProps> = ({ 
  size = "md", 
  label = "Loading...",
  fullScreen = false 
}) => {
  const spinnerElement = (
    <div
      role="status"
      aria-label={label}
      className={`
        ${sizeClasses[size]}
        animate-spin
        rounded-full
        border-gray-300
        border-t-gray-800
      `}
    >
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
    <div className="flex items-center justify-center p-4">
      {spinnerElement}
    </div>
  )
}

export default Spinner

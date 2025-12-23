import { FC } from "react"

/**
 * SectionTitle component - displays a styled section heading
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title text to display
 * @returns {React.ReactNode} Styled section title
 */
interface SectionTitleProps {
  title: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <div className="flex justify-center">
    <h2 className="uppercase tracking-wider font-bold text-[1.25em] px-2 py-2 my-6 text-[#222222] border-t border-b border-[#bcbcbc] w-[20em] text-center">
      {title}
    </h2>
  </div>
)

export default SectionTitle

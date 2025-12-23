import { FC } from "react"

import Role from "@/app/components/role"

/**
 * Team component - displays firm's legal team organized by role
 * 
 * Displays team members in sections:
 * - Partners section with photos
 * - Associate Lawyers section
 * 
 * @component
 * @returns {React.ReactNode} Team listing element
 */

const Team: FC = () => {
  return (
    <div className="team-container flex flex-col items-center">
      <Role
        position="Partners"
        employees={[
          {
            key: "Atty. Gloriosa Yutatco-Sze",
            name: "Atty. Gloriosa Yutatco-Sze",
            pic: "/images/LYS-GLO-7-18-23.jpg",
          },
          {
            key: "Atty. Juanito R. Lim, Jr.",
            name: "Atty. Juanito R. Lim, Jr.",
            pic: "/images/LYS-JUN-7-18-23.jpg",
          },
        ]}
      />
      <Role
        position="Associate Lawyers"
        employees={[
          {
            key: "Atty. Albert Caesar M. Pereña",
            name: "Atty. Albert Caesar M. Pereña",
          },
          {
            key: "Atty. Dana F. Ruedas",
            name: "Atty. Dana F. Ruedas",
          },
          {
            key: "Atty. Jan Ethan L. Gordola",
            name: "Atty. Jan Ethan L. Gordola",
          },
        ]}
      />
    </div>
  )
}

export default Team

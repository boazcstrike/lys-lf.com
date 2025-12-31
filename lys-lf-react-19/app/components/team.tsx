import React, { FC } from "react"

import Role from "@/app/components/role"
import { teamRoles } from "@/app/assets/data/team"

const Team: FC = () => {
  return (
    <div className="team-container flex flex-col items-center">
      {teamRoles.map((role) => (
        <Role
          key={role.position}
          position={role.position}
          employees={role.employees}
        />
      ))}
    </div>
  )
}

export default React.memo(Team)

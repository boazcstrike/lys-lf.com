import React, { FC } from "react"

import Profile from "@/app/components/profile"
import SectionTitle from "@/app/components/section-title"
import type { Employee } from "@/app/types"

interface RoleProps {
  position: string
  employees: Employee[]
}

const Role: FC<RoleProps> = ({ position, employees }): React.ReactNode => {
  return (
    <div className="mb-8">
      <SectionTitle title={position} />
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        {employees.map((emp) => (
          <Profile
            key={emp.name}
            img={emp.img}
            name={emp.name}
            position={emp.position}
            mobile={emp.mobile}
            email={emp.email}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Role)

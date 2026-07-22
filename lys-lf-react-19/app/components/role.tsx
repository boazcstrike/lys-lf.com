import React, { FC } from "react"

import Profile from "@/app/components/profile"
import SectionTitle from "@/app/components/section-title"
import Reveal from "@/app/components/reveal"
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
        {employees.map((emp, index) => (
          <Reveal key={emp.name} delay={index * 80}>
            <Profile
              img={emp.img}
              name={emp.name}
              position={emp.position}
              mobile={emp.mobile}
              email={emp.email}
              bio={emp.bio}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Role)

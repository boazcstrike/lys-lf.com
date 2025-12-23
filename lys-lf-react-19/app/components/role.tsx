import { FC } from "react"

import Profile from "@/app/components/profile"
import SectionTitle from "@/app/components/section-title"

/**
 * Role component - displays a group of employees in a specific role/position
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.position - The role/position title
 * @param {Array<{name: string, pic?: string, position?: string, mobile?: string, email?: string}>} props.employees - Array of employee data
 * @returns {React.ReactNode} Section displaying all employees in this role
 */
interface Employee {
  key?: string
  name: string
  pic?: string
  position?: string
  mobile?: string
  email?: string
}

interface RoleProps {
  position: string
  employees: Employee[]
}

const Role: FC<RoleProps> = ({ position, employees }) => {
  return (
    <div className="mb-8">
      <SectionTitle title={position} />
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        {employees.map((emp) => (
          <Profile
            key={emp.name}
            img={emp.pic}
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

export default Role

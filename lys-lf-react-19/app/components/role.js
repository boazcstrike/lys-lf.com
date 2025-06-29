import React from "react"

import Profile from "./profile"
import SectionTitle from "./section-title"

function Role(props) {
  return (
    <div className="mb-8">
      <SectionTitle title={props.position} />
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        {props.employees.map((emp) => (
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

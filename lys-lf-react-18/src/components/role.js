import React from "react"

import Profile from "./profile"

function Role(props) {
  return (
    <div className="team-role-container">
      <h2 className="team-titles text-center">{props.position}</h2>
      <div className="profile-container flex md:flex-row lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col xs:flex-col">
        {props.employees.map((emp) => {
          return (
            <Profile
              key={emp.name}
              img={emp.pic}
              name={emp.name}
              position={emp.position}
              mobile={emp.mobile}
              email={emp.email}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Role

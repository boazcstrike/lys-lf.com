import React from "react"

import Profile from "@/app/components/profile"

import Role from "@/app/components/role"


function Team() {
  return (
    <div className="team-container flex flex-col items-center">
      <Role
        position="Partners"
        employees={[
          {
            key: "Atty. Gloriosa Yutatco-Sze",
            name: "Atty. Gloriosa Yutatco-Sze",
            // position: "Partner",
            // email: "gloriosasze@gmail.com",
            pic: "/images/LYS-GLO-7-18-23.jpg",
          },
          {
            key: "Atty. Juanito R. Lim, Jr.",
            name: "Atty. Juanito R. Lim, Jr.",
            // position: "Partner",
            // email: "juanitolim@gmail.com",
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
            // position: "Associate Lawyer",
            // email: "amp.lslawfirm@gmail.com",
          },
          {
            key: "Atty. Dana F. Ruedas",
            name: "Atty. Dana F. Ruedas",
            // position: "Associate Lawyer",
          },
          {
            key: "Atty. Jan Ethan L. Gordola",
            name: "Atty. Jan Ethan L. Gordola",
            // position: "Associate Lawyer",
          },
        ]}
      />
    </div>
  )
}


export default Team

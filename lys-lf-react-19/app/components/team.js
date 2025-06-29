import React from "react"

import Profile from "@/app/components/profile"

import gloPic from "@/assets/images/LYS-GLO-7-18-23.jpg"
import junPic from "@/assets/images/LYS-JUN-7-18-23.jpg"

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
            pic: gloPic.src,
          },
          {
            key: "Atty. Juanito Lim, Jr.",
            name: "Atty. Juanito Lim, Jr.",
            // position: "Partner",
            // email: "juanitolim@gmail.com",
            pic: junPic.src,
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

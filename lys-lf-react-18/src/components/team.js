import React from "react"

import Profile from "./profile"

import gloPic from "../../public/images/LYS-20.jpg"
import junPic from "../../public/images/LYS-21.jpg"

import Role from "./role"

function Team() {
  return (
    <div className="team-container flex flex-col items-center">
      <Role
        position="Partners"
        employees={[
          {
            key: "Atty. Gloriosa Yutatco-Sze",
            name: "Atty. Gloriosa Yutatco-Sze",
            position: "Partner",
            email: "gloriosasze@gmail.com",
            pic: gloPic.src,
          },
          {
            key: "Atty. Juanito Lim, Jr.",
            name: "Atty. Juanito Lim, Jr.",
            position: "Partner",
            email: "juanitolim@gmail.com",
            pic: junPic.src,
          },
        ]}
      />
      <Role
        position="Senior Associate Lawyers"
        employees={[
          {
            key: "Atty. Mary Elizabeth Christine D. Rodriguez",
            name: "Atty. Mary Elizabeth Christine D. Rodriguez",
            position: "Senior Associate Lawyer",
            email: "mecdr.lslawfirm@gmail.com",
          },
        ]}
      />
      <Role
        position="Junior Associate Lawyers"
        employees={[
          {
            key: "Atty. Albert Caesar M. Pereña",
            name: "Atty. Albert Caesar M. Pereña",
            position: "Junior Associate Lawyer",
            email: "amp.lslawfirm@gmail.com",
          },
          {
            key: "Atty. Dianne G. Comon",
            name: "Atty. Dianne G. Comon",
            position: "Junior Associate Lawyer",
          },
          {
            key: "Atty. Ronan Angelo R. Monzon",
            name: "Atty. Ronan Angelo R. Monzon",
            position: "Junior Associate Lawyer",
          },
        ]}
      />
    </div>
  )
}

export default Team

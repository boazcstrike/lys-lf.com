import React from "react"
import pic from "../../public/images/customer-512.png"

function Profile(props) {
  return (
    <div className="profile">
      <div className="profile-details flex flex-col items-center">
        <div className="profile-image-wrapper fadeIn delay-05s wow">
          {props.img ? <img src={props.img} /> : <img src={pic.src} />}
        </div>
        <div className="flex-col flex items-center content-center">
          <h2 className="name">{props.name}</h2>
          <h5 className="position">{props.position}</h5>
          <hr />
          <div className="flex flex-col">
            {props.mobile ? <h3>{props.mobile}</h3> : null}
            {props.email ? <h3>{props.email}</h3> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

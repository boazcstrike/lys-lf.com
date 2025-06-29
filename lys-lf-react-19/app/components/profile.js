import React from "react"
import pic from "@/assets/images/customer-512.png"

function Profile({ img, name, position, mobile, email }) {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        {img && (
          <div className="animate-fade-in delay-75">
            <img
              src={img || pic.src}
              alt="profile"
              className="rounded-full max-w-[15em] shadow-[2px_2px_16px_rgba(0,0,0,0.25)]"
            />
          </div>
        )}

        <div className="flex flex-col items-center mt-6 text-center text-[#606060] font-serif">
          <h2 className="text-[1.45em] font-extrabold mb-1">{name}</h2>
          <h5 className="text-[1.25em] font-light mb-4">{position}</h5>
          <hr className="w-64 mb-4 border-[#bcbcbc]" />
          <div className="space-y-2">
            {mobile && <h3 className="text-base">{mobile}</h3>}
            {email && <h3 className="text-base">{email}</h3>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
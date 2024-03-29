import React, { useState, useEffect } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faPhone, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons"

import lysLogo from "../../public/images/lys-white-logo-darker.png"

function Header() {
  library.add(faPhone, faEnvelopeOpenText)
  const [backgroundImage, setBackgroundImage] = useState("")

  useEffect(() => {
    const randomNumber = Math.random() * 2
    const backgroundImageName =
      randomNumber < 1 ? "header-container-1 " : "header-container-2 "
    setBackgroundImage(backgroundImageName)
  }, [])

  return (
    <div
      className={`flex flex-col ${backgroundImage}items-center content-center h-screen justify-center`}
    >
      <div className="header-wrapper">
        <img
          src={lysLogo.src}
          className="lys-landing-logo"
          alt="lys-landing-logo"
          key={lysLogo.src}
        />
        <h1 className="text-gray phone-text">
          <span>
            <FontAwesomeIcon icon={faPhone} />
          </span>
          (02)8-293-8254
        </h1>
        <h1 className="text-gray email-text">
          <span>
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </span>
          limandsze.lf@gmail.com
        </h1>
        <h2 className="text-white">
          The Lim <span className="text-gray">&</span> Yutatco-Sze Law Firm{" "}
          <span className="text-gray">(LYS)</span> is a full-service law office
          established in 2015.
        </h2>
        <h3 className="text-white">
          It is engaged in diversified practice of law primarily focusing in
          corporate, labor and and tax laws. The Firm likewise represents both
          corporate and individual clients in different courts and
          administrative agencies in the country.
        </h3>
      </div>
    </div>
  )
}

export default Header

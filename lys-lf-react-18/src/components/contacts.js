import React, { useState, useEffect } from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faClock,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

import Map from "../components/map"
// import Map from "../components/samples/sample-overlay-view"

function Contact() {
  library.add(faMapMarkerAlt, faClock, faPhone, faEnvelope)
  return (
    <div className="contact-container">
      <Map draggable={false} />
      <div className="contact-wrapper flex sm:flex-row justify-around flex-col items-center">
        <div className="contact-info-box">
          <h3>
            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Address:
            <br />
            <br />
            <span>
              Unit 901 Parkway Corporate Center
              <br />
              Corporate Ave. corner Parkway Place
              <br />
              Filinvest City, Alabang
              <br />
              Muntinlupa City 1781
            </span>
          </h3>
        </div>

        <div className="contact-info-box">
          <h3>
            <FontAwesomeIcon icon={faClock} size="xs"></FontAwesomeIcon> Hours:
            <br />
            <br />
            <span>
              <strong>Monday-Friday</strong> 8am - 5pm
            </span>
          </h3>
        </div>

        <div className="contact-info-box">
          <h3>
            <FontAwesomeIcon icon={faPhone} size="xs"></FontAwesomeIcon>{" "}
            Contact:
            <br />
            <span className="phone-text"> (02) 8-293-8254</span>
            <br />
            <br />
            <FontAwesomeIcon icon={faEnvelope} size="xs"></FontAwesomeIcon>{" "}
            Email:
            <br />
            <span> limandsze.lf@gmail.com</span>
            <br />
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Contact

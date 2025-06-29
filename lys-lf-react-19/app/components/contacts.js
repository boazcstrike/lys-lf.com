import React from "react"

import { 
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import Map from "@/components/map"

function Contact() {
  return (
    <div className="contact-container">
      <Map draggable={false} />
      <div className="contact-wrapper flex sm:flex-row justify-around flex-col items-center">
        <div className="contact-info-box">
          <h3>
            <FaMapMarkerAlt /> Address:
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
            <FaClock /> Hours:
            <br />
            <br />
            <span>
              <strong>Monday-Friday</strong> 8am - 5pm
            </span>
          </h3>
        </div>

        <div className="contact-info-box">
          <h3>
            <FaPhone /> Contact:
            <br />
            <span className="phone-text"> (02) 8-293-8254</span>
            <br />
            <br />
            <FaEnvelope /> Email:
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

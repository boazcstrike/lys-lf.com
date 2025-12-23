import { FC } from "react"
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa"

import Map from "@/app/components/map"

/**
 * Contact component - displays firm contact information and location map
 * 
 * @component
 * @returns {React.ReactNode} Contact section with address, hours, and contact details
 */
const Contact: FC = () => {
  return (
    <div className="bg-[url('/images/bg-map.png')] bg-fixed bg-repeat pb-20 px-6">
      <Map />

      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 mt-8">
        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaMapMarkerAlt className="inline-block mr-2" />
            Address:
            <br />
            <br />
            <span className="font-helvetica text-[1em] font-normal">
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

        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaClock className="inline-block mr-2" />
            Hours:
            <br />
            <br />
            <span className="font-helvetica text-[1em] font-normal">
              <strong>Monday–Friday</strong> 8am - 5pm
            </span>
          </h3>
        </div>

        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaPhone className="inline-block mr-2" />
            Contact:
            <br />
            <span className="block font-noticia text-[1.05em]">
              (02) 8-293-8254
            </span>
            <br />
            <FaEnvelope className="inline-block mr-2" />
            Email:
            <br />
            <span className="font-helvetica text-[1.05em] font-normal">
              limandsze.lf@gmail.com
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Contact

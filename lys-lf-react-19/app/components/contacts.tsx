import React, { FC } from "react"
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa"

import Map from "@/app/components/map"
import { siteConfig } from "@/app/assets/data/site-config"

const Contacts: FC = (): React.ReactNode => {
  const { address } = siteConfig.location
  const { officeHours, contact } = siteConfig

  return (
    <div className="bg-[url('/images/bg-map.png')] bg-fixed bg-repeat pb-20 px-6">
      <Map />

      <div className="flex flex-col sm:flex-row justify-around items-center gap-8 mt-8">
        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaMapMarkerAlt className="inline-block mr-2" aria-hidden="true" />
            Address:
            <br />
            <br />
            <span className="font-helvetica text-[1em] font-normal">
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.line3}
              <br />
              {address.city} {address.postalCode}
            </span>
          </h3>
        </div>

        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaClock className="inline-block mr-2" aria-hidden="true" />
            Hours:
            <br />
            <br />
            <span className="font-helvetica text-[1em] font-normal">
              <strong>{officeHours.days}</strong> {officeHours.hours}
            </span>
          </h3>
        </div>

        <div className="text-[#1a1a1a] text-center">
          <h3 className="font-noticia text-[1.55em] pt-2 pb-4">
            <FaPhone className="inline-block mr-2" aria-hidden="true" />
            Contact:
            <br />
            <span className="block font-noticia text-[1.05em]">
              {contact.phone}
            </span>
            <br />
            <FaEnvelope className="inline-block mr-2" aria-hidden="true" />
            Email:
            <br />
            <span className="font-helvetica text-[1.05em] font-normal">
              {contact.email}
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Contacts)

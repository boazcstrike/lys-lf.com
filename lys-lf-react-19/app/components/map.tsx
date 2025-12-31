'use client'

import React, { useState, useCallback, FC } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import Spinner from "@/app/components/spinner"

import pcc from "@/public/images/pcc.jpg"
import { siteConfig } from "@/app/assets/data/site-config"

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
}

const divStyle: React.CSSProperties = {
  padding: 15,
}

const Map: FC = () => {
  const { coordinates, address, markerTitle } = siteConfig.location
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const [, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-gray-100 text-gray-600">
        <p className="text-lg font-serif">Location currently unavailable.</p>
        <p className="text-sm mt-2">
          Please contact us directly at {siteConfig.contact.phone}
        </p>
      </div>
    )
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        key={markerTitle}
        position={coordinates}
        draggable={false}
      />
      <InfoWindow position={coordinates}>
        <div style={divStyle}>
          <img src={pcc.src} className="w-15 h-15 mb-2" alt={markerTitle} loading="lazy" />
          <h1>
            <b>{address.line1}</b>
          </h1>
          <p>
            {address.line2}
            <br />
            {address.line3} {address.city} {address.postalCode}
          </p>
        </div>
      </InfoWindow>
    </GoogleMap>
  ) : (
    <Spinner size="sm" label="Locating our office..." />
  )
}

export default React.memo(Map)

import React, { useState, useCallback, FC } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { ClipLoader } from "react-spinners"

import pcc from "@/public/images/pcc.jpg"

/**
 * Map component - displays interactive Google Maps with firm location
 * 
 * Features:
 * - Interactive Google Map centered on Parkway Corporate Center
 * - Marker at firm location (Manila, Philippines)
 * - Info window showing firm address with image
 * - Loading spinner while map loads
 * - Error handling for API failures
 * 
 * @component
 * @returns {React.ReactNode} Google Map or loading/error state
 */
interface MapContainerStyle extends React.CSSProperties {
  width: string
  height: string
}

interface MapCenter {
  lat: number
  lng: number
}

interface DivStyle extends React.CSSProperties {
  padding: number
}

const containerStyle: MapContainerStyle = {
  width: "100%",
  height: "400px",
}

const center: MapCenter = {
  lat: 14.4152799,
  lng: 121.0380395,
}

const divStyle: DivStyle = {
  padding: 15,
}

const Map: FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  })

  const [, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  if (loadError) {
    return <div>The map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        key="Parkway Corporate Center"
        position={center}
        draggable={false}
      />
      <InfoWindow position={center}>
        <div style={divStyle}>
          <img src={pcc.src} className="w-15 h-15 mb-2" alt="Parkway Corporate Center" loading="lazy" />
          <h1>
            <b>Unit 901 Parkway Corporate Center</b>
          </h1>
          <p>
            Corporate Ave. corner Parkway Place
            <br />
            Filinvest City, Alabang Muntinlupa City 1781
          </p>
        </div>
      </InfoWindow>
    </GoogleMap>
  ) : (
    <ClipLoader color="#bcbcbc" loading={true} size={25} />
  )
}

export default React.memo(Map)

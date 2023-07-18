import React, { useState, useEffect, useCallback } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import ClipLoader from "react-spinners/ClipLoader"

import pcc from "../../public/images/pcc.jpg"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: 14.4152799,
  lng: 121.0380395,
}

const divStyle = {
  padding: 15,
}

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (loadError) {
    return <div>The map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      defaultZoom={16}
      defaultCenter={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        key="Parkway Corporate Center"
        name="Parkway Corporate Center"
        position={center}
        draggable={false}
        editable={false}
      ></Marker>
      <InfoWindow position={center}>
        <div style={divStyle}>
          <img src={pcc.src} className="map-info-pic" />
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

import React from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow
} from '@react-google-maps/api';

import pcc from '../images/pcc.jpg'

import './styles.scss'

const containerStyle = {
    width: '100vw',
    height: '400px'
};

const center = {
    lat: 14.4152799,
    lng: 121.0380395
};

const divStyle = {
    padding: 15
}

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])



    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                name="Parkway Corporate Center"
                position={center}
                draggable={false}
                editable={false}
                title="Unit 901 Parkway Corporate Center Corporate Ave. corner Parkway Place"
                visible={true}
            >
                <InfoWindow
                    position={center}
                >
                    <div style={divStyle}>
                        <img src={pcc} className="map-info-pic" />
                        <h1><b>Unit 901 Parkway Corporate Center</b></h1>
                        <p>Corporate Ave. corner Parkway Place
                            <br />
                            Filinvest City, Alabang
                            Muntinlupa City 1781
                        </p>
                    </div>
                </InfoWindow>
            </Marker>

        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)
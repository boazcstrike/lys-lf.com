import React from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import ClipLoader from "react-spinners/ClipLoader";

import pcc from '../images/pcc.jpg'

import './styles.scss'

const containerStyle = {
    width: '100%',
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
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(
        function onLoad(mapInstance) {
            // do something with map Instance
        }
    )

    const onUnmount = React.useCallback(function callback(map) {
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
    ) : <ClipLoader
            color='#bcbcbc'
            loading={true}
            size={25}
        />
}

export default React.memo(Map)
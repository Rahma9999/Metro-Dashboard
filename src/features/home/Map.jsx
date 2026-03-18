import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet"

import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

import './Map.css'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

function Map() {
    const [mapPosition] = useState([51.505, -0.09]);

    return (
        <div className='mapContainer mb-2'>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className="map">
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            <Marker position={mapPosition}>
            <Popup>
                A pretty CSS3 popup.
            </Popup>
            </Marker>

        </MapContainer>
        </div>
    )
}

export default Map
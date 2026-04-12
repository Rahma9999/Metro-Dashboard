import React, { memo, useCallback, useEffect, useState } from 'react'
import './Map.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet"

import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import redMarkerImg from '../../assets/images/redMarker.png'
import blueMarkerImg from '../../assets/images/blueMarker.png'
import greenMarkerImg from '../../assets/images/greenMarker.png'

import { HomeController } from '../../controllers/HomeController'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon
const redMarker = L.icon({
    iconUrl: redMarkerImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
});

const blueMarker = L.icon({
    iconUrl: blueMarkerImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
});

const greenMarker = L.icon({
    iconUrl: greenMarkerImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
});

function Map() {
    const [mapPosition] = useState([
                30.0259985,
                31.20122
            ]);
    const { allLocation } = HomeController();
    const [stations, setStations] = useState([]);

    const getLocation = async () => {
        try{
            let res = await allLocation();
            setStations(res.data || res);
            // console.log("station location: ", res);
        }catch(err){
            throw err;
        }
    }
    useEffect(() => {
    getLocation();
}, []);

    const getStationIcon = useCallback((station) => {
            if (station.line === 1) return blueMarker;
            if (station.line === 2) return redMarker;
            return greenMarker;
        }, []);

    return (
        <div className='mapContainer mb-2'>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className="map">
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            {
            stations.map((station) => {
                if(!station.lat && !station.lng) return null;
                return (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={getStationIcon(station)}>
                    <Popup>
                        Station: {station.name}, Line: {station.line}
                    </Popup>
                    </Marker>
                );
            })}

        </MapContainer>
        </div>
    )
}

export default memo(Map)
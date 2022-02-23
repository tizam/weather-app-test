import { useEffect, useState, useRef } from 'react'
import Map, { GeolocateControl } from 'react-map-gl';
import axios from 'axios'

function App() {
  const geolocateControlRef = useRef(null)

  const [position, setPosition] = useState({
    lng: 3.066514,
    lat: 36.7596531
  })

  const [viewState, setViewState] = useState({
    longitude: 3.066514,
    latitude: 36.7596531,
    zoom: 14
  });

  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: '100vw', height: '100vh' }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_TOKEN}
        onClick={(evt) => setPosition(
          { lng: evt.lngLat.lng, lat: evt.lngLat.lat }
        )}
      >
        <GeolocateControl
          ref={geolocateControlRef}
          trackUserLocation={true}
          onGeolocate={(evt) => setPosition(
            { lng: evt.coords.longitude, lat: evt.coords.latitude }
          )} />
      </Map>
    </div>
  )
}

export default App

import React, { useState, useRef, useContext } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker } from 'react-map-gl';
import styles from './App.module.css';
import Wrapper from './components/wrapper/wrapper';
import { PositionContext } from './context/position-context';
import locationPNG from './location.png';

function App() {
  const geolocateControlRef = useRef(null);

  const { position, setPosition, address } = useContext(PositionContext);

  const [viewState, setViewState] = useState({
    longitude: 3.066514,
    latitude: 36.7596531,
    zoom: 14
  });

  return (
    <div className={styles.app}>
      {address && <h1 className={styles.address}>{address}</h1>}
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
        <FullscreenControl />
        <Marker longitude={position.lng} latitude={position.lat} anchor="bottom" >
          <img src={locationPNG} alt='location' style={{ width: 32, height: 32 }} />
        </Marker>
      </Map>
      <Wrapper />
    </div>
  );
}

export default App;

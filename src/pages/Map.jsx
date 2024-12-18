import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFountains } from '../hooks/useFountains';

export default function MapComponent() {
  const { loadFountains, fountains } = useFountains()

  const [viewport, setViewport] = useState({
    latitude: 41.389321,
    longitude: 2.163477,
    zoom: 13
  });

  useEffect(() => {
    loadFountains();
  }, []);


  return (
    <div>
      <h1>Map ⛲️</h1>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >

        {console.log(fountains[0])}
        {console.log('Fountains: ', fountains)}

        <Marker
          key="testMarker"
          latitude={41.389321}
          longitude={2.163477}
        >
          📍
        </Marker>

        {fountains && fountains.map(fountain => (
          <Marker
            key={fountain.ID} // El id sigue siendo único para cada marcador
            longitude={fountain.LONGITUDE}
            latitude={fountain.LATITUDE}
          >
            <h2>📍</h2>
          </Marker>
        ))}


      </Map>
    </div>
  );
}
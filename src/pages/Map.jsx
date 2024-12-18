import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFountains } from '../hooks/useFountains';

export default function MapComponent() {
  const [viewport, setViewport] = useState({
    latitude: 41.389321,
    longitude: 2.163477 ,
    zoom: 13
  });

  useEffect(() => {
    loadFountains();
  }, []); 

  const { loadFountains, fountains } = useFountains()

  return (
    <div>
      <h1>Map ⛲️</h1>
      <Map
        mapboxAccessToken={import.meta.env.MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >

      
      {console.log('Fountains: ', fountains)}

        {/* {fountains.map(fountain => {
          return (
            <Marker key={fountain.id}
          latitude={fountain.latitude} 
          longitude={fountain.longitude}
        >
          📍
        </Marker>
          )
        })} */}

      </Map>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFountains } from '../hooks/useFountains';

export default function MapComponent() {
 const { loadFountains, fountains } = useFountains();

 const [viewport, setViewport] = useState({
   latitude: 41.389321,
   longitude: 2.163477,
   zoom: 14,
 });

 const [selectedFountain, setSelectedFountain] = useState({});
 const [showPopup, setShowPopup] = useState(false);


 useEffect(() => {
   loadFountains();
 }, []);

 const handleSelectedFountain = (fountain) => {
   if (fountain.LATITUDE && fountain.LONGITUDE) {
     setSelectedFountain(fountain);
     setShowPopup(true);
     console.log('Selected fountain: ', selectedFountain);
   }
 };

 return (
   <div className=''>
     <h1 className='text-center'>Map ⛲️</h1>
     <Map
       mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
       initialViewState={viewport}
       style={{ width: '100dvw', height: '100dvh' }}
       mapStyle="mapbox://styles/mapbox/streets-v9"
     >
       {fountains &&
         fountains.map((fountain) => (
           <Marker
             key={fountain.ID}
             longitude={parseFloat(fountain.LONGITUDE)}
             latitude={parseFloat(fountain.LATITUDE)}
           >
             <button
               onClick={() => handleSelectedFountain(fountain)}
               className="bg-white border border-zinc-200 p-[2px] rounded text-sm"
             >
               📍
             </button>
           </Marker>
         ))}

       {selectedFountain && showPopup && (
         <Popup
           latitude={selectedFountain.LATITUDE}
           longitude={selectedFountain.LONGITUDE}
           onClose={() => setShowPopup(false)}
           anchor='bottom'
           className="z-50"
           onOpen={() => setShowPopup(true)}
         >
           <div className="bg-white p-2">
             <h3>Fountain Details</h3>
             <p>Latitude: {selectedFountain.LATITUDE}</p>
             <p>Longitude: {selectedFountain.LONGITUDE}</p>
           </div>
         </Popup>
       )}
     </Map>
   </div>
 );
}
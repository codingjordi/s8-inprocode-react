import { useState, useEffect, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFountains } from '../hooks/useFountains';
import '../index.css'

export default function MapComponent() {
 const { loadFountains, fountains } = useFountains();

 const [viewport, setViewport] = useState({
   latitude: 41.389321,
   longitude: 2.163477,
   zoom: 14,
 });

 const [selectedFountain, setSelectedFountain] = useState(null);

 useEffect(() => {
   loadFountains();
 }, []);

 const handleSelectedFountain = useCallback((fountain) => {
   if (fountain.LATITUDE && fountain.LONGITUDE) {
     setSelectedFountain(fountain);
     console.log('Selected fountain: ', fountain);
   }
 }, []);

 return (
   <div className='w-full h-screen'>
     <h1 className='text-center'>Map ⛲️</h1>
     <Map
       mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
       initialViewState={viewport}
       style={{ width: '100%', height: 'calc(100% - 40px)' }}
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

       {selectedFountain && (
         <Popup
           latitude={parseFloat(selectedFountain.LATITUDE)}
           longitude={parseFloat(selectedFountain.LONGITUDE)}
           onClose={() => setSelectedFountain(null)}
           closeOnClick={false}
           anchor='bottom'
           className="text-zinc-700"
         >
           <div className="h-full w-full p-2">
             <h3 className='text-lg font-bold'>Fountain Details</h3>
             <p>{selectedFountain.NAME == 'nan' ? '' : selectedFountain.NAME}</p>
             <p>{selectedFountain.STREET}, {selectedFountain.STREET_NUMBER == 'nan' ? '' : selectedFountain.STREET_NUMBER}</p>
             <p>Latitude: {selectedFountain.LATITUDE}</p>
             <p>Longitude: {selectedFountain.LONGITUDE}</p>
           </div>
         </Popup>
       )}
     </Map>
   </div>
 );
}



import * as React from 'react';
import ReactMapGL from 'react-map-gl';






const App = () => {

  const [viewport, setViewport] = React.useState({
    latitude: 26.053230,
    longitude: 87.186058,
    zoom: 9,
    width: '100vw',
    height: '100vh'
  });




  return (
    <ReactMapGL
      {...viewport}

      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    />
  )
}
export default App






















// import React, { useRef, useEffect, useState } from 'react';


// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;




// function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(87.186058);
//   const [lat, setLat] = useState(26.053230);
//   const [zoom, setZoom] = useState(9);



//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });






//   return (
//     <div className="App">
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container">

//       </div>
//     </div>
//   );
// }

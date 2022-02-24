import { useEffect, useState } from 'react';
import * as React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios'
import RoomIcon from '@mui/icons-material/Room';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

import './App.css'

const App = () => {

  const [viewport, setViewport] = React.useState({
    latitude: 26.053230,
    longitude: 87.186058,
    zoom: 9,
    width: '100vw',
    height: '100vh'
  });

  const [showPopup, setShowPopup] = React.useState(true);

  const [pins, setPins] = useState([]);


  useEffect(() => {

    const getPins = async () => {
      try {
        const { data } = await axios.get(`/pins`);

        setPins(data)




      } catch (error) {
        console.log(error);
      }
    }

    getPins()

  }, [])






  return (
    <ReactMapGL
      {...viewport}

      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/imrandil/cl00cas9t000e14s6zrokeniv"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    >


      {pins.map((pin, index) => (
        <>
          <Marker key={index} longitude={pin.long} latitude={pin.lat} anchor="bottom" >
            <RoomIcon style={{ fontSize: viewport.zoom * 5, color: 'firebrick' }} />
          </Marker>
          {showPopup && (
            <Popup longitude={87.186058} latitude={26.053230}
              closeButton={true}
              closeOnClick={false}
              anchor="bottom"
              onClose={() => setShowPopup(false)}>
              <div className='card'>
                <label htmlFor="place">Place</label>
                <h4 className='place'>Ali's Abode</h4>
                <label htmlFor="review">Review</label>
                <p className='desc'>Love this place. Out of this world!</p>
                <label htmlFor="rating">Rating</label>
                <div className='stars'>

                  <StarBorderPurple500Icon className='star' />
                  <StarBorderPurple500Icon className='star' />
                  <StarBorderPurple500Icon className='star' />
                  <StarBorderPurple500Icon className='star' />
                  <StarBorderPurple500Icon className='star' />

                </div>

                <label htmlFor="information">Information</label>
                <span className='username'>Engraved by <b>Ali Imran Adil</b></span>
                <span className='date'>1 hour ago</span>
              </div>
            </Popup>)}</>
      ))}


    </ReactMapGL>
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

import { useEffect, useState } from 'react';
import * as React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios'
import RoomIcon from '@mui/icons-material/Room';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { format } from 'timeago.js';
import './App.css'

import Register from './components/Register';
import Login from './components/Login';





const App = () => {


  const myStorage = window.localStorage


  const [viewport, setViewport] = React.useState({
    latitude: 26.053230,
    longitude: 87.186058,
    zoom: 9,
    width: '100vw',
    height: '100vh'
  });

  const [error, setError] = useState('')
  const [pins, setPins] = useState([]);

  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'))

  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)




  useEffect(() => {

    const getPins = async () => {
      try {
        const { data } = await axios.get(`https://travel-app-backend0016.herokuapp.com/api/pins`);

        setPins(data)




      } catch (error) {
        console.log(error);
      }
    }

    getPins()

  }, [])




  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }




  const handleAddClick = (e) => {

    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long
    })
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return setError('Please Login First!')
    }

    const newPin = {
      userName: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }


    try {
      const response = await axios.post(`https://travel-app-backend0016.herokuapp.com/api/pins/new-pin`, newPin);
      setPins([...pins, response.data]);
      setError('')
      setNewPlace(null)
    } catch (error) {
      console.log(error);
    }


  }




  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null)
  }



  const handleLogin = () => {
    setShowRegister(false);
    setShowLogin(true)
  }



  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false)
  }





  return (
    <ReactMapGL
      {...viewport}

      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/imrandil/cl00cas9t000e14s6zrokeniv"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick={(e) => handleAddClick(e)}
      transitionDuration="200"
    >


      {pins.map((pin) => (

        <div key={pin._id}>
          <Marker longitude={pin.long} latitude={pin.lat} offsetLeft={-viewport.zoom * 2.5} offsetTop={-viewport.zoom * 5} anchor="bottom"  >
            <RoomIcon style={{ fontSize: viewport.zoom * 5, color: pin.userName === currentUser ? 'tomato' : 'firebrick', cursor: 'pointer' }} onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)} />
          </Marker>

          {pin._id === currentPlaceId && (


            <Popup longitude={pin.long} latitude={pin.lat}
              closeButton={true}
              closeOnClick={false}
              anchor="bottom"
              onClose={() => setCurrentPlaceId(null)}>
              <div className='card'>
                <label htmlFor="place">Place</label>
                <h4 className='place'>{pin.title}</h4>
                <label htmlFor="review">Review</label>
                <p className='desc'>{pin.desc}</p>
                <label htmlFor="rating">Rating</label>
                <div className='stars'>

                  {Array(pin.rating).fill(<StarBorderPurple500Icon className='star' />)}


                </div>

                <label htmlFor="information">Information</label>
                <span className='username'>Engraved by <b>{pin.userName}</b></span>
                <span className='date'>{format(pin.createdAt)}</span>
              </div>
            </Popup>)}
        </div>

      ))}
      {newPlace && (



        <Popup longitude={newPlace.long} latitude={newPlace.lat}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
          onClose={() => setNewPlace(null)}>


          <div>
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} required />
              <label htmlFor="review">Review</label>
              <textarea rows='3' cols='5' placeholder='Say us something about it' onChange={(e) => setDesc(e.target.value)} required />
              <label htmlFor="rating">Rating</label>
              <select onChange={(e) => setRating(e.target.value)} required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

              </select>
              <button className='submitBtn' type='submit'>Add Pin</button>

            </form>
          </div>

        </Popup>)}


      {currentUser ? (<button className='button logout' onClick={handleLogout}>Log out</button>) : (<div className='buttons'>
        <button className='button login' onClick={handleLogin}>Login</button>
        <button className='button register' onClick={handleRegister}>Register</button>
      </div>)}


      {showRegister && <Register setShowRegister={setShowRegister} setShowLogin={setShowLogin} />}
      {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} setShowRegister={setShowRegister} />}





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

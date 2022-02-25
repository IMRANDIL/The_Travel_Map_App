import React, { useRef, useState } from 'react'

import './Login.css'

import CancelIcon from '@mui/icons-material/Cancel';
import RoomIcon from '@mui/icons-material/Room';
import axios from 'axios';






const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {

    const [failure, setFailure] = useState(false)



    const nameRef = useRef()

    const passwordRef = useRef()



    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            userName: nameRef.current.value,

            password: passwordRef.current.value
        }

        try {
            const res = await axios.post(`/users/login`, user);

            myStorage.setItem("user", res.data.userName);
            setCurrentUser(res.data.userName);
            setShowLogin(false)
            setFailure(false)


        } catch (error) {
            setFailure(true)
            console.log(error);
        }




    }







    return (
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon />
                AIA
            </div>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder='userName' ref={nameRef} required />

                <input type="password" placeholder='password' ref={passwordRef} required />

                <button className='loginBtn'>Login</button>



                {failure && <span className='failure'>Oops...Something went wrong!</span>}

            </form>
            <CancelIcon className='loginCancel' onClick={() => setShowLogin(false)} />
        </div>
    )
}

export default Login
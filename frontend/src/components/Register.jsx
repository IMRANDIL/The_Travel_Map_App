import React, { useRef, useState } from 'react'

import './Register.css'

import CancelIcon from '@mui/icons-material/Cancel';
import RoomIcon from '@mui/icons-material/Room';
import axios from 'axios';






const Register = ({ setShowRegister }) => {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false)



    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()



    const handleSubmit = async (e) => {
        e.preventDefault();


        const newUser = {
            userName: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await axios.post(`/users/register`, newUser);
            setFailure(false)
            setSuccess(true)

        } catch (error) {
            setFailure(true)
            console.log(error);
        }




    }







    return (
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon />
                AIA
            </div>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder='userName' ref={nameRef} />
                <input type="email" placeholder='email' ref={emailRef} />
                <input type="password" placeholder='password' ref={passwordRef} />

                <button className='registerBtn'>Register</button>

                {success && <span className='success'>Successful, You can login now!</span>}

                {failure && <span className='failure'>Oops...Something went wrong!</span>}

            </form>
            <CancelIcon className='registerCancel' onClick={() => setShowRegister(false)} />
        </div>
    )
}

export default Register
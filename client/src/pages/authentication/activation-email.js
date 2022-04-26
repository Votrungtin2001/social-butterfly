import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import "./activation-email.css"

const ActivationEmail = () => {
    const history = useHistory();
    const {activation_token} = useParams()
    const [announce, setAnnounce] = useState("")
    useEffect(() => {
        if (activation_token) {
            activateEmail(activation_token)
        }
    }, [activation_token])

    const activateEmail = (activation_token) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/activate`, {
                token: activation_token,
            })
            .then(res => {
            })
            .catch(err => {
                console.log(err)
                
            });
    }

    return (
        <Fragment>
           <div className="activation-container">
                   <div className='activationLeft'>
                       <div className='activationImage'> 
                           <img></img>
                       </div>
                    </div>

                <div className='activationRight'>
                 <div className="header-activation">
                    <span></span>
                    <span className="weight-700 m-top-28 font-24">Notify</span>
                 </div>
         
                 <div className="activation-title">
                    <div className="opacity-50 font-14">Account verification successful!</div>
                 </div>
                 <button onClick={() => history.replace('/')}
                 className="activation-btn">
                   Yes
                     </button>
                </div>
        </div>
        </Fragment>
    )
}

export default ActivationEmail
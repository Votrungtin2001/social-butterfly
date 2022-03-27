import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './change-email.css'

import { checkValidEmail } from '../authentication/valid-email'
import CancelIcon from "@mui/icons-material/Cancel";

function ChangeEmail({ handleClose, setHeaderEmail, headerEmail }) {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState("");
    
    const handleClick = () => {
       getEmailError()
    }

    const getEmailError = () => {
        setIsValidEmail(false);
        if (!email) {
            setEmailError("Email can not be blank")
        }
        else {
            setEmailError("Email is wrong format")
        }
    }
    function handleEmailChange(email) {
        setEmail(email);
    }
    return (
        <Fragment>
            <div className="container-change">
                <div className='change-top'>
                <div className='change-email-left'>
                 <div className='change-email-image'>
                    <img></img>
                 </div>
                </div>
                <div className='change-email-right'>
                <div className="header-change-email">
                   
                    <span className="weight-500 m-top-28 font-24">Update email</span>
                </div>
                {/* {error && showErrMsg(error)} */}
                <div className="forgot-title-1">
                    <div className="opacity-50 font-16">Update your email now!</div>
                </div>
                <div className="content">
                    <div className={isValidEmail ? "forgot-input-field" : "invalid-input-field"}>
                        <input
                            value={email}
                            onChange={(e) => {
                                handleEmailChange(e.target.value)
                            }}
                            className="w-full email-input-change" type="text" placeholder="Email" autocomplete='nope' />
                </div>
                {!isValidEmail && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="text-danger" >{emailError}</small>
								</span>}
                   
            
            </div>
                    
                       
                </div>
                </div>

                <div className='change-bottom'>
                   <button onClick={handleClose}
 className="cancel-btn">
                   Cancel
                     </button>

                   <button
                        onClick={handleClick}
                        className="send-email-btn">
                        Update
                    </button>
                   </div>
        </div>
        </Fragment>
    );
}

export default ChangeEmail;

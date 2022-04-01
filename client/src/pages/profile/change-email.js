import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './change-email.css'

import { checkValidEmail } from '../authentication/valid-email'
import CancelIcon from "@mui/icons-material/Cancel";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import { toast } from 'react-toastify';

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { updateEmail } from '../../utils/fetchData'

import Popup from 'reactjs-popup';

import Loading from '../../components/loading'

function ChangeEmail({ auth, handleClose }) {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState("");

    const history = useHistory()
    
    const dispatch = useDispatch()

    
    //Loading
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = () => {
       getEmailError()
       if(checkValidEmail(email)) {
           setIsLoading(true)
           updateEmailOfUser()
       }
    }

    async function updateEmailOfUser() {
        try {
            const res = await updateEmail(email, auth.user._id, auth.refreshToken)

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    ...auth,
                    user: {
                        ...auth.user,
                        email: email
                    }
                }
            })
            toast.success('Update email successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            setIsLoading(false)
            handleClose()

        } catch (error) {
            toast.error("Some error happened!!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
      }

    const getEmailError = () => {
        if (!email) {
            setEmailError("Email can not be blank")
            setIsValidEmail(false);
        }
        else if (!checkValidEmail(email)) {
            setEmailError("Email is wrong format")
            setIsValidEmail(false);
        }
        else {
            setIsValidEmail(true);
            setEmailError("")
        }
    }
    function handleEmailChange(email) {
        setEmail(email);
    }
    return (
        <Fragment>
            <div className="container-change">
            <Popup  open={isLoading} >
                <Loading  />
            </Popup>
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

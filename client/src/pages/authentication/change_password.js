import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './change_password.css'
import eyeOn from "../../assets/login/icons8-eye-24.png";
import eyeOff from "../../assets/login/icons8-invisible-24.png";
import { checkValidPassword } from './valid-password';
import axios from 'axios'
// import { showErrMsg } from './notification/notification'
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import WebFont from 'webfontloader'
import CancelIcon from "@mui/icons-material/Cancel";

// const jwt = require('jsonwebtoken')
function ChangePassword() {
    const history = useHistory();
    const { reset_token } = useParams();
    const [announce, setAnnounce] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidRePassword, setIsValidRePassword] = useState(true);
    const [passVisibility, setPassVisibility] = useState(eyeOff);
    const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
    const [inputType, setInputType] = useState("password");
    const [reInputType, setReInputType] = useState("password");
    const [passwordError, setPasswordError] = useState();
    const [rePasswordError, setRePasswordError] = useState();
    const [isValidToken, setIsValidToken] = useState(true);
    const [error, setError] = useState("");

    function getPasswordError(password) {
        let errorMessage = "";
        if (!checkValidPassword(password)) {
            errorMessage = password
                ? "Password must be at least 6 characters including at least 1 uppercase letter and 1 number."
                : "Password can not be blank";
            setIsValidPassword(false);
            setPasswordError(errorMessage);
        }
        else {
            setIsValidPassword(true);
        }
    }
    function getRePasswordError(password, rePassword) {
        let errorMessage = "";
        if (rePassword == password && rePassword && password) {
            setIsValidRePassword(true);
            return;
        }
        else {
            setIsValidRePassword(false);
            if (!rePassword) {
                errorMessage = "Re-enter password can not be blank";
            }
            else {
                errorMessage = "Password does not match";
            }
            setRePasswordError(errorMessage)
            return;
        }
    }

    const handleClick = () => {
        setError("")
        getPasswordError(password);
        getRePasswordError(password, rePassword);
       
    }

    const changePassVisibility = () => {
        if (passVisibility === eyeOn) {
            setPassVisibility(eyeOff);
            setInputType("password");
        }
        if (passVisibility === eyeOff) {
            setPassVisibility(eyeOn);
            setInputType("text");
        }
    }

    const changeRePassVisibility = () => {
        if (rePassVisibility === eyeOn) {
            setRePassVisibility(eyeOff);
            setReInputType("password");
        }
        if (rePassVisibility === eyeOff) {
            setRePassVisibility(eyeOn);
            setReInputType("text");
        }
    }
    return (

        isValidToken ? (<Fragment>
            <div className="change-pass-main-container">
                <div className="bg-white"> 
                   <div className="change-pass-container">
                    <div className="change-pass-header">
                        <span></span>
                        <span className="weight-700 m-top-28 font-28">Change Password</span>
                    </div>
                    {/* {error && showErrMsg(error)} */}
                    <div className="forgot-title">
                        <div className="opacity-50 font-14">Please enter your new password</div>
                       
                    </div>
                    <div className='image-bg-change'>
                        <img></img>
                            </div>

                    <div className="change-pass-content">
                        <div className={isValidPassword ? "input-field" : "invalid-input"}>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="input-sign-up required" type={inputType} required="required" />
                            <div className="placeholder">
                                Password
                            </div>
                            <button onClick={changePassVisibility} className="m-right-5-per eye">
                                <img src={passVisibility} />
                            </button>
                        </div>
                        {!isValidPassword && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="change-password-text-danger" >{passwordError}</small>
								</span>}

                        <div className={isValidRePassword ? "input-field" : "invalid-input"}>
                            <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="input-sign-up required" type={reInputType} required="required" />
                            <div className="placeholder">
                                Re-enter Password
                            </div>
                            <button onClick={changeRePassVisibility} className="m-right-5-per eye">
                                <img src={rePassVisibility} />
                            </button>
                        </div>
                        {!isValidRePassword && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="change-password-text-danger" >{rePasswordError}</small>
								</span>}
                
                        <div className="loginButton">
              <button onClick={handleClick} > 
               <span>Save</span>
               </button>
           </div>
                    </div>
                </div></div>

            </div>
        </Fragment>) : (
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
                    <div className="opacity-50 font-14">Link expired, please try again later!</div>
                 </div>
                 <button onClick={() => history.replace('/')}
                 className="activation-btn">
                   Yes
                     </button>
                

                </div>
        </div>
            </Fragment>
            )
     );
}

export default ChangePassword;

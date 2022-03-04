import React, { Component, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './forgot-password.css'
import exit from '../../assets/login/exit.png'
import { checkValidEmail } from './valid-email'
import axios from 'axios'
// import { showErrMsg } from './notification/notification'
import Cookies from 'js-cookie';


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();

    const handleClick = () => {
        getEmailError();

         //Some conditions before call api from server
        if(1==1) {
        // Add loading when run api
  
        //
        sendEmailForResetPassword(email); // name, name ?? => First Name and Last Name 
        //gender not get vale, fix and add as parameters in moveToConfirmEmail before in "Male"
      }
    }

    const sendEmailForResetPassword = (
        email
      ) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/auth/forgot`, {
            email: email,
          })
          .then((res) => {
            // When this account is exist and sending email for reset password successfully
            
            // Set remove error
    
            // Set loading false (stop)
    
            // // Announce "A reset password email has been sent to your email. Please check" by toast
          })
          .catch((err) => {
            // Set loading false (stop)
    
            //Get status code of error
            const code = err.message.substring(32, err.message.length);
    
            // This account is not exist
            if (code == "400") {
    
              // Set text in email txt is empty
    
              //Print error "This account is not exist" (should use toast)
    
    
            } else {
              //Print error "Unknown network error happened" (should use toast)
    
            }
          });
      };

    const getEmailError = () => {
        setIsValidEmail(false);
        if (!email) {
            setEmailError("Email can not be blank")
        }
        else {
            setEmailError("Wrong email format")
        }
    }
    return (
        <Fragment>
            <div className="container w-440 h-auto" id="container">
                <div className='forgotLeft'>
                <div className='forgotImage'> <img></img>
                </div>
                </div>
                <div className='forgotRight'>
                <div className="header-forgot-password">
                    <span></span>
                    <span className="weight-500 m-top-28 font-24">Forgot Password</span>
                  
                </div>
                {/* {error && showErrMsg(error)} */}
                <div className="forgot-title">
                    <div className="opacity-50 font-14">Don’t worry! It happens. Please enter the email address associated with your account.</div>
                </div>
                <div className="content">
                <div className={isValidEmail ? "forgot-box" : "wrong-forgot-input-format"}>
            <input
              placeholder="Email"
              className="forgot-input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidEmail(true) }}
            />
            
            </div>
            {!isValidEmail && <small className="forgot-text-danger">{emailError}</small>}
            
                   <div>
                   <button  class="cancel-btn">Cancel</button>
                   <button
                        onClick={handleClick}
                        className="send-email-btn">
                        Send
                    </button>
                   </div>
                    

                </div>
                </div>
                
            </div>
        </Fragment>
    );
}

export default ForgotPassword;
import React, { Component, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './forgot-password.css'
import { checkValidEmail } from './valid-email'
import axios from 'axios'
import { toast, ToastPosition } from 'react-toastify';
import CancelIcon from "@mui/icons-material/Cancel";
import Popup from 'reactjs-popup';
import Loading from "../../components/loading";

const ForgotPassword = ({handleClose}) => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        getEmailError();

         //Some conditions before call api from server
        if(checkValidEmail(email)) {
        setIsValidEmail(true);
        // Add loading when run api
        setIsLoading(true);
        //
        sendEmailForResetPassword(email);
      }
      else {
        getEmailError();
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
            setIsLoading(false);
            // Announce "A reset password email has been sent to your email. Please check" by toast
            toast.success('A reset password email has been sent to your email. Please check!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          })
          .catch((err) => {
            // Set loading false (stop)
            setIsLoading(false);
            //Get status code of error
            const code = err.message.substring(32, err.message.length);
            // This account is not exist
            if (code == "400") {
              setEmail("")
              toast.error('This account is not exist!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            } else {
              toast.warning('Unknown network error happened', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
         
                <div className="forgot-title">
                    <div className="opacity-50 font-14">Don’t worry! It happens. Please enter the email address associated with your account.</div>
                </div>
                <div className="content-forgot">
                <div className={isValidEmail ? "forgot-box" : "wrong-forgot-input-format"}>
            <input
              placeholder="Email"
              className="forgot-input"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidEmail(true) }}
            />
            
            </div>
           
            {!isValidEmail && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="forgot-text-danger" >{emailError}</small>
								</span>}

                   <div className='forgot-bottom'>
                   <button onClick={handleClose}
 className="cancel-btn">
                   Cancel
                     </button>

                   <button
                        onClick={handleClick}
                        className="send-email-btn">
                        Send
                    </button>
                   </div>
                   <Popup  open={isLoading} >
       <Loading  />
       </Popup>
                </div>
                </div>
                
            </div>
        </Fragment>
    );
}

export default ForgotPassword;
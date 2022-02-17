import React, { Component, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './forgot-password.css'
import exit from '../../assets/login/exit.png'
import { checkValidEmail } from './valid-email'
import axios from 'axios'
// import { showErrMsg } from './notification/notification'
import Cookies from 'js-cookie';


function ForgotPassword({ handleOpenSignIn, handleClose }) {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState("");
    const handleClick = () => {
        setError("")
        if (checkValidEmail(email)) {
            setIsValidEmail(true);
            axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/forgot`, {
                email: email,
            })
            .then(res => {
               alert("Một email thay đổi mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra!")
            })
            .catch(err => {
                const code = err.message.substring(32, err.message.length);
                if (code == "400") {
                    setEmail("")
                    setError("Email này chưa được đăng ký")
                }
                else {
                    setError("Lỗi mạng không xác định")
                }
            });
        }
        else {
            getEmailError();
        }
    }


    const getEmailError = () => {
        setIsValidEmail(false);
        if (!email) {
            setEmailError("Email không được để trống")
        }
        else {
            setEmailError("Email sai định dạng")
        }
    }
    return (
        <Fragment>
            <div className="container w-440 h-auto" id="container">
                <div className="header-forgot-password">
                    <span></span>
                    <span className="weight-500 m-top-28 font-24">Forgot Password</span>
                    <button className="m-top-28" onClick={handleClose}>
                        <img src={exit} />
                    </button>
                </div>
                {/* {error && showErrMsg(error)} */}
                <div className="forgot-title">
                    <div className="opacity-50 font-16">Don’t worry! It happens. Please enter the email address associated with your account.</div>
                </div>
                <div className="content">
                <div class="input-wrap">
                  <input
                    type="email"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    required
                  />
                  <label>Email</label>
                </div>
                    {!isValidEmail && <small className="forgot-text-danger">{emailError}</small>}
                    <button
                        onClick={handleClick}
                        className="send-email-btn">
                        Send
                    </button>

                    
                </div>
            </div>
        </Fragment>
    );
}

export default ForgotPassword;
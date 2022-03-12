import React, { Component, useState, useEffect } from "react";

import { Fragment } from "react/cjs/react.production.min";
import exit from "../../assets/login/exit.png";

import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import "./confirm-email.css";
import Cookies from 'js-cookie';

var posX = window.innerWidth;
window.onresize = () => {
    posX = window.innerWidth;
}



const ConfirmEmail = ({ firstName, lastName, fullName, email, password, birthday, sex, mobile, setIsLogin }) => {
    const history = useHistory();
    const [isFirst, setIsFirst] = useState(true);
    const [error, setError] = useState("");

    const sendVerificationEmail = (token) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/sendverificationemail`, {
                firstName: firstName, 
                lastName: lastName, 
                fullName: fullName, 
                email: email, 
                password: password, 
                birthday: birthday, 
                sex: sex,
                mobile: mobile
            })
            .then(res => {
                // Pop up re send email appears and should send this token to that pop up by props (use isFirst in this component -> webbds)
                setIsFirst(false);
                // Announce "A verification email has been sent to your email. Please check" by toast
                alert("A verification email has been sent to your email. Please check !!!")

            })
            .catch(err => {
               //Print error "Unknown network error happened" (should use toast)
               setError("Unknown network error happened.")

            });


    }

    return (
        isFirst ? (
            <Fragment>
                <div className="container-confirm w-440 h-auto">
                    <div className="header-confirm-email">
                        <span></span>
                        <span className="weight-500 m-top-28 font-24">Email Verification</span>
                        <button className="m-top-28 close-image" onClick={() => {
                            setIsLogin(true);
                        }}>
                            <img src={exit} />
                        </button>
                    </div>
                    <div className="confirm-image">
                        <img  ></img>
                    </div>
                    {/* {error && showErrMsg(error)} */}
                    <div className="content m-top-42">
                        <span className="weight-400">Authentication email will be sent to mail </span>
                        <span className="email-link weight-400">{email}</span>
                        <div className="m-top-12 weight-400">Please visit email to verify (Note to check Spam/Junk).</div>

                        <button onClick={sendVerificationEmail} className="resend-email-btn w-full">Submit</button>

                     
                    </div>
                </div>
            </Fragment >)
            : (<Fragment>
                <div className="container w-440 h-auto">
                    <div className="header-confirm-email">
                        <span></span>
                        <span className="weight-500 m-top-28 font-24">Email Verification</span>
                        <button className="m-top-28" onClick={() => {
                            setIsLogin(true);
                        }}>
                            <img src={exit} />
                        </button>
                    </div>
                    <div className="confirm-image">
                        <img ></img>
                    </div>
                    {/* {error && showErrMsg(error)} */}
                    <div className="content m-top-42">
                        <span className="weight-400">A verification email has been sent, please visit&nbsp;</span>
                        <span className="email-link weight-400">{email}</span>
                        <span className="weight-400">&nbsp;to verify (Note to check Spam/Junk).</span>

                        <div className="m-top-24 weight-400">If you have not received the verification email, select “Resend verification email”</div>

                        <button onClick={sendVerificationEmail} className="resend-email-btn w-full">Resend verification email</button>

                    </div>
                </div>
            </Fragment >)
    )
};

export default ConfirmEmail;

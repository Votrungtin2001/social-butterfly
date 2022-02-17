import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useHistory } from "react-router-dom";
import "./login.css" ;
import GoogleLogin from "./google-login"
import axios from 'axios'
import Cookies from 'js-cookie';

import eyeOn from "../../assets/login/eye_on.png";
import eyeOff from "../../assets/login/eye_off.png";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";



const Login = ({ setIsShowSignIn, handleSignUp, isSignUpOpen, setIsLogin , handleForgotOpen: handleShowForgotForm}) => {

const inputs = document.querySelectorAll(".input-field");

const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});


function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

  const [isRememberMe, setIsRemember] = useState(false);

    return (
      <main>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form autocomplete="off" class="sign-in-form">

              <div class="logo">
                <img src="../img/logo.png"  />
                <h4>social butterfly</h4>
              </div>

              <div class="heading">
                <h3>Welcome Back</h3>
                <span className="font-12 weight-400">Don’t have an account yet? </span>
                <Link to="/register" className="font-12 sign-in-anchor weight-400">Register now</Link>
              </div>

              <div class="actual-form">
              <div class="input-wrap">
                  <input
                    type="email"
                    class="input-field"
                    autocomplete="off"
                  />
                  <label>Email</label>
                </div>

                <div class="input-wrap">
                  <input
                    type="password"
                    class="input-field"
                    autocomplete="off"
                    
                  />
                  <label>Password</label>
                </div>

              

            <div className="weight-400 block m-top-10">
                  <input
                  type="checkbox"
                  checked={isRememberMe}
                  
                  className=" border-5 border-brown square-20  signin-middle"
            />
            <h4 className=" font-14 remember signin-bottom">Remember me</h4>
           
           </div>


           <button className="sign-in-button">Login</button>

           <button className=" m-left-172 font-14 sign-in-anchor weight-400">Forgot Password?</button>

              <div className="other-option"><span className="other-text">Or</span></div>

                <GoogleLogin/>
                
              </div>
            </form>

          </div>

          <div class="carousel">
            <div class="images-wrapper">
              <img src="img/wave.png" class="image img-1 show" alt="" />
              <img src="./img/image2.png" class="image img-2" alt="" />
              <img src="./img/image3.png" class="image img-3" alt="" />
            </div>

            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group">
                  <h2>Create your account to start</h2>
                  <h2>Post what you like</h2>
                  <h2>Invite friends to my social network</h2>
                </div>
              </div>

              <div class="bullets">
                <span class="active" data-value="1"></span>
                <span data-value="2"></span>
                <span data-value="3"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </main>
    );
  };
  
  export default Login;
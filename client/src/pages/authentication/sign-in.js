import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./sign-in.css"
import GoogleLogin from "./google-login"
import { Link } from "react-router-dom";
import ForgotPassword from './forgot-password';
import ConfirmEmail from './confirm-email';
import Popup from 'reactjs-popup';
import eyeOn from "../../assets/login/icons8-eye-24.png";
import eyeOff from "../../assets/login/icons8-invisible-24.png";
import { checkValidEmail } from "./valid-email"
import { checkValidPassword } from "./valid-password"
import axios from 'axios'
import Cookies from 'js-cookie';

import GoogleLoginUI from "./google-login";

const Login = () => {

  
  const [visibility, setVisibility] = useState(eyeOff);
  const [inputType, setInputType] = useState("password");
  const [isShowForgot, setIsShowForgot] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(true);
  const [emailError, setEmailError] = useState();
  const [error, setError] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const googleAppID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const history = useHistory()

const handleForgot = () => {
  setIsShowForgot(true);
}

const handleCloseForgot = () => {
  setIsShowForgot(false);
}

const handleConfirm = () => {
  setIsShowConfirm(true);
}

let changeVisibilityHandler = () => {
  if (visibility === eyeOn) {
    setVisibility(eyeOff);
    setInputType("password");
  }
  if (visibility === eyeOff) {
    setVisibility(eyeOn);
    setInputType("text");
  }
};

const loginHandler = () => {
  setError("")
  setValidEmail(checkValidEmail(email));
  setValidPassword(checkValidPassword(password));
  setCheckEmptyPassword(password);
  if (!checkValidEmail(email)) {
    setEmailError(email ? "Email is wrong format" : "Email can not be blank")
  }

  //Some conditions before call api from server
  if(1==1) {
    // Add loading when run api

    login(email, password); 
  }
  
}

const login = (email, password) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      email: email,
      password:  password,
    })
    .then((res) => {
      // Sign in successfully
      const {accessToken, refreshToken} = res.data
      
      // Set remove error

      // Set loading false (stop)

      // Save accessToken and refreshToken in cookies

      // Print "Login successfully" by toast

      // Move to home page
      history.push("/home")

      
    })
    .catch((err) => {
      // Set loading false (stop)

      //Get status code of error
      const code = err.message.substring(32, err.message.length);

      // Email already taken
      if (code == "401") {
        //Print error "This email does not exist" (should use toast and also make error in email textbox - red)

      }
      else if (code == "402") {
         //Print error "Incorrect password" (should use toast and also make error in password textbox - red)


      } else {
        //Print error "Unknown network error happened" (should use toast)

      }
    });
}; 

const responseGoogle = (response) => {
  setError("")
  console.log(response);
  sendGoogleToken(response.tokenId)
}

const sendGoogleToken = tokenId => {
  //Set loading is true

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
      idToken: tokenId
    })
    .then(res => {
      const { accessToken, refreshToken } = res.data.user
      const bearerToken = res.headers['authorization']
      Cookies.set('bearerToken', bearerToken);
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      setError("")

      //Set loading is false (stop)

       // Move to home page
       history.push("/home")

    })
    .catch(error => {
      // Announce "Log in by Google unsuccessfully" by toast

    });
};

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social butterfly</h3>
          <span className="loginDesc">
            <img></img>
          </span>
        </div>
        <div className="loginRight">

          <div className="loginBox" >

          <div class="heading m-top-35">
                <h3>Welcome Back...</h3>
                <span className="font-12 weight-400">Don’t have an account yet? </span>
                <Link to="/sign-up"><button className="font-12 sign-in-anchor weight-400 btn">Register now</button></Link>
              </div>
              <div className={validEmail ? "input-box" : "wrong-input-format"}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidEmail(true) }}
              className="username-input"
            />
            </div>
            {!validEmail && <small className="text-danger">{emailError}</small>}
            
            <div className={checkEmptyPassword ? "input-box" : "wrong-input-format"}>
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setCheckEmptyPassword(true) }}
              type={inputType}
              className="password-input"
            />
            {/* <button className="m-left-340 m-top-16 show-button" onClick={changeVisibilityHandler}>
              <img src={visibility} />
            </button> */}
            </div>
            {!checkEmptyPassword && <small className="text-danger">Password can not be blank</small>}
            
           <span className="weight-400 block m-top-10">
             <div className="remember-container">
                  <input
                  type="checkbox"
                  className="  border-5 border-brown signin-middle" />
                  <span className="font-12 signin-bottom">Remember me</span>
                  </div>
                  <button onClick = {handleForgot} 
                className="loginForgot">Forgot Password?</button>
                 <Popup open={isShowForgot} onClose={() => setIsShowForgot(false)} modal nested closeOnDocumentClick={false}>
                {<ForgotPassword
                   />}
              </Popup>
            </span>

            <button onClick={loginHandler} className="loginButton" >Log in</button>
            <Popup open={isShowConfirm} onClose={() => setIsShowForgot(false)} modal nested closeOnDocumentClick={false}>
                {<ConfirmEmail
                  />}
              </Popup>
         
            <div className="other-option"><span className="other-text">Or</span></div>


            <GoogleLogin
              clientId={googleAppID}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <GoogleLoginUI onPress={renderProps.onClick} />
              )}

            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
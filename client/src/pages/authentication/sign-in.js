import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./sign-in.css"
import GoogleLogin from "react-google-login"
import { Link } from "react-router-dom";
import ForgotPassword from './forgot-password';
import { toast, ToastPosition } from 'react-toastify';
import Popup from 'reactjs-popup';
import eyeOn from "../../assets/login/icons8-eye-24.png";
import eyeOff from "../../assets/login/icons8-invisible-24.png";
import { checkValidEmail } from "./valid-email"
import { checkValidPassword } from "./valid-password"
import axios from 'axios'
import Cookies from 'js-cookie';
import CancelIcon from "@mui/icons-material/Cancel";
import GoogleLoginUI from "./google-login";
import Loading from "../../components/loading";
import styled from "styled-components";
import image from "../../assets/img/Saly-12.png";
import Tilt from "react-tilt";
import {showErrMsg} from './error-message'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { checkLogin } from '../../redux/actions/authActions'

import { Fragment } from "react/cjs/react.production.min";
import { Redirect } from 'react-router'


const Login = () => {

  const [visibility, setVisibility] = useState(eyeOff);
  const [inputType, setInputType] = useState("password");
  const [isShowForgot, setIsShowForgot] = useState(false);
 
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(true);
  const [emailError, setEmailError] = useState();
  const [error, setError] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRememberMe, setIsRemember] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState();

  const googleAppID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const history = useHistory()

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    //Check if the Cookies name rememberStatus is exist to prevent null exception
    const userEmail = Cookies.get("userEmail");
    const userPassword = Cookies.get("userPassword");
    if (userEmail && userPassword) {
      setEmail(userEmail);
      setPassword(userPassword);
      setIsRemember(true);
    }
  }, [])

  const setUserCookies = (email, password) => {
    Cookies.set("userEmail", email);
    Cookies.set("userPassword", password);
  }

  const setAccessAndRefreshToken = (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  }

  const removeUserCookies = () => {
    Cookies.remove("userEmail");
    Cookies.remove("userPassword");
  }

const handleForgot = () => {
  setIsShowForgot(true);
}

const handleCloseForgot = () => {
  setIsShowForgot(false)
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
  setValidEmail(checkValidEmail(email));
  setValidPassword(checkValidPassword(password));
  setCheckEmptyPassword(password);
  if (!checkValidEmail(email)) {
    setEmailError(email ? "Email is wrong format" : "Email can not be blank")
  }

  //Some conditions before call api from server
  if(checkValidEmail(email) && password) {
    // Add loading when run api
    setIsLoading(true);
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
      const {accessToken, refreshToken, user} = res.data
      console.log(user)
  
      // Set remove error
      setEmail("");
      setPassword("");
     
      // Set loading false (stop)
      setIsLoading(false);
      // Save accessToken and refreshToken in cookies
      setAccessAndRefreshToken(accessToken, refreshToken)

      if (isRememberMe) {
        setUserCookies(email, password);
      }
      else {
        const emailInCookies = Cookies.get("userEmail");
        const passwordInCookies = Cookies.get("userPassword");
        if (emailInCookies === email && passwordInCookies === password) {
          removeUserCookies();
        }
      }
      // Print "Login successfully" by toast
      toast.success('Login successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
      dispatch({ 
        type: GLOBALTYPES.AUTH, 
        payload: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user
        } 
      })
      // Move to home page
      history.push("/home")
      
    })
    .catch((err) => {
      // Set loading false (stop)
      setIsLoading(false);
      //Get status code of error
      const code = err.message.substring(32, err.message.length);
      console.log(err)

      // Email already taken
      if (code == "401") {
        //Print error "This email does not exist" (should use toast and also make error in email textbox - red)
        toast.error('This email does not exist', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      setError("This email does not exist");
      }
      else if (code == "402") {
        setError("Incorrect password");

         //Print error "Incorrect password" (should use toast and also make error in password textbox - red)
         toast.error('Incorrect password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } else {
        setError("Unknown network error happened")
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

const responseGoogle = (response) => {
  setError("")
  console.log(response);
  sendGoogleToken(response.tokenId)
}

const sendGoogleToken = tokenId => {
  //Set loading is true
setIsLoading(true);
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
      idToken: tokenId
    })
    .then(res => {
      const { accessToken, refreshToken, user } = res.data
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      setError("")

      //Set loading is false (stop)
      setIsLoading(false);

      dispatch({ 
        type: GLOBALTYPES.AUTH, 
        payload: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user
        } 
      })
      // Move to home page
      history.push("/home")

    })
    .catch(error => {
      console.log(error)
      toast.error('Log in by Google unsuccessfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    });
};
const TiltWrapper = styled(Tilt)`
  width: 60%;
  min-width: 400px;
  @media (max-width: 670px) {
    display: none;
  }
`;
const Img = styled.img`
  width: 120%;

`;
  return (
    auth.accessToken ? (
      <Redirect to="/"/>)
      :(  <Fragment>
          <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">social butterfly</h3> */}
          <TiltWrapper options={{ max: 25 }}>
            <Img src={image} alt="@gouthamgtronics" />
          </TiltWrapper>
          
        </div>
        <div className="loginRight">

          <div className="loginBox" >

          <div class="heading m-top-35">
                <h3>Welcome Back...</h3>
                <span className="font-12 weight-400">Don’t have an account yet? </span>
                <Link to="/sign-up"><button className="font-12 sign-in-anchor btn-sign">Register now</button></Link>
              </div>
              {error && showErrMsg(error)}
            <div className={validEmail ? "input-field" : "invalid-input"}>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidEmail(true) }}
              className="email-input-sign-in input-sign-up"
              type="text"
              placeholder="Email"
            ></input>
          </div>
            {!validEmail && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="text-danger" >{emailError}</small>
								</span>}

            <div className={checkEmptyPassword ? "input-field" : "invalid-input"}>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value); setCheckEmptyPassword(true) }}
              className="input-sign-up password-input-sign-in"
              type={inputType}
              placeholder="Password"
            />
            <button onClick={changeVisibilityHandler} className="show-button m-left-265">
              <img src={visibility} />
            </button>
          </div>

            {!checkEmptyPassword && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="text-danger">Password can not be blank</small>
								</span>}

           <span className="weight-400 block-sign-up m-top-10">
             <div className="remember-container">
                  <input
                  type="checkbox"
                  checked={isRememberMe}
                  onClick={() => {
                    setIsRemember(!isRememberMe)
                  }}
                  className="  border-5 border-brown signin-middle" />
                  <span className="font-12 signin-bottom">Remember me</span>
                  </div>
                  <div>
                  <button onClick = {handleForgot} 
                className="loginForgot">Forgot Password?</button>
                          
              </div>
            </span>
            <Popup open={isShowForgot} onClose={() => setIsShowForgot(false)} nested modal closeOnDocumentClick={false}>
                
                {<ForgotPassword
                  handleClose={handleCloseForgot}
                
                  />}
              </Popup>
              
           <div className="loginButton">
              <button onClick={loginHandler} > 
               <span>Log in</span>
               </button>
           </div>
           
       <Popup  open={isLoading} >
       <Loading  />
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
      </Fragment >)
    
  );
};

export default Login;
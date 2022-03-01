import { useContext,useState, useRef } from "react";

import "./sign-up.css";
import GoogleLogin from "./google-login"
import { Link } from "react-router-dom";
import { checkValidEmail } from "./valid-email";
import { checkValidPassword } from "./valid-password";
import { isValidPhoneNumber } from "react-phone-number-input";
import { checkValidName } from "./valid-name";
import eyeOn from "../../assets/login/icons8-eye-24.png";
import eyeOff from "../../assets/login/icons8-invisible-24.png";




export default function SignUp() {
  const [passVisibility, setPassVisibility] = useState(eyeOff);
  const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
  const ref = useRef();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidRePassword, setIsValidRePassword] = useState(true);
  const [inputType, setInputType] = useState("password");
  const [reInputType, setReInputType] = useState("password");
  const [passwordError, setPasswordError] = useState();
  const [rePasswordError, setRePasswordError] = useState();
  const [isTypeDate, setIsTypeDate] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [isSetGender, setIsSetGender] = useState(true);
  const [genderError, setGenderError] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [isAgreeError, setIsAgreeError] = useState();
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);
  const [phone, setPhone] = useState();
  const [isEnterPhone, setIsEnterPhone] = useState(true);
  const [phoneError, setPhoneError] = useState();
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [nameError, setNameError] = useState();
 

  const handleSignUp = () => {
    getEmailError(email);
    getPasswordError(password);
    getRePasswordError(password, rePassword);
    getSetGenderError(gender);
    getIsAgreeError(isAgree);
    getEnterPhone(phone);
    getNameError(name);
    
  };

    function getEmailError(email) {
    let errorMessage = "";
    if (!checkValidEmail(email)) {
      errorMessage = email ? "Email is wrong format" : "Email cannot be blank";
      setIsValidEmail(false);
      setEmailError(errorMessage);
    } else {
      setIsValidEmail(true);
    }
  }

  function getPasswordError(password) {
    let errorMessage = "";
    if (!checkValidPassword(password)) {
      errorMessage = password
        ? "Password must be at least 6 characters including at least 1 uppercase letter and 1 number"
        : "Password cannot be blank";
      setIsValidPassword(false);
      setPasswordError(errorMessage);
    } else {
      setIsValidPassword(true);
    }
  }
  
  function getRePasswordError(password, rePassword) {
    let errorMessage = "";
    if (rePassword == password && rePassword && password) {
      setIsValidRePassword(true);
      return;
    } else {
      setIsValidRePassword(false);
      if (!rePassword) {
        errorMessage = "Re-enter password cannot be blank";
      } else {
        errorMessage = "Password incorrect";
      }
      setRePasswordError(errorMessage);
      return;
    }
  }

  function getSetGenderError(gender) {
    let errorMessage = "";
    if (gender) {
      setIsSetGender(true);
    } else {
      errorMessage = "Please select your gender";
      setIsSetGender(false);
      setGenderError(errorMessage);
    }
  }

  function getIsAgreeError(isAgree) {
    let errorMessage = "";
    if (isAgree) {
      setIsAgreeChecked(true);
    } else {
      errorMessage = "You must agree to the terms of use to register";
      setIsAgreeChecked(false);
      setIsAgreeError(errorMessage);
    }
  }

  function getEnterPhone(phone) {
    let errorMessage = "";
    if (phone) {
      setIsEnterPhone(true);
    } else {
      errorMessage = "Please enter your phone number";
      setIsEnterPhone(false);
      setPhoneError(errorMessage);
    }
  }
  function getNameError(name) {
    let errorMessage = "";
    if (!checkValidName(name)) {
      errorMessage = name
        ? "The name is formatted incorrectly, contains only letters or spaces, between 3 and 50 characters in length"
        : "Name can not be blank";
      setIsValidName(false);
      setNameError(errorMessage);
    } else {
      setIsValidName(true);
    }
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
  };
  const changeRePassVisibility = () => {
    if (rePassVisibility === eyeOn) {
      setRePassVisibility(eyeOff);
      setReInputType("password");
    }
    if (rePassVisibility === eyeOff) {
      setRePassVisibility(eyeOn);
      setReInputType("text");
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
        <form className="registerBox" >
         
          <span className="registerDesc">
            <img></img>
          </span>
          </form>
        </div>
        <div className="registerRight">
        <div className="registerBoxRight" >
          <div class="heading">
                <h3>Get Started</h3>
                <span className="font-12 weight-400">Already have an account? </span>
                <Link to="/"><button className="font-12 sign-in-anchor weight-400 btn">Sign in</button></Link>
              </div>

              <div className="wrap">
              <div className={isValidName ? "input-field" : "invalid-input"} >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-sign-up"
              type="text"
            
              placeholder="First Name"
            ></input>
            
          </div>
          
          <div className={isValidName ? "input-field m-left-8 " : "invalid-input m-left-8"} >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-sign-up "
              type="text"
            
              placeholder="Last Name"
            ></input>
            
          </div>
       
                </div>
                {!isValidName && (
            <small className="sign-up-text-danger">{nameError}</small>
          )}

                <div className={isValidEmail ? "input-field" : "invalid-input"}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-sign-up"
              type="text"
            
              placeholder="Email"
            ></input>
            
          </div>
          {!isValidEmail && (
            <small className="sign-up-text-danger">{emailError}</small>
          )}

<div className={isEnterPhone ? "input-field" : "invalid-input"} >
            <input
              value={phone}
              
              className="input-sign-up"
              type="number"
            
              placeholder="Phone Number"
            ></input>
            
          </div>
          {!isEnterPhone && (
            <small className="sign-up-text-danger">{phoneError}</small>
          )}
<div className={isValidPassword ? "input-field" : "invalid-input"}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-sign-up required"
              type={inputType}
              
              placeholder="Password"
            />
            
            <button onClick={changePassVisibility} className="show-button m-left-265 m-top-5">
              <img src={passVisibility} />
            </button>
          </div>

          {!isValidPassword && (
            <small className="sign-up-text-danger">{passwordError}</small>
          )}
          <div className={isValidRePassword ? "input-field" : "invalid-input"}>
            <input
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="input-sign-up required"
              type={reInputType}
              
              placeholder="Re-enter Password"
            />
           
            <button onClick={changeRePassVisibility} className="show-button m-left-265 m-top-5">
              <img src={rePassVisibility} />
            </button>
          </div>
          {!isValidRePassword && (
            <small className="sign-up-text-danger">{rePasswordError}</small>
          )}

<div className="input-field  ">
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="input-sign-up required"
              type="text"
              
              ref={ref}
              onFocus={() => {
                setIsTypeDate(true);
                ref.current.type = "date";
              }}
              onBlur={() => {
                setIsTypeDate(false);
                ref.current.type = "text";
              }}
            />
            {!isTypeDate && <div className="placeholder">Date of Birth</div>}
          </div>
            
            <div className="m-top-14">
         
         <div className="gender-select m-top-10">
           <label className="custom-radio-btn">
             <span className="label">Male</span>
             <input
               value={"Nam"}
              
               type="radio"
               name="gender"
               value="Nam"
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Female</span>
             <input
               value={"Nữ"}
               
               type="radio"
               name="gender"
               value="Nữ"
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Other</span>
             <input
               value={"Khác"}
               
               type="radio"
               name="gender"
               value="Khác"
             />
             <span className="checkmark"></span>
           </label>
         </div>
         {!isSetGender && (
            <small className="sign-up-text-danger">{genderError}</small>
          )}
       </div>

           <div className="weight-400 block m-top-10">
                 <div className="flex1">
                  <input
                  type="checkbox"
                  className=" border-5 border-brown square-20  signup-middle" />
                  <span className=" m-left-8 font-12  signup-bottom">I agree to Flatform’s Term of Services and Privacy Policy.</span>

                </div>
           
            </div>
            {!isAgreeChecked && (
            <small className="sign-up-text-danger">{isAgreeError}</small>
          )}


       

            <button onClick={handleSignUp} className="registerButton"  >Register</button>

            </div>
        </div>
      </div>
    </div>
  );
}
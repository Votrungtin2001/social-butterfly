import { useContext,useState, useRef } from "react";

import "./sign-up.css";
import GoogleLogin from "./google-login"
import { Link } from "react-router-dom";
import { checkValidEmail } from "./valid-email";
import { checkValidPassword } from "./valid-password";
import { checkValidName } from "./valid-name";
import eyeOn from "../../assets/login/icons8-eye-24.png";
import eyeOff from "../../assets/login/icons8-invisible-24.png";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmEmail from './confirm-email';
import Popup from 'reactjs-popup';

export default function SignUp() {
  const [passVisibility, setPassVisibility] = useState(eyeOff);
  const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
  const ref = useRef();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
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

  const [gender, setGender] = useState();
  const [isSetGender, setIsSetGender] = useState(true);
  const [genderError, setGenderError] = useState();

  const [isAgree, setIsAgree] = useState(false);
  const [isAgreeError, setIsAgreeError] = useState();
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);

  const [phone, setphone] = useState();
  const [isEnterphone, setIsEnterphone] = useState(true);
  const [phoneError, setphoneError] = useState();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isValidFirstName, setIsFirstValidName] = useState(true);
  const [isValidLastName, setIsLastValidName] = useState(true);
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();

  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const handleConfirm = () => {
    setIsShowConfirm(true);

  }
  const handleSignUp = () => {
    getEmailError(email);
    getPasswordError(password);
    getRePasswordError(password, rePassword);
    getSetGenderError(gender);
    getIsAgreeError(isAgree);
    getEnterphone(phone);
    getFirstNameError(firstName);
    getLastNameError(lastName);
    
    //Some conditions before call api from server
    if(1==1) {
      // Add loading when run api


      const fullName = firstName + " " + lastName;
      if(birthday != "")  moveToConfirmEmail(firstName, lastName, fullName, email, password, birthday, gender, phone);
      else {
        const defaultBirthday = "2001-01-01";
        moveToConfirmEmail(firstName, lastName, fullName, email, password, defaultBirthday, gender, phone);
      }
    }
    
  };

  const moveToConfirmEmail = (
    firstName,
    lastName,
    fullName,
    email,
    password,
    birthday,
    sex,
    phone
  ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        email: email,
        password: password,
        birthday: birthday,
        sex: sex,
        mobile: phone
      })
      .then((res) => {
        const {firstName, lastName, fullName, email, password, birthday, sex, mobile} = res.data
        // Set loading false (stop)

        // Pop up asking for confirm email appears but send firstName, lastName, fullName, email, password, birthday, sex, phone from here to that pop up by props
        handleConfirm();
      })
      .catch((err) => {
        // Set loading false (stop)

        //Get status code of error
        const code = err.message.substring(32, err.message.length);

        // Email already taken
        if (code == "401") {
          // Set text in email txt is empty

          //Print error "This email was already taken" (should use toast)


        } else {
          //Print error "Unknown network error happened" (should use toast)

        }
      });
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

  function getEnterphone(phone) {
    let errorMessage = "";
    if (phone) {
      setIsEnterphone(true);
    } else {
      errorMessage = "Please enter your phone number";
      setIsEnterphone(false);
      setphoneError(errorMessage);
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

  function getFirstNameError(firstName) {
    let errorMessage = "";
    if (!checkValidName(firstName)) {
      errorMessage = firstName
        ? "The name is formatted incorrectly, contains only letters or spaces, between 1 and 50 characters in length"
        : "First name can not be blank";
      setIsFirstValidName(false);
      setFirstNameError(errorMessage);
    } else {
      setIsFirstValidName(true);
    }
  }
  
  function getLastNameError(lastName) {
    let errorMessage = "";
    if (!checkValidName(lastName)) {
      errorMessage = lastName
        ? "The name is formatted incorrectly, contains only letters or spaces, between 1 and 50 characters in length"
        : "Last name can not be blank";
      setIsLastValidName(false);
      setLastNameError(errorMessage);
    } else {
      setIsLastValidName(true);
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
        <div className="registerBox" >
         
          <span className="registerDesc">
            <img></img>
          </span>
          </div>
        </div>
        <div className="registerRight">
        <div className="registerBoxRight" >
          <div class="heading">
                <h3>Get Started</h3>
                <span className="font-12 weight-400">Already have an account? </span>
                <Link to="/"><button className="font-12 sign-in-anchor weight-400 btn">Sign in</button></Link>
              </div>

              <div className="wrap">
              <div className={isValidFirstName ? "input-field" : "invalid-input"} >
            <input
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="input-sign-up"
              type="text"
            
              placeholder="First Name"
            ></input>
            
          </div>
          
          <div className={isValidLastName ? "input-field m-left-8 " : "invalid-input m-left-8"} >
            
            <input
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="input-sign-up "
              type="text"
            
              placeholder="Last Name"
            ></input>
            
          </div>
       
                </div>

                {!isValidFirstName  && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{firstNameError}</small>
								</span>}
                {!isValidLastName  && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{lastNameError}</small>
								</span>}
        

                <div className={isValidEmail ? "input-field" : "invalid-input"}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-sign-up"
              type="text"
            
              placeholder="Email"
            ></input>
            
          </div>
          {!isValidEmail && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{emailError}</small>
								</span>}
        
        

<div className={isEnterphone ? "input-field" : "invalid-input"} >
            <input
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="input-sign-up"
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            ></input>
            
          </div>
          {!isEnterphone && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{phoneError}</small>
								</span>}
         
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
          {!isValidPassword && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{passwordError}</small>
								</span>}
      
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
          {!isValidRePassword && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{rePasswordError}</small>
								</span>}
         

                <div className="input-field  ">
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="input-sign-up"
              type="text"
              required
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
               value={"Male"}
               onChange={(e) => setGender(e.target.value)}
               checked={gender == "Male"}
               type="radio"
               name="gender"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Female</span>
             <input
               value={"Female"}
               onChange={(e) => setGender(e.target.value)}
               checked={gender == "Female"}
               type="radio"
               name="gender"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Other</span>
             <input
               value={"Other"}
               onChange={(e) => setGender(e.target.value)}
               checked={gender == "Other"}
               type="radio"
               name="gender"
               
             />
             <span className="checkmark"></span>
           </label>
         </div>
         {!isSetGender && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{genderError}</small>
								</span>}
         
       </div>

           <div className="weight-400 block m-top-10">
                 <div className="flex1">
                  <input
                  type="checkbox"
                  onClick={() => {
                    setIsAgree(!isAgree);
                  }}
                  className=" border-5 border-brown square-20  signup-middle" />
                  <span className=" m-left-8 font-12  signup-bottom">I agree to Flatform’s Term of Services and Privacy Policy.</span>

                </div>
           
            </div>
            {!isAgreeChecked && <span className="error-mess">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small className="sign-up-text-danger" >{isAgreeError}</small>
								</span>}
         
<div className="loginButton">
              <button onClick={handleSignUp}  > 
               <span>Register</span>
               </button>
           </div>
           
           <Popup open={isShowConfirm} closeOnDocumentClick={false} >
                {<ConfirmEmail
                   />}
              </Popup>

            </div>
        </div>
      </div>
    </div>
  );
}
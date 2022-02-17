import React, { Component, useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useHistory } from "react-router-dom";
import "./register.css" ;
import { Link } from "react-router-dom";

const Register = () => {
  const [gender, setGender] = useState();
    const inputs = document.querySelectorAll(".f1");
    inputs.forEach((inp) => {
        inp.addEventListener("focus", () => {
          inp.classList.add("active");
        });
        inp.addEventListener("blur", () => {
          if (inp.value != "") return;
          inp.classList.remove("active");
        });
      });
  
    return (

        <div className="container">

            <div className="form">

                <div className="heading">
                    <img></img>
                    <h3>Get Started</h3>
                    <div>
           <span className="font-14 weight-400">Already have an account? </span>
           <Link to="/">Sign in </Link>
           </div>
                </div>

                <div className="wrap">
                    <div className="f1">
                       <label>First Name</label>
                       <input type = "text"/>
                       <span className="focus-input"></span>
                    </div>
                    <div className="f2">
                       <label>Last Name</label>
                       <input type = "text"/>
                       <span className="focus-input"></span>
                    </div>
                </div>

                <div className="wrap2">
                       <label>Email</label>
                       <input type = "text"/>
                       <span className="focus-input2"></span>
                </div>

                <div className="wrap2">
                       <label>Phone Number</label>
                       <input type = "number"/>
                       <span className="focus-input2"></span>
                </div>

                <div className="wrap2">
                       <label>Password</label>
                       <input type = "password"/>
                       <span className="focus-input2"></span>
                </div>

                <div className="wrap2">
                       <label>Re-enter Password</label>
                       <input type = "password"/>
                       <span className="focus-input2"></span>
                </div>

                <div className="wrap2">
                       <label>Date of Birth</label>
                       <input type = "date"/>
                       <span className="focus-input2"></span>
                </div>
                
                <div className="gender-select m-top-10">
              <label className="custom-radio-btn">
                <span className="label">Male</span>
                <input
                  value={"Male"}
                  checked={gender == "Male"}
                 
                  type="radio"
                  name="gender"
                  value="Male"
                />
                <span className="checkmark"></span>
              </label>

              <label className="custom-radio-btn">
                <span className="label">Female</span>
                <input
                  value={"Female"}
                  checked={gender == "Female"}
                 
                  type="radio"
                  name="gender"
                  value="Female"
                />
                <span className="checkmark"></span>
              </label>

              <label className="custom-radio-btn">
                <span className="label">Prefer to not say</span>
                <input
                  value={"Orther"}
                  checked={gender == "Orther"}
                 
                  type="radio"
                  name="gender"
                  value="Orther"
                />
                <span className="checkmark"></span>
              </label>
            </div>
                
                <div className="weight-400 block m-top-10">
                  <input
                  type="checkbox"
                  className=" border-5 border-brown square-20  signin-middle" />
                  <span className=" m-left-8 font-14 remember signin-bottom">I agree to Flatform’s Term of Services and Privacy Policy.
                   </span>
                </div>

                <button className ="btn-regsiter">Register</button>
           </div>
           
 

              
        </div>
   
    );
  };
  
  export default Register;
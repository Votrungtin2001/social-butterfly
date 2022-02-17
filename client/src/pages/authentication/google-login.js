import React, { Component, Fragment } from "react";


function GoogleLoginUI({ onPress }) {
  return (
    <Fragment>
      <button onClick={onPress} className="social-sign-in" >
        <div >
        
          <img
            className="social-logo google-logo"
            src="https://img.icons8.com/color/48/000000/google-logo.png"
          />
          <span className="social-name" >Continue with Google</span>
        </div>
      </button>
    </Fragment>
  );
}
export default GoogleLoginUI;
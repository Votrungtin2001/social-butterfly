import React, { Component } from "react";
// import "./App.css";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from './pages/authentication/login'
import Introduction from "./pages/introduction";
import ConfirmEmail from "./pages/authentication/confirm-email";
import Register from "./pages/authentication/register";
import ForgotPassword from "./pages/authentication/forgot-password";




function App() {

    return (
    <Router>
     {/* <input type="checkbox" id="theme" /> */}
      <div class="App">
        <div className="main">
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/confirm-email" component={ConfirmEmail} />
          <Route exact path="/forgot-password" component={ForgotPassword} />

        </div>
      </div>
    </Router>
  );

}


export default App;

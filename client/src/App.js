import React, { Component } from "react";
// import "./App.css";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from './pages/authentication/sign-in'

import Register from "./pages/authentication/sign-up";





function App() {

    return (
    <Router>
     {/* <input type="checkbox" id="theme" /> */}
      <div class="App">
        <div className="main">
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={Register} />
        
        </div>
      </div>
    </Router>
  );

}


export default App;

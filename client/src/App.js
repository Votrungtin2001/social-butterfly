import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/authentication/sign-in'
import Register from "./pages/authentication/sign-up";
import Home from "./pages/home/home";
import ChangePassword from "./pages/authentication/change_password";
import ActivationEmail from "./pages/authentication/activation-email"
import Introduction from "./pages/introduction/introduction";
import Profile from "./pages/profile/profile";
import ConfirmEmail from "./pages/authentication/confirm-email";
import EditProfile from "./pages/profile/edit-profile"

function App() {

    return (
    <Router>
     {/* <input type="checkbox" id="theme" /> */}
      <div class="App">
        <div className="main">
          <Route exact path="/" component={Introduction} />
          <Route exact path="/sign-up" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/confirm" component={ConfirmEmail} />
          <Route exact path="/sign-in" component={Login} />
          <Route
              path="/activate/:activation_token"
              component={ActivationEmail}
              exact
            />
          <Route exact path="/reset/:reset_token" component={ChangePassword} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/edit-profile" component={EditProfile} />
        </div>
      </div>
    </Router>
  );

}


export default App;

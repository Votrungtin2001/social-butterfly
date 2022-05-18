import React, { Component, useEffect } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Switch } from "react-router";
import Login from './pages/authentication/sign-in'
import Register from "./pages/authentication/sign-up";
import Home from "./pages/home/home";
import ChangePassword from "./pages/authentication/change_password";
import ActivationEmail from "./pages/authentication/activation-email"
import Introduction from "./pages/introduction/introduction";
import Profile from "./pages/profile/profile";
import ConfirmEmail from "./pages/authentication/confirm-email";
import EditProfile from "./pages/profile/edit-profile"
import RemovePost from "./components/remove-post"
import Post from './pages/post/post'
import Message from './pages/chat/index'
import { useSelector, useDispatch } from 'react-redux'
import { checkLogin } from './redux/actions/authActions'
import Discover from './pages/discover/discover'
import Alert from './components/alert'
import CallModal from './pages/chat/components/call-modal'
import Conversation from './pages/chat/message'
import NotFound from "./components/not-found";
import Header from './pages/home/components/header'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { getPosts } from './redux/actions/postActions'
import { getSuggestions } from './redux/actions/suggestionsActions'
import { getNotifies } from './redux/actions/notifyActions'
import StatusModal from './pages/home/components/status_modal'
import SocketClient from './SocketClient'
import { Peer } from 'peerjs'


function App() {
    const { auth, status, modal, call, notify } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(checkLogin())
      const socket = io('http://localhost:5050', {
        transports: ['websocket'],
     });
      dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
      return () => socket.close()
      
    },[dispatch])

    useEffect(() => {
      if(auth.refreshToken) {
        dispatch(getPosts(auth.refreshToken))
        dispatch(getSuggestions(auth.refreshToken))
        dispatch(getNotifies(auth.refreshToken))
      }
    }, [dispatch, auth.refreshToken])

    useEffect(() => {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      else if (Notification.permission === "granted") {}
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {}
        });
      }
    },
    [])
  
   
    useEffect(() => {
      const newPeer = new Peer(undefined, {
        path: '/', secure: true
      })
      
      dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
    },[dispatch])
  


    return (
    <Router>
      <Alert />
     <input type="checkbox" id="theme" /> 
      <div class={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.refreshToken && <Header />}

          {status && <StatusModal />}
          {auth.refreshToken && <SocketClient />}
          {call && <CallModal />}
          <Switch>

          <Route exact path="/" component={Introduction} />
          <Route exact path="/sign-up" component={Register} />
          <Route exact path="/confirm" component={ConfirmEmail} />
          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/remove" component={RemovePost} />
          <Route exact path="/activate/:activation_token" component={ActivationEmail} />
          <Route exact path="/home" component = {auth.accessToken ? 
                Home : Login}
           />
           
          
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/message" component={Message} />
          <Route exact path="/message/:id" component={Conversation} />


          <Route exact path="/reset" component={ChangePassword} />
          <Route exact path="/home/post/:id" component={Post} />
          <Route exact path="/profile/:id" component={auth.accessToken ? Profile : Login} />
          <Route exact path="/profile/:id/edit-profile" component={auth.accessToken ? EditProfile : Login} />
          <Route exact path="*" component={NotFound} />
          </Switch>

          
        </div>
      </div>
    </Router>
  );

}


export default App;

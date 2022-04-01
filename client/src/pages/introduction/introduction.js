import React from 'react'
import {useEffect} from "react";
import Hero from './right-image';
import Navbar from './nav-bar';
import Footer from '../home/components/footer'
import Feature from './feature';
import { useSelector } from 'react-redux'
import { Fragment } from "react/cjs/react.production.min";
import { Redirect } from 'react-router'
const Introduction = () => {
  const { auth } = useSelector(state => state)
    return(
      auth.accessToken ? (
        <Redirect to="/home"/>)
        :(  <Fragment>
              <div>

                <Navbar />

                <Hero />

                <Feature/>

                <Footer/>

              </div>
            </Fragment >)
            
    )
    
}

export default Introduction
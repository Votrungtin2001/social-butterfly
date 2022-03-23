import React from 'react'
import Hero from './right-image';
import Navbar from './nav-bar';
import Footer from '../home/components/footer'
import Feature from './feature';
const Introduction = () => {
    return(
            <div>

              <Navbar />

              <Hero />

              <Feature/>
              
              <Footer/>

            </div>
          )
    
}

export default Introduction
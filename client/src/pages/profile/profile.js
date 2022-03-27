import React, { useEffect, useState } from 'react'
import Info from './info'
import './profile.css'
import Header from '../home/components/header'
const Profile = () => {

   
    return (
        <div className="profile">

           <Header/>
           <Info/>
           
        </div>
    )
}

export default Profile
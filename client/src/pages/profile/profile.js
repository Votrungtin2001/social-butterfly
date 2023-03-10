import React, { useEffect, useState } from 'react'
import Info from './info'
import './profile.css'
import Header from '../home/components/header'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../assets/img/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileActions'
import Posts from './posts'
import Saved from './saved'


const Profile = () => {
    const { id } = useParams()

    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saveTab, setSaveTab] = useState(false)


    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])


   
    return (
        <div className="profile">

           
           <Info auth={auth} profile={profile} dispatch={dispatch} userID={id} />

           { 
                auth.user._id === id &&
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>
                            
                            <h5>Posts</h5>
                        
                        </button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}><h5>Saved</h5></button>
                </div>
             }

            {
                profile.loading 
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>
                    {
                        saveTab
                        ? <Saved auth={auth} dispatch={dispatch} />
                        : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                    }
                </>
            }
           
        </div>
    )
}

export default Profile
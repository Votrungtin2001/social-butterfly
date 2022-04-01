import React, { useState, useEffect } from 'react'
import Avatar from '../../components/avatar'
import EditProfile from './edit-profile'
import FollowBtn from '../../components/follow-btn'
import Followers from './folower'
import Following from './following'
import Popup from 'reactjs-popup';
import { stepConnectorClasses } from '@mui/material'
import { Link } from 'react-router-dom'
import './profile.css'
import moment from "moment";

import { useParams } from 'react-router-dom'

import { getAddressLineByUserID } from '../../utils/fetchData'

import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = ({userID, auth, profile, dispatch}) => {
 
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const { id } = useParams()
    userID = id

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const [addressLine, setAddressLine] = useState("")

    useEffect(() => {
        if(userID === auth.user._id){
            setUserData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === userID)
            setUserData(newData)
        }
    }, [userID, auth, dispatch, profile.users])

    useEffect(() => {
        getAddressLine()
    }, [userID, auth, dispatch, profile.users])

    async function getAddressLine() {
        const res = await getAddressLineByUserID(userID, auth.refreshToken)
        if(res.data == "") setAddressLine("No address information")
        else setAddressLine(res.data)
      }
    

   /* useEffect(() => {
        if(showFollowers || showFollowing || onEdit){
            dispatch({ type: GLOBALTYPES.MODAL, payload: true})
        }else{
            dispatch({ type: GLOBALTYPES.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, onEdit, dispatch])*/

    return (
        <div className="info">
            {
              userData.map(user =>  (
                <div className="info_container" key={user._id}>
                    <Avatar src={user.avatar} size="supper-avatar" />

                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.fullName}</h2>
                            {
                                user._id === auth.user._id
                                ?  <Link  to={`/home/profile/${user._id}/edit-profile`}>
                                    <button className="edit-profile-btn">Edit Profile</button>
                                </Link>
                                
                                : <FollowBtn user={user} />
                            }
                           
                            
                        </div>

                        <div className="follow_btn">
                            <span className="number-follow" onClick={() => setShowFollowers(true)}>
                                {user.followers.length} 
                                <span className='text-follow'> followers</span>
                            </span>

                            <span className="number-follow m-left-50" onClick={() => setShowFollowing(true)}>
                                {user.following.length} <span className='text-follow'> following</span>
                            </span>
                        </div>

                        <h6>{moment(user.birthday).format("DD/MM/YYYY")} 
                        {/* <span className="text-danger">{user.mobile}</span> */}
                        </h6>
                        <p className="m-0">{user.email}</p>
                        <h6 className="m-0">{addressLine}</h6>
                        <a href={user.website} target="_blank" rel="noreferrer">
                            {user.website}
                        </a>
                        <p>{user.story}</p>
                    </div>

                    {
                        onEdit && <EditProfile setOnEdit={setOnEdit} />
                    }

                    {
                        showFollowers &&
                        <Followers 
                        users={user.followers} 
                        setShowFollowers={setShowFollowers} 
                        />
                    }
                    {
                        showFollowing &&
                        <Following 
                        users={user.following} 
                        setShowFollowing={setShowFollowing} 
                        />
                    }
                </div>
            ))
            }
        </div>
    )
}

export default Info
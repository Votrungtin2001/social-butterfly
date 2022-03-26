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
const Info = () => {
 
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

   

    return (
        <div className="info">
            {
              
                    <div className="info_container" >
                        <Avatar  size="supper-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>name</h2>
                                {
                                    1 === 1
                                    ?  <Link  to="/edit-profile">
                                        <button className="edit-profile-btn">Edit Profile</button>
                                    </Link>
                                    
                                    : <FollowBtn  />
                                }
                               
                                
                            </div>

                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                    14 Followers
                                </span>
                                <span className="ml-4 m-left-50" onClick={() => setShowFollowing(true)}>
                                    113 Following
                                </span>
                            </div>

                            <h6>minhthi.nekk</h6>
                            <p className="m-0">binh dinh, viet nam, trai dat</p>
                            
                            <a target="_blank" rel="noreferrer">
                                fb.com
                            </a>
                            <p>this is sad story</p>
                        </div>

                        <Popup open={onEdit} onClose={() => setOnEdit(false)} nested modal closeOnDocumentClick={false}>
                
                {<EditProfile
                  
                
                  />}
              </Popup>

                        {
                            showFollowers &&
                            <Followers 
                            
                            setShowFollowers={setShowFollowers} 
                            />
                        }
                        {
                            showFollowing &&
                            <Following 
                           
                            setShowFollowing={setShowFollowing} 
                            />
                        }
                    </div>
                
            }
        </div>
    )
}

export default Info
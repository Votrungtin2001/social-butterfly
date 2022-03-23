import React, { useState, useEffect } from 'react'
import Avatar from '../../components/avatar'
import EditProfile from './edit-profile'
import FollowBtn from '../../components/follow-btn'
import Followers from './folower'
import Following from './following'
import Popup from 'reactjs-popup';
import { stepConnectorClasses } from '@mui/material'
import { Link } from 'react-router-dom'

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
                                    ?  <Link className="btn btn-outline-info"
                                    to="/edit-profile">
                                        Edit Profile
                                    </Link>
                                    
                                    : <FollowBtn  />
                                }
                               
                                
                            </div>

                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                    14 Followers
                                </span>
                                <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                    113 Following
                                </span>
                            </div>

                            <h6>minhthi.nekk<span className="text-danger">0886026218</span></h6>
                            <p className="m-0">binh dinh</p>
                            <h6 className="m-0">mail@gmail.com</h6>
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
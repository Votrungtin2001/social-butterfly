import React from 'react'
import UserCard from '../../components/user-card'
import FollowBtn from '../../components/follow-btn'
import { useSelector } from 'react-redux'
import exit from "../../assets/login/exit.png"

const Followers = ({users, setShowFollowers}) => {
    const { auth } = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
               
                <div className="header-follow">
                        <span></span>
                        <span className="weight-500 font-24">Followers</span>
                        <button className=" close-image" onClick={() => setShowFollowers(false)}>
                            <img src={exit} />
                        </button>
                    </div>
                <hr/>
                
                <div className="follow_content">
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers} >
                                {
                                    auth.user._id !== user._id && <FollowBtn user={user} />
                                }
                            </UserCard>
                        ))
                    }
                </div>
                

               
                
            </div>
        </div>
    )
}

export default Followers
import React from 'react'
import UserCard from '../../components/user-card'
import FollowBtn from '../../components/follow-btn'
import { useSelector } from 'react-redux'
import exit from "../../assets/login/exit.png";

const Following = ({users, setShowFollowing}) => {

    const { auth } = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
                <div className="header-follow">
                        <span></span>
                        <span className="weight-500 font-24">Following</span>
                        <button className=" close-image" onClick={() => setShowFollowing(false)}>
                            <img src={exit} />
                        </button>
                    </div>
                <hr/>

                <div className="follow_content">
                    {
                        users.map(user => (
                            <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing} >
                                {
                                    auth.user._id !== user._id && <FollowBtn user={user} />
                                }
                            </UserCard>
                        ))
                    }
                </div>
{/*                
                <div className="close" onClick={() => setShowFollowing(false)}>
                    &times;
                </div> */}
                
            </div>
        </div>
    )
}

export default Following
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as LogoIcon } from "../../../assets/img/logo-text.svg";
import { Link } from 'react-router-dom'
import UserCard from '../../../components/user-card'
import FollowBtn from '../../../components/follow-btn'
import LoadIcon from '../../../assets/img/loading.gif'
import { getSuggestions } from '../../../redux/actions/suggestionsActions'

const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="mt-3 rightside-bar">
            <div className='user-card-main'>
            <UserCard user={auth.user} />
            </div>
            

            <div className="d-flex justify-content-between align-items-center my-2">
                <h7>Suggestions for you</h7>
                {
                    !suggestions.loading &&
                    <i className="fas fa-redo" style={{cursor: 'pointer'}}
                    onClick={ () => dispatch(getSuggestions(auth.token)) } />
                }
            </div>

            {
                suggestions.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <div className="suggestions">
                    {
                        suggestions.users.map(user => (
                            <UserCard key={user._id} user={user} >
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }

            <div style={{opacity: 0.5}} className="my-2" >
           
                <small>
                   &copy; 2022 SOCIAL BUTTERFLY FROM UIT
                </small>
            </div>

        </div>
    )
}

export default RightSideBar
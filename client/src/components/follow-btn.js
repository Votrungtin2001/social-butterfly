import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false)

    const handleFollow =  async () => {
        setFollowed(true)
    }

    const handleUnFollow = async () => {
        setFollowed(false)
    }

    return (
        <>
        {
            followed
            ? <button className="btn btn-outline-danger"
            onClick={handleUnFollow}>
                UnFollow
            </button>
            : <button className="btn btn-outline-info"
            onClick={handleFollow}>
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn
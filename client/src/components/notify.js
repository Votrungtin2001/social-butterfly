import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import RemovePost from './remove-post'
const Notify = () => {

    const { notify } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className='loading-parent'>
        <div className='loading-child'>
        {notify.notify && <RemovePost />}
        </div>
    </div>
    )
}

export default Notify
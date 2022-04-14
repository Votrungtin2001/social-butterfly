import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadingPage from './loadingPage'
import Loading from './loading'
import LoadingVer2 from './loading-ver2'
const Alert = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className='loading-parent'>
            <div className='loading-child'>
            {alert.loading && <LoadingVer2 />}
            </div>
        </div>
    )
}

export default Alert
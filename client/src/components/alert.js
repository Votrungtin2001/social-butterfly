import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadingPage from './loadingPage'

const Alert = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <LoadingPage />}
        </div>
    )
}

export default Alert
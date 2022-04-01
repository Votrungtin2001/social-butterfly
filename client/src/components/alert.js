import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadingPage from './loadingPage'
import Loading from './loading'
const Alert = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading />}
        </div>
    )
}

export default Alert
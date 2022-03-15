import React from 'react'
import './error-message.css'

export const showErrMsg = (msg) => {
    return (<div className="errMsg">{msg}</div> );
}
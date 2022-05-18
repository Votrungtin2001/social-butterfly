import React from 'react'
import LeftSide from '../../pages/chat/components/left-side'
import './message.css'

const Message = () => {
    return (
        <div>
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0 right_mess">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">

                    <div className='chat-image'> <img></img>
                </div>
                    <h6>Send photos and private messages to friends or groups.</h6>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Message
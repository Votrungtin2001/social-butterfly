import React from 'react'
import LeftSide from '../../pages/chat/components/left-side'
import RightSide from '../../pages/chat/components/right-side'
import Header from '../home/components/header'
import './message.css'

const Conversation = () => {

    return (
        <div>
           <Header/>
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0 left_mess">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0">
                <RightSide />
            </div>
        </div>
        </div>
    )
}

export default Conversation
import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import {  deleteMessages } from '../../../redux/actions/messageActions'
import { Fragment } from 'react/cjs/react.production.min';
import './delete-message.css'

const DeleteMsg = ({handleCloseDelete,msg,data}) => {

    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const newArr = notify.data.filter(item => item.isRead === false)
    const history = useHistory()

      
    const handleRemove = () => {
        dispatch(deleteMessages({msg, data, auth}))
        handleCloseDelete()
        }

   

    return (
        <Fragment>
        <div className="delete-msg-container h-auto" id="container">
        <div className='forgotLeft'>
        <div className='removeImage'> <img></img>
        </div>
        </div>
        <div className='forgotRight'>
 
        <div className="forgot-title">
            <div className=" font-14">Are you want to delete message?</div>
        </div>
        <div className="content-forgot">
   
   

           <div className='remove-bottom'>
           <button 
           onClick={handleCloseDelete}
className="cancel-btn">
           Cancel
             </button>

           <button
              onClick={handleRemove}
                className="send-email-btn">
                Yes
            </button>
           </div>
          
        </div>
        </div>
        
    </div>
    </Fragment>
    )
}

export default DeleteMsg
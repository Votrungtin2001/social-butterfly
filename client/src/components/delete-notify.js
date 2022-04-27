import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import {  deleteAllNotifies } from '../redux/actions/notifyActions'

 import "./delete-notify.css"
import { Fragment } from 'react/cjs/react.production.min';


const DeleteNotify = ({handleCloseDelete}) => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const newArr = notify.data.filter(item => item.isRead === false)
    const history = useHistory()

      
    const handleRemove = () => {
      dispatch(deleteAllNotifies(auth.refreshToken))
      handleCloseDelete()
        }

   

    return (
        <Fragment>
        <div className="delete-container h-auto" id="container">
        <div className='forgotLeft'>
        <div className='removeImage'> <img></img>
        </div>
        </div>
        <div className='forgotRight'>
 
        <div className="forgot-title">
            <div className=" font-14">You have {newArr.length} unread notices. Are you sure you want to delete all?</div>
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

export default DeleteNotify
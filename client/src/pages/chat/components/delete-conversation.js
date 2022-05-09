import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {  deleteConversation } from '../../../redux/actions/messageActions'
import { Fragment } from 'react/cjs/react.production.min';


const DeleteConversation = ({handleCloseDelete}) => {

    const { auth, notify } = useSelector(state => state)
    const { id } = useParams()

    const dispatch = useDispatch()
    
    const history = useHistory()

      
    const handleRemove = () => {
        dispatch(deleteConversation({auth, id}))
        
        handleCloseDelete()
        history.push('/message')
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
            <div className=" font-14">Are you want to delete conversation?</div>
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

export default DeleteConversation
import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import { deletePost } from '../redux/actions/postActions'

 import "./remove-post.css"
import { Fragment } from 'react/cjs/react.production.min';


const RemovePost = ({ handleCloseNotify}) => {
  
    const handleRemove = () => {
      
    }

   

    return (
        <Fragment>
        <div className="remove-container w-440 h-auto" id="container">
        <div className='forgotLeft'>
        <div className='removeImage'> <img></img>
        </div>
        </div>
        <div className='forgotRight'>
 
        <div className="forgot-title">
            <div className="opacity-50 font-14">Are you sure want to delete this post?</div>
        </div>
        <div className="content-forgot">
   
   

           <div className='remove-bottom'>
           <button 
           onClick={handleCloseNotify}
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

export default RemovePost
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoNotice from '../assets/img/undraw_notify_re_65on.svg'
import deleteIcon from '../assets/icons/delete.svg'
import { Link } from 'react-router-dom'
import Avatar from './avatar'
import moment from 'moment'
import './notify-modal.css'
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyActions'

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch()


    const handleIsRead = (msg) => {
        dispatch(isReadNotify({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

        if(window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)){
            return dispatch(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div className='notify-modal-container'>
            <div className="notify-header m-left-8">
                <h5>Notification</h5>
                <div className='icon---'>
                 {
                    notify.sound 
                    ? <i className="fas fa-bell" 
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />

                    : <i className="fas fa-bell-slash"
                    style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    onClick={handleSound} />
                 }
                <button className="delete-icon-container"  onClick={handleDeleteAll}>
                    
                   <img  />
                </button>
                </div>
            </div>
            <hr className="mt-0" />

            {
                notify.data.length === 0 &&
                <div className='notify-img-container'>
                    <img src={NoNotice} alt="NoNotice" className="notify-img" />
                    <h6>No notifications yet.</h6>
                    <small>Check back later for update</small>
                </div>
               
            }

            <div style={{maxHeight: 'calc(100vh - 200px)', overflow: 'auto'}}>
                {
                    notify.data.map((msg, index) => (
                        <div key={index} className="px-2 mb-3" >
                            <Link to={`${msg.url}`} className="d-flex text-dark align-items-center none-line"
                            onClick={() => handleIsRead(msg)}>
                                <Avatar src={msg.user.avatar} size="big-avatar" />

                                <div className="m-left-8">
                                <div className=" flex-fill font-12">
                                    <div >
                                        <strong className="mr-1">{msg.user.fullName}</strong>
                                        <span>{msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                                </div>

                                {
                                    msg.image &&
                                    <div style={{width: '30px'}}>
                                        {
                                            msg.image.match(/video/i)
                                            ? <video src={msg.image} width="100%" />
                                            : <Avatar src={msg.image} size="medium-avatar" />
                                        }
                                    </div>
                                }
                                
                                <small className="text-muted d-flex justify-content-between font-12 ">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle text-primary" />
                                }
                                </small>

                                </div>
                                    
                            </Link>
                           
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default NotifyModal
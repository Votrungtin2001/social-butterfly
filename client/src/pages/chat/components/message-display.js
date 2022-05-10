import React ,{useState}from 'react'
import Avatar from '../../../components/avatar'
import { imageShow, videoShow } from '../../../utils/media_show'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessages } from '../../../redux/actions/messageActions'
import DeleteMsg from './delete-message'
import moment from 'moment'
import Popup from 'reactjs-popup'
import Times from './times'


const MsgDisplay = ({user, msg, theme, data,comment}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [openDeleteMsg, setOpenDeleteMsg] = useState(false)
    const [isDisplayTime, setIsDisplayTime] = useState(true)

    const handleDeleteMessages = () => {
        if(!data) return;

        setOpenDeleteMsg(true)
        // if(window.confirm('Do you want to delete?')){
        //     dispatch(deleteMessages({msg, data, auth}))
        // }
    }
    const handleCloseMsg = () => {
        setOpenDeleteMsg(false)
        
    }
    function calculateTimeAgoSinceDate1() {
        var now = moment(new Date()); //todays date
        var end = moment(msg.createdAt); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();

  
        if(days > 7) return moment(msg.createdAt).format('dd/MM/yyyy'); 
        else if(days >= 2 && days <= 7) return moment(msg.createdAt).format('EEEE');
        else if(days > 1 && days < 2) return moment(msg.createdAt).format('kk:mm a') + ' Yesterday';
        else return moment(msg.createdAt).format('kk:mm a');
  
      }
    

    return (
        <>
            {/* {isDisplayTime ? <h7 className='text-center'>{calculateTimeAgoSinceDate1()}</h7> : <h7>{calculateTimeAgoSinceDate1}</h7>} */}
            <div className="chat_title">
                <Avatar src={user.avatar} size="small-avatar" />
                <span>{user.username}</span>
            </div>

            <div className="you_content">
                { 
                    user._id === auth.user._id && 
                    <i className="fas fa-trash text-danger"
                    onClick={handleDeleteMessages} />
                }
 <Popup open={openDeleteMsg} onClose={() => setOpenDeleteMsg(false)} nested modal closeOnDocumentClick={false}>
                
                {<DeleteMsg
                  handleCloseDelete={handleCloseMsg}
                msg={msg}
                data={data}
                  />}
              </Popup>
                <div>
                    {
                        msg.text && 
                        <div className="chat_text"
                        style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>
                            {msg.text}
                        </div>
                    }
                    {
                        msg.media.map((item, index) => (
                            <div key={index}>
                                {
                                    item.url.match(/video/i)
                                    ? videoShow(item.url, theme)
                                    : imageShow(item.url, theme)
                                }
                            </div>
                        ))
                    }
                </div>
            
                {
                    msg.call &&
                    <button className="btn d-flex align-items-center py-3"
                    style={{background: '#eee', borderRadius: '10px'}}>

                        <span className="material-icons font-weight-bold mr-1"
                        style={{ 
                            fontSize: '2.5rem', color: msg.call.times === 0 ? 'crimson' : 'green',
                            filter: theme ? 'invert(1)' : 'invert(0)'
                        }}>
                            {
                                msg.call.times === 0
                                ? msg.call.video ? 'videocam_off' : 'phone_disabled'
                                : msg.call.video ? 'video_camera_front' : 'call'
                            }
                        </span>

                        <div className="text-left">
                            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
                            <small>
                                {
                                    msg.call.times > 0 
                                    ? <Times total={msg.call.times} />
                                    : new Date(msg.createdAt).toLocaleTimeString()

                                }
                            </small>
                        </div>

                    </button>
                }
            
            </div>

            <div className="chat_time">
            {/* {moment(msg.createdAt).format("h:mm")}
             */}
             {calculateTimeAgoSinceDate1()}
            </div>
        </>
    )
}

export default MsgDisplay
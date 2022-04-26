import React, {useState} from 'react'
import Avatar from '../../../../components/avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../../redux/actions/globalTypes'
import {deletePost} from '../../../../redux/actions/postActions'
import Popup from 'reactjs-popup'
import RemovePost from '../../../../components/remove-post'
// import { BASE_URL } from '../../../utils/config'

const CardHeader = ({post}) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [openNotify, setOpenNotify] = useState(false)
    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
    }
    const handleCloseNotify = () => {
        setOpenNotify(false)
    }

    const handleDeletePost = () => {
        setOpenNotify(true);
        // if(window.confirm("Are you sure want to delete this post?")){
        //     dispatch(deletePost({post, auth, socket}))
        //     return history.push("/home")
        // }
    }

    const handleCopyLink = () => {
        // navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
            <Link to={`home/profile/${post.user._id}`} >
            <Avatar src={post.user.avatar} size="big-avatar" />
                        </Link>
                

                <div className="card_name m-left-8">
                    <h6 className="m-0">
                        <Link to={`home/profile/${post.user._id}`} className="text-dark none-line text-bold">
                            {post.user.fullName}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost} >
                                <span className="material-icons">delete_outline</span> Remove Post
                            </div>
                        </>
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                </div>
                <Popup open={openNotify} onClose={() => setOpenNotify(false)} nested modal closeOnDocumentClick={false}>
                
                {<RemovePost
                  handleCloseNotify={handleCloseNotify}
                
                  />}
              </Popup>
            </div>
        </div>
    )
}

export default CardHeader
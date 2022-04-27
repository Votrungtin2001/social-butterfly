import React, { useState, useEffect } from 'react'
import Avatar from '../../../../components/avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../../components/comments.css'
import LikeButton from '../../../../components/like-button'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from '../comments/comment-menu'
import { updateComment, likeComment, unLikeComment } from '../../../../redux/actions/commentActions'
import InputComment from '../input-comment'
import cancelIcon from '../../../../assets/icons/cancel.svg'
import InputCommentEdit from '../input-comment-edit'


const CommentCard = ({children, comment, post, commentId}) => {
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [onEdit, setOnEdit] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [onReply, setOnReply] = useState(false)


    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }
    },[comment, auth.user._id])

    const handleUpdate = () => {
        if(comment.content !== content){
            dispatch(updateComment({comment, post, content, auth}))
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }
    }


    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;
        setIsLike(false)

        setLoadLike(true)
        await dispatch(unLikeComment({comment, post, auth}))
        setLoadLike(false)
    }


    const handleReply = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none',
    
    }

    return (
        <div className="comment_card mt-2" style={styleCard}>
        
            <div className="comment_content">

            <Avatar src={comment.user.avatar} size="medium-avatar" />


                <div className="flex-fill text-comment m-left-8" 
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>

                 <Link to={`home/profile/${comment.user._id}`} className="d-flex text-dark none-line">
                     <h6>{comment.user.fullName}</h6>
                 </Link>
                    {
                        onEdit 
                        ? <input value={content} onChange={e => setContent(e.target.value)} 
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            width:'100%'
                        }}/>

                        : <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`home/profile/${comment.tag._id}`} className="mr-2 none-line">
                                    {comment.tag.fullName}
                                </Link>
                            }
                            <span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content + ' ' : content.slice(0, 100) + '....'
                                }
                            </span>
                            {
                                content.length > 100 &&
                                <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                    {readMore ? 'Hide content' : 'Read more'}
                                </span>
                            }
                        </div>
                    }
                    
                        <small className="text-muted mr-3 font-12">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        {
                            onEdit
                            ? <>
                                <small className="font-weight-bold mr-3 m-left-8 font-12"
                                onClick={handleUpdate}>
                                    Update
                                </small>
                                <small className="font-weight-bold mr-3 m-left-8 font-12"
                                onClick={() => setOnEdit(false)}>
                                    Cancel
                                </small>
                            </>
                            : <small className="font-weight-bold mr-3 m-left-8 font-12"
                            onClick={handleReply}>
                                {onReply ? '' : 'Reply'}
                            </small>
                        }
 {
                onReply &&
                <div className='reply-input'>
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                    <Link to={`/profile/${onReply.user._id}`} className="none-line">
                        {onReply.user.fullName}:
                    </Link>
                    
                </InputComment>
                <button className='cancel-reply' onClick={() => setOnReply(false)}>
                    <img src={cancelIcon}></img>
                </button>
 
                </div>
            }
                    
                    
                </div>
                <div className="d-flex align-items-center mx-2" style={{cursor: 'pointer'}}>
                    <div className='like-button-container'>
                        <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                        <small className="font-weight-bold mr-3 ">
                            {comment.likes.length}
                        </small>
                    </div>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />

                </div>
                
            </div> 
            
           

            {children}
        </div>
    )
}

export default CommentCard




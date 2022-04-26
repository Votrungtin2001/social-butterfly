import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../../redux/actions/commentActions'
import postIcon from '../../../assets/icons/post.svg'

import Icons from '../components/icons'

const InputCommentEdit = ({children, post, onReply, setOnReply}) => {
    const [content, setContent] = useState('')

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
            return;
        }

        setContent('')
        
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        
        dispatch(createComment({post, newComment, auth, socket}))

        if(setOnReply) return setOnReply(false);
    }

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit} >
            {children}
             <Icons setContent={setContent} content={content} theme={theme} />
            <input type="text" placeholder="Write a comment..."
            value={content} onChange={e => setContent(e.target.value)}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                backgroundColor: 'transparent',
            }} />

           

            <button type="submit" className="postBtn">
                <img src={postIcon} className='post-icon'></img>
            </button>
        </form>
    )
}

export default InputCommentEdit
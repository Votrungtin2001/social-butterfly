
import React, { useState, useEffect } from 'react'
import CommentDisplay from '../components/comments/comment-display'
import './comments.css'

const Comments = ({post}) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = post.comments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    },[post.comments, next])

    useEffect(()=> {
        const newRep = post.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [post.comments])

    return (
        <div className="comments">
            {
                comments.length - next > 0
                ? <div className='see-comments'
                style={{cursor: 'pointer', textAlign:'start',fontSize:'12px',padding:'10px 35px 0px 35px'}}
                onClick={() => setNext(next + 10)}>
                    See all {comments.length} comments.
                </div>

                : comments.length > 2 &&
                <div className='see-comments'
                style={{cursor: 'pointer', textAlign:'start', fontSize:'12px', padding:'10px 35px 0px 35px'}}
                onClick={() => setNext(2)}>
                    Hide comments.
                </div>
            }
            
            {
                showComments.map((comment, index) => (
                    <CommentDisplay key={index} comment={comment} post={post}
                    replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }

            
        </div>
    )
}

export default Comments
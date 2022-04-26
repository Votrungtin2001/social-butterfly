import React, { useState, useEffect } from 'react'
import CommentCard from './comment-card'
import '../../components/comments.css'

const CommentDisplay = ({comment, post, replyCm}) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    },[replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4 m-left-32">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                            key={index}
                            comment={item}
                            post={post}
                            commentId={comment._id}
                             />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                        ? <div className='see-comments'
                        style={{cursor: 'pointer', textAlign:'start',fontSize:'12px',marginLeft:'43px'}}
                        onClick={() => setNext(next + 10)}>
                            See all {replyCm.length} comments.
                        </div>

                        : replyCm.length > 1 &&
                        <div className='see-comments'
                        style={{cursor: 'pointer', textAlign:'start',fontSize:'12px',marginLeft:'43px'}}
                        onClick={() => setNext(1)}>
                            Hide comments.
                        </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
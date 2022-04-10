import React from 'react'
import CardHeader from './post_card/card_header'
import CardBody from './post_card/card_body'
import CardFooter from './post_card/card_footer'

const PostCard = ({post, theme}) => {
    return (
        <div className="card my-3"> 
            <CardHeader post={post} />
            <CardBody post={post} theme={theme} />
            <CardFooter post={post} />

            {/* <Comments post={post} />
            <InputComment post={post} /> */}
        </div>
    )
}

export default PostCard
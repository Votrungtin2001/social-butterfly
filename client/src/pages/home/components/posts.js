import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from './post_card'
import LoadIcon from '../../../assets/img/loading.gif'
import LoadMoreBtn from '../../../components/load_more_btn'
import { getDataAPI } from '../../../utils/fetchData'
import { POST_TYPES } from '../../../redux/actions/postActions'

const Posts = () => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.refreshToken)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    return (
        <div className="posts">
            {
                homePosts.posts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme}  />
                ))
            }

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Posts
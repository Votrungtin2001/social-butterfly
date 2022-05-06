import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../../redux/actions/discoverActions'
import LoadIcon from '../../assets/img/loading.gif'
import PostThumb from '../../components/post-thumb'
import LoadMoreBtn from '../../components/load_more_btn'
import Header from '../home/components/header'
import { getDataAPI} from '../../utils/fetchData'

const Discover = () => {
    const { auth, discover } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(!discover.firstLoad){
            dispatch(getDiscoverPosts(auth.refreshToken))
        }
    },[dispatch, auth.refreshToken, discover.firstLoad])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`post/post_discover?num=${discover.page * 9}`, auth.refreshToken)
        dispatch({type: DISCOVER_TYPES.UPDATE_POST, payload: res.data})
        setLoad(false)
    }

    return (
        <div>
        <div>
            {
                discover.loading 
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <PostThumb posts={discover.posts} result={discover.result} />
            }

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            {
                !discover.loading &&
                <LoadMoreBtn result={discover.result} page={discover.page}
                load={load} handleLoadMore={handleLoadMore} />
            }
            
        </div>
        </div>
    )
}

export default Discover
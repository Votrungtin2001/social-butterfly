import React, { useState, useEffect } from 'react'
import PostThumb from '../../components/post-thumb'
import LoadIcon from '../../assets/img/loading.gif'
import LoadMoreBtn from '../../components/load_more_btn'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Saved = ({auth, dispatch}) => {
    const [savePosts, setSavePosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('post/getSavePosts', auth.refreshToken)
        .then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })

        return () => setSavePosts([])
    },[auth.refreshToken, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`post/getSavePosts?limit=${page * 9}`, auth.refreshToken)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <div>
            <PostThumb posts={savePosts} result={result} />

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={result} page={page}
            load={load} handleLoadMore={handleLoadMore} />
            
        </div>
    )
}

export default Saved
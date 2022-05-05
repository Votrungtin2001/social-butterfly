import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, getDiscovertPostsApi } from '../../utils/fetchData'
import { toast } from 'react-toastify';

export const DISCOVER_TYPES = {
    LOADING: 'LOADING_DISCOVER',
    GET_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_POST: 'UPDATE_DISCOVER_POST'
}

export const getDiscoverPosts = (token) => async (dispatch) => {
    try {
        dispatch({type: DISCOVER_TYPES.LOADING, payload: true})

        const res = await getDiscovertPostsApi(token)
        dispatch({type: DISCOVER_TYPES.GET_POSTS, payload: res.data})

        dispatch({type: DISCOVER_TYPES.LOADING, payload: false})

    } catch (err) {
        toast.error(err, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}
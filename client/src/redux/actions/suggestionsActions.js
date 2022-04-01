import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, getSuggestionsApi } from '../../utils/fetchData'
import { toast } from 'react-toastify';

export const SUGGES_TYPES = {
    LOADING: 'LOADING_SUGGES',
    GET_USERS: 'GET_USERS_SUGGES',
}

export const getSuggestions = (token) => async (dispatch) => {
    try {
        //dispatch({ type: SUGGES_TYPES.LOADING, payload: true })
        
        const res = await getSuggestionsApi(token)
        dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data })

        //dispatch({ type: SUGGES_TYPES.LOADING, payload: false })
        
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
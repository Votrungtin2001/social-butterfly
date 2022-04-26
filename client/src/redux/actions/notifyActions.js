import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI, createNotifyApi, getNotifiesApi } from '../../utils/fetchData.js'

import { toast } from 'react-toastify';

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await createNotifyApi(msg, auth.refreshToken)

        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                fullName: auth.user.fullName,
                avatar: auth.user.avatar
            }
        })
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

export const removeNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/deleteNotify/${msg.id}?url=${msg.url}`, auth.refreshToken)
        
        socket.emit('removeNotify', msg)
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

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getNotifiesApi(token)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
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


export const isReadNotify = ({msg, auth}) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try {
        await patchDataAPI(`notify/isReadNotify/${msg._id}`, null, auth.refreshToken)
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

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: []})
    try {
        await deleteDataAPI('notify/deleteAllNotifies', token)
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
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
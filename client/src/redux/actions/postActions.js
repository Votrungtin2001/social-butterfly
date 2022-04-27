import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI, addPost, getPostsApi, getPostApi } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyActions'
import { toast } from 'react-toastify'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}


export const createPost = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)

        const res = await addPost(content, media, auth.refreshToken)

        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/home/post/${res.data.newPost._id}`,
            content, 
            image: media[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

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

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getPostsApi(token)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
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

export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        //dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`post/${status._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.refreshToken)

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })

        //dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
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

export const likePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.refreshToken)
        
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/home/post/${post._id}`,
            content: post.content, 
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

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

export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.refreshToken)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/home/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

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

export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await getPostApi(id, auth.refreshToken)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
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
}

export const deletePost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })

    try {
        const res = await deleteDataAPI(`post/deletePost/${post._id}`, auth.refreshToken)

        toast.success("The post has been successfully deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        // Notify
        const msg = {
            id: post._id,
            text: 'deleted this post.',
            recipients: res.data.post.user.followers,
            url: `/home/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
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

export const savePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`post/savePost/${post._id}`, null, auth.refreshToken)
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

export const unSavePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`post/unSavePost/${post._id}`, null, auth.refreshToken)
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
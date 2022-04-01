import axios from 'axios'

//Search Users
export const getUsersBySearch = async (name, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/search`, {
      fullName: name,
    })
    return res;
}

//Get profile
export const getProfileByUserID = async (id, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/getProfile`, {
      id: id,
    })
    return res;
}

//Get user
export const getUser = async (id, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/getUser`, {
      userID: id,
    })
    return res;
}

//Get address line
export const getAddressLineByUserID = async (userID, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res1 = await getUser(userID, token)
    const {address} = res1.data.user
    const res2 = await axios.post(`${process.env.REACT_APP_API_URL}/api/address/getAddressLine`, {
        address: address,
    })
    return res2;
}

//Get provinces
export const getProvinces = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/address/provinces`)
    return res;
}

//Get districts with selected province
export const getDistrictsWithSelectedProvince = async (provinceID) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/address/provinces/${provinceID}/districts`)
    return res;
}

//Get wards with selected district
export const getWardsWithSelectedDistrict = async (districtID) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/address/districts/${districtID}/wards`)
    return res;
}

//Update user with New Profile
export const updateUserWithNewProfile = async (userData, address, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/updateUser`, {
      userData: userData,
      address: address
    })
    return res;
}

//Update email
export const updateEmail = async (email, userID, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/updateEmail`, {
      userID: userID,
      email: email
    })
    return res;
}

//Add post
export const addPost = async (content, media, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/post/createPost`, {
      content: content,
      images: media
    })
    return res;
}

//Get posts
export const getPostsApi = async (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/getPosts`, {})
    return res;
}

//Get user posts
export const getUserPostsApi = async (id, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/user_posts/${id}`, {})
    return res;
}

//Get post
export const getPostApi = async (id, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/post/getPost`, {
        id: id
    })
    return res;
}

//Create comment
export const createCommentApi = async (data, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comment/createComment`, {
        data: data,
    })
    return res;
}

//Create discovert posts
export const getDiscovertPostsApi = async (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/post_discover`, {
    })
    return res;
}

//Create discovert posts
export const addMessageApi = async (msg, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/message/createMessage`, {
        msg: msg
    })
    return res;
}

//Get conversations
export const getConversationsApi = async (page, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/message/conversations?limit=${page * 9}`, {
    })
    return res;
}

//Get messages
export const getMessagesApi = async (id, page, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/message/${id}?limit=${page * 9}`, {
    })
    return res;
}

//Create notify 
export const createNotifyApi = async (msg, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/notify/createNotify`, {
        msg: msg
    })
    return res;
}

//Get notifies 
export const getNotifiesApi = async (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notify/getNotifies`, {
    })
    return res;
}

//Get suggestions
export const getSuggestionsApi = async (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getSuggestionUsers`, {
    })
    return res;
}



export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/${url}`, post, {
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/${url}`)
    return res;
}
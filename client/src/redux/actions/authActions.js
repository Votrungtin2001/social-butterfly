import { GLOBALTYPES } from './globalTypes'
import Cookies from 'js-cookie';
import axios from 'axios'

const setAccessAndRefreshToken = (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
}
const removeUserCookies = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
}

export const checkLogin = () => async (dispatch) => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if(accessToken && refreshToken){
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/checkLogin`, {
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
            .then((res) => {
                const {accessToken, refreshToken, user} = res.data
                dispatch({ 
                    type: GLOBALTYPES.AUTH, 
                    payload: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: user
                    } 
                })
                dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                setAccessAndRefreshToken(accessToken, refreshToken)
                console.log("logged")
          
           })
        .catch((err) => {
            dispatch({ 
                type: GLOBALTYPES.AUTH, 
                payload: {} 
            })
            removeUserCookies()
        });
    }
}

export const logout = () => async (dispatch) => {
    removeUserCookies()
    window.location.href = "/sign-in"
}
import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import "./activation-email.css"
const ActivationEmail = () => {
    const history = useHistory();
    const { activation_token } = useParams()
    const [announce, setAnnounce] = useState("")
    useEffect(() => {
        if (activation_token) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/api/auth/activate`, {
                    token: activation_token,
                })
                .then(res => {
                    //Dùng toast (Dùng thêm toast thông báo)

                    setAnnounce("Xác thực tài khoản thành công") // cái này giữ nguyên khỏi xóa
                    
                    //Cho delay khoảng 3s rồi hãy chạy history ở dưới
                    history.replace('/')
                })
                .catch(error => {
                    setAnnounce("Link xác thực đã hết hạn. Vui lòng thử lại sau")
                });
        }
    }, [activation_token])


    return (
        <Fragment>
            <div className="activation-container">
                <h1>{announce}</h1>
                <button onClick={() => history.replace('/')} className="activation-custom-btn">Đi đến trang chủ</button>
            </div>
        </Fragment>
    )
}

export default ActivationEmail
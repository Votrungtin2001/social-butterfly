import React from 'react'
import { useSelector } from 'react-redux'
import "./avatar.css"
import avatar from '../assets/img/hero.png'

const Avatar = ({src, size}) => {
    const { theme } = useSelector(state => state)

    return (
        <img src={src} alt="avatar" className={size}
            style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}}
         />
    )
}

export default Avatar
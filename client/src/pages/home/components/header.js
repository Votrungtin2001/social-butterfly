import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Menu from './menu'
import Search from './search'
import "./header.css"
import { ReactComponent as LogoIcon } from "../../../assets/img/logo-text.svg";
import {getPosts} from "../../../redux/actions/postActions"

const Header = () => {
    const { auth, post } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">

                <Link  className="logo" to='/' onClick={ () => dispatch(getPosts(auth.refreshToken)) }>
                
                     <LogoIcon /> 
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header
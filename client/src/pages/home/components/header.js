import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './menu'
import Search from './search'
import "./header.css"
import { ReactComponent as LogoIcon } from "../../../assets/img/logo-text.svg";
const Header = () => {

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">

                <Link to="/home" className="logo">
                    {/* <h1 className="navbar-brand text-uppercase p-0 m-0 logo-text"
                    onClick={() => window.scrollTo({top: 0})}>
                        social butterfly
                    </h1> */}
                     <LogoIcon /> 
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header
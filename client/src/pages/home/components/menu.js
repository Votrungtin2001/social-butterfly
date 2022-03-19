import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../../../components/avatar'
import './header.css'
const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/home'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'}
    ]

    return (
        <div className="menu">

            <ul className="navbar-nav flex-row">
			
                {
                    navLinks.map((link, index) => (
                        <li className="nav-item active px-2" >
                            <Link className="nav-link" to={link.path}>
                                <button className="material-icons icon-btn">{link.icon}</button>
                            </Link>
                        </li>
                    ))
                }

                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons" >
                            favorite
                        </span>

                        {/* <span className="notify_length">{notify.data.length}</span> */}

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(75px)'}}>
                        {/* <NotifyModal /> */}
                    </div>
                        
                </li>
           
            
                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar  size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item">Profile</Link>
                    <Link className="dropdown-item">Dark Mode</Link>

                    {/* <label htmlFor="theme" className="dropdown-item"
                    // onClick={() => dispatch({
                    //     type: GLOBALTYPES.THEME, payload: !theme
                    // })}
                    >

                        {theme ? 'Light mode' : 'Dark mode'}
                    </label> */}

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/sign-in">
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
    </div>

    )
}

export default Menu
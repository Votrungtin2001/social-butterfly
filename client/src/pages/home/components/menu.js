import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../../../components/avatar'
import './header.css'
import NotifyModal from '../../../components/notify-modal'
import { logout } from '../../../redux/actions/authActions'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import notifyIcon from '../../../assets/icons/notifications.svg'

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'}
    ]

    const [isNotReadCount, setIsNotReadCount] = useState(0)

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }
    

    useEffect(() => {
        let count = 0
        const notifies = notify.data
        for (const Notify of notifies) {
            const {isRead} = Notify
            if (isRead === false) {
                count++
            }
        }
        setIsNotReadCount(count)
      }, [dispatch, notify])

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link menu-icon" to={link.path}>
                                <span class="material-icons">{link.icon}</span>
                                <small class='icon-label'>{link.label}</small>
                            </Link>
                           
                        </li>
                    ))
                }

                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        {/* <span className="material-icons" 
                        style={{color: isNotReadCount > 0 ? 'crimson' : ''}}>
                            favorite
                        </span> */}

                        
                        <div class='notify-wrapper'>
                            {/* <img src={notifyIcon} alt="" class='notify-icon'/> */}
                            <span class="material-icons">notifications
                            <small className="notify_length">{isNotReadCount}</small>
                            </span>
                            <small >Notification</small>
                        </div>
                       

                    </span>

                    <div className="dropdown-menu dropdown-notify" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(65px)'}}>
                        <NotifyModal />
                    </div>
                        
                </li>
           
            
                <li className="nav-item dropdown m-left-24" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={`home/profile/${auth.user._id}`}>Profile</Link>

                    <label htmlFor="theme" className="dropdown-item"
                    onClick={() => dispatch({
                        type: GLOBALTYPES.THEME, payload: !theme
                    })}>

                        {theme ? 'Light mode' : 'Dark mode'}
                    </label>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/"
                    onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
    </div>

    )
}

export default Menu
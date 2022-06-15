import React, {useState, useEffect} from 'react'
import { Link, useLocation,useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../../../components/avatar'
import './header.css'
import NotifyModal from '../../../components/notify-modal'
import { logout } from '../../../redux/actions/authActions'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import notifyIcon from '../../../assets/icons/notifications.svg'
import {getPosts} from "../../../redux/actions/postActions"
import CustomizedMenus from '../../../components/covid-menu'
import covidIcon from '../../../assets/icons/icons8-coronavirus-30.png'


const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'}
    ]

    const [isNotReadCount, setIsNotReadCount] = useState(0)
    const { auth, theme, notify, post } = useSelector(state => state)
    const history = useHistory()

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
                            <Link className="nav-link menu-icon" to={link.path} onClick= {() => dispatch(getPosts(auth.refreshToken)) }>
                                <span class="material-icons">{link.icon}</span>
                                <small class='icon-label'>{link.label}</small>
                            </Link>
                           
                        </li>
                    ))
                }

                <li className="nav-item dropdown m-right-16" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                        <div class='notify-wrapper'>
                            <span class="material-icons notify-icon">notifications
                            {
                               
                                isNotReadCount < 1 ? '' 
                                : (isNotReadCount < 10 ? <small className="notify_length">{isNotReadCount}</small>
                                 : <small className="notify_length">9+</small>)
                            }
                            
                            </span>
                            <small >Notification</small>
                        </div>
                       

                    </span>

                    <div className="dropdown-menu dropdown-notify" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(65px)'}}>
                        <NotifyModal />
                    </div>
                        
                </li>

                {/* <div class="btn-group menu-covid">
  <button onClick={()=>{history.push(`/covid-news/world`)}} type="button" class="btn btn-danger">World</button>
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="/covid-news/world">World</a>
    <a class="dropdown-item" href="/covid-news/vaccine">Vaccine</a>
    <a class="dropdown-item" href="/covid-news/vietnam">Viet Nam</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="/covid-news/news">News</a>
  </div>
</div> */}
{/* <CustomizedMenus/> */}
               

                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                        <img src ={covidIcon} onClick={()=>{history.push(`/covid-news/world`)}} to='/covid-news/world'/>
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" onClick={()=>{history.push(`/covid-news/world`)}}>World</Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/covid-news/vaccine">Vaccine</Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/covid-news/vietnam">Viet Nam</Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/covid-news/news">News</Link>
                 </div>
            </li>
            
                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" onClick={()=>{history.push(`/profile/${auth.user._id}`)}}>Profile</Link>

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
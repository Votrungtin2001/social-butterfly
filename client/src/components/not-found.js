import React from 'react'
import './not-found.css'
import { Link } from 'react-router-dom'
import {getPosts} from "../redux/actions/postActions"
import { useSelector, useDispatch } from 'react-redux'


const NotFound = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
    return (
        <div>
          <p class="zoom-area">
            Hope you understand our
        pain as our developer 🥰 Thank you visit again!</p>
        <section class="error-container">
         <span><span>4</span></span>
         <span>0</span>
         <span><span>4</span></span>
        </section>
        <p class="footer-area">
            Page Not Found!</p>
        <div class="link-container">
         <Link to='/' onClick={ () => dispatch(getPosts(auth.refreshToken)) }
        class="more-link">Visit the home page</Link>
        </div>
        </div>
    )
}

export default NotFound
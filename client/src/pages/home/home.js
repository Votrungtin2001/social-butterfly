import React, { useEffect } from 'react'
import Header from './components/header'
import { useSelector } from 'react-redux'
import Status from '../home/components/status'
import Posts from '../home/components/posts'
import LoadIcon from '../../assets/img/loading.gif'
import './home.css'

let scroll = 0;


const Home = () => {
    const { homePosts } = useSelector(state => state)

    window.addEventListener('scroll', () => {
        if(window.location.pathname === '/'){
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)
    },[])

    return(
        <div>
            <Header/>
            
            <div className="home row mx-0">
            <div className="col-md-8">
                <Status />

                {
                    homePosts.loading 
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                        ? <div className='no-post-container'>
                            <div className="no-post-image">
                              <img></img>
                           </div>
                            <h2 className="text-center">No Post</h2>
                        </div>
                        
                        : <Posts />
                }
                
            </div>
            
            {/* <div className="col-md-4">
                <RightSideBar />
            </div> */}
        </div>
        </div>
         

    )
}

export default Home
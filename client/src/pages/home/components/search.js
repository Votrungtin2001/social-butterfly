import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../../components/loading'
import Popup from 'reactjs-popup'
import UserCard from '../../../components/user-card'
import './header.css'
const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])
    // const { auth } = useSelector(state => state)
    // const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    // const handleSearch = async (e) => {
    
    // }

    const handleClose = () => {
      
    }

    return (
        <div className="search_bar" >
            <input
           
            className='search-input' 
            type="text" 
            name="search" 
            value={search} 
            id="search" 
            
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} 
            placeholder="Search for creator......"
            />
           <i class="uil uil-search"></i>
            {/* <div className="search_icon" 
            // style={{opacity: search ? 0 : 0.3}}
            >
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div> */}


            <button type="submit"  style={{display: 'none'}}>Search</button>

            { isLoading && <Popup open={isLoading}>
                <Loading />
                </Popup> }

            <div className="users">
                {
                    search && users.map(user => (
                        <UserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        handleClose={handleClose} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Search
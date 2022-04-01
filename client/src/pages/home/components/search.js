import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../../assets/img/loading.gif'
import Popup from 'reactjs-popup'
import UserCard from '../../../components/user-card'
import './header.css'
import { getUsersBySearch } from '../../../utils/fetchData'
import { toast, ToastPosition } from 'react-toastify';
const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return;
        try {
            setIsLoading(true)
            const res = await getUsersBySearch(search, auth.refreshToken)
            setUsers(res.data.users)
            setIsLoading((false))
        } catch (error) {
            toast.warning('Unknown network error happened', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
    }

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    return (
         <form className="search_form" onSubmit={handleSearch}>
            <input 
            type="text" 
            name="search" 
            value={search} 
            id="search" 
            title="Enter to Search"
            onChange={e => setSearch(e.target.value)} />

            <div className="search_icon" style={{opacity: search ? 0 : 0.3}}>
                <span className="material-icons">search</span>
                <span className='search-text'>Search on Social Butterfly</span>
            </div>

            <div className="close_search" onClick={handleClose}
            style={{opacity: users.length === 0 ? 0 : 1}} >
                &times;
            </div>

            <button type="submit" style={{display: 'none'}}>Search</button>

            { isLoading && <img className="loading" src={LoadIcon} alt="loading"  /> }

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
        </form> 
 
    )
}

export default Search
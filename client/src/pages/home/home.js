import React from 'react'
import Header from './components/header'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const Home = () => {
    return(
        <div>
            <Header/>
            <main>
                <h1>Home</h1>
            </main>
        </div>
         

    )
}

export default Home
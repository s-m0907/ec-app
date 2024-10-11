import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'
import Header from './components/Layout/Header'
import Home from './components/Home/Home'
import SignIn from './components/Auth/SignIn'
import BrowseArtworks from './components/Artwork/BrowseArtworks'

const App: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
            <Header/>
                <Routes>
                    <Route path = '/' element={<Home/>}/>
                    <Route path = '/browse-artworks' element = {<BrowseArtworks/>}/>
                    <Route path = '/sign-in' element={<SignIn/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;
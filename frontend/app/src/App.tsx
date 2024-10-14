import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'
import Header from './components/Layout/Header'
import SignIn from './components/Auth/SignIn'
import BrowseArtworks from './components/Artwork/BrowseArtworks'
import ExhibitionsPage from './components/Exhibitions/ExhibitionsPage'
import ExhibitionPage from './components/ViewExhibition/ExhibitionPage'

const App: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
            <Header/>
                <Routes>
                    <Route path = '/' element={<SignIn/>}/>
                    <Route path = '/sign-in' element={<SignIn/>}/>
                    <Route path = '/browse-artworks' element = {<BrowseArtworks/>}/>
                    <Route path = '/:userId/exhibitions' element = {<ExhibitionsPage/>}/>
                    <Route path= '/:userId/exhibitions/:exhibition_name' element={<ExhibitionPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;
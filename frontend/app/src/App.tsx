import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn';
import BrowseArtworks from './components/BrowseArtworks';
import { AuthProvider } from './contexts/Auth';

const App: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path = '/' element={<Home/>}/>
                    <Route path = '/browse-artworks' element = {<BrowseArtworks/>}/>
                    <Route path = '/sign-in' element={<SignIn/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};



export default App;
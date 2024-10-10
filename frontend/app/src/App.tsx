import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn';

const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path = '/' element={<Home/>}/>
                <Route path = '/sign-in' element={<SignIn/>}/>
            </Routes>
        </Router>
    );
};



export default App;
import React,{useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider,AuthContext } from './context/AuthContext';
import Navbar from './components/Layout/Navbar.js';
import Register from './components/Auth/Register.js';
import LandingPage from './components/LandingPage.js';
import Login from './components/Auth/Login.js';
import Home from './components/Home.js';
import GroupDetail from './components/Group/GroupDetail.js';
import Profile from './components/Layout/Profile.js';


import './App.css';

const App = () => {

    return (
        <AuthProvider>
            {/* <GroupProvider>
                <MessageProvider> */}
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Routes>
                            <Route path="/" element={<LandingPage/>} />
                                <Route path="/register" element={<Register/>} />
                                <Route exact path="/home" element={<Home/>} />
                             <Route path="/login" element={<Login/>} />
                                <Route path="/Profile" element={<Profile/>} />
                                 <Route path="/login" element={<Login/>} />
                                 <Route path="/groups/:groupId" element={<GroupDetail/>} />
                            
                            </Routes>
                        </div>
                    </Router>
                {/* </MessageProvider>
            </GroupProvider> */}
        </AuthProvider>
    );
};

export default App;

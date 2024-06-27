// src/components/Layout/Navbar.js
import React, { useContext , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    console.log('navbar')
    const { isAuthenticated, logout } = useContext(AuthContext);
    const n=useNavigate();

  

    useEffect(() => {
        console.log('token changed');
    }, [isAuthenticated]);

    return (
        <nav className="navbar">
            <h1>Chat App</h1>
            <ul>
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to='/'>Logout</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

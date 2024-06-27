// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import chatImage from '../image/16689507.png'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="get-started">
                <h1>Welcome to Chat App</h1>
                <p>Connect with friends and family, and chat in real-time.</p>

            </div>

            {/* Placeholder for chat photPhoto 1os */}
            <div className="chat-photo">                    <img src={chatImage} alt="Chat" />
            </div>
            <div style={{ padding: '15px ' }}>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
            </div>

        </div>
    );
};

export default LandingPage;

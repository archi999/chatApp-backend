// src/components/Profile/Profile.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import ProfileImage from '../../image/profileImage.jpg';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchUserGroups(user._id);
    }, []);

    const fetchUserGroups = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const res = await axios.get(`http://localhost:8080/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGroups(res.data.groups);
        } catch (error) {
            console.error('Error fetching user groups:', error);
        }
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <div className="avatar">
                    <img src={ProfileImage} alt="User Avatar" />
                </div>
                <div className="user-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className="user-groups">
                <h3>Your Groups</h3>
                <ul>
                    {groups.map(group => (
                        <li key={group._id}>{group.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;

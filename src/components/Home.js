// src/components/Home/Home.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import axios from 'axios';

const Home = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserGroups();
        }
    }, [isAuthenticated]);

    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const res = await axios.get('http://localhost:8080/api/group/groups', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGroups(res.data);
        } catch (error) {
            console.error('Error fetching user groups:', error);
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.delete(`http://localhost:8080/api/group/delete/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUserGroups();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                console.error('Error deleting the group:', error);
            }
        }
    };

    const handleCreateGroup = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.post('http://localhost:8080/api/group/create', { name: newGroupName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNewGroupName('');
            fetchUserGroups();
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleJoinGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.put(`http://localhost:8080/api/group/addMember/${groupId}`, { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUserGroups();
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    return (
        <div className="home">
            <header className="navbaritem">
                <h1>Welcome to Chat App</h1>
            </header>
            <main className="main-content">
                <section className="group-list">
                    <h2>My Groups</h2>
                    <ul>
                        {groups.map((group) => {
                            const isMember = group.members.some(member => member.toString() === user._id.toString());
                            return (
                                <li key={group._id} className="group-item">
                                    <h3 className="group-link">{group.name}</h3>
                                    <div className="group-actions">
                                        <button onClick={() => handleDeleteGroup(group._id)} className="btn-delete">Delete</button>
                                        {error && <p className="error-message">{error}</p>}
                                        {isMember ? (
                                            <button onClick={() => navigate(`/groups/${group._id}`)} className="btn-view">View</button>
                                        ) : (
                                            <button onClick={() => handleJoinGroup(group._id)} className="btn-join">Join</button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {!showCreateForm && (
                        <button onClick={() => setShowCreateForm(true)} className="btn-create">Create Group</button>
                    )}
                    {showCreateForm && (
                        <div className="create-group-form">
                            <input
                                type="text"
                                placeholder="Enter group name"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                required
                            />
                            <button onClick={handleCreateGroup} className="btn-create-confirm">Create</button>
                            <button onClick={() => setShowCreateForm(false)} className="btn-create-cancel">Cancel</button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home;

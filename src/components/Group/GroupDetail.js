import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const GroupDetails = () => {
    const { groupId } = useParams();
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showUserList, setShowUserList] = useState(false);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [error, setError] = useState('');

    const history = useNavigate();

    useEffect(() => {
        fetchGroupDetails();
        fetchAllUsers();
        socket.emit('joinGroup', groupId);

        socket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [groupId]);

    const fetchGroupDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const res = await axios.get(`http://localhost:8080/api/group/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGroup(res.data);
            setMessages(res.data.messages || []);
        } catch (error) {
            console.error('Error fetching group details:', error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const res = await axios.get(`http://localhost:8080/api/user/allUser`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            let userId = user._id;
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const res = await axios.post(`http://localhost:8080/api/message/${groupId}/${userId}`, { text: newMessage }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const messageData = {
                ...res.data,
                username: user.name // Ensure the username is attached
            };

            socket.emit('sendMessage', groupId, messageData);

            setMessages(prevMessages => [...prevMessages, messageData]);

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.put(`http://localhost:8080/api/group/${groupId}/leave`, { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            history('/home');
        } catch (error) {
            console.error('Error leaving group:', error);
        }
    };

    const toggleUserList = () => {
        setShowUserList(!showUserList);
    };

    const toggleAddUserForm = () => {
        setShowAddUserForm(!showAddUserForm);
        setError(''); // Clear error message when opening the form
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.put(`http://localhost:8080/api/group/addMember/${groupId}`, { userId: selectedUserId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchGroupDetails();
            setShowAddUserForm(false);
            setSelectedUserId('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                console.error('Error adding user to group:', error);
            }
        }
    };

    return (
        <div className="group-details">
            {group ? (
                <>
                    <header className="group-header">
                        <h2>{group.name}</h2>
                        <div className='innerheader'>
                            <button onClick={handleLeaveGroup}>Leave Group</button>
                            <button onClick={toggleUserList}>User List</button>
                            <button onClick={toggleAddUserForm}>Add User</button>
                        </div>
                    </header>
                    {showUserList && (
                        <aside className="user-list">
                            <h3>Members</h3>
                            <ul>
                                {group.members.map(member => (
                                    <li key={member._id}>{member.name}</li>
                                ))}
                            </ul>
                        </aside>
                    )}
                    {showAddUserForm && (
                        <form onSubmit={handleAddUser} className="add-user-form">
                            {error && <p className="error-message">{error}</p>}
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a user</option>
                                {allUsers.map(user => (
                                    <option key={user._id} value={user._id}>{user.name} ({user._id})</option>
                                ))}
                            </select>
                            <button type="submit">Add User</button>
                        </form>
                    )}
                    <section className="messages-section">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}>
                                    <span className="message-text">{msg.text}</span>
                                    <span className="message-username" style={{textAlign:'right',colour:'lightgray'}}> <b>- {msg.sender.name}</b></span>
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </section>
                </>
            ) : (
                <p>Loading group details...</p>
            )}
        </div>
    );
};

export default GroupDetails;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
    });

    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, isAdmin } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/home'); // Redirect to home after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

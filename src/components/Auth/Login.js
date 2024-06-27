import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
});

const [error, setError] = useState('');
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const { name, email, password  } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
    e.preventDefault();
    try {
        await login(formData);
        navigate('/home'); // Redirect to home after successful registration
    } catch (err) {
        setError('Login failed. Please try again.');
    }
};

return (
    <div className="register-page">
        <h1>Login</h1>
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
            <button type="submit">Login</button>
        </form>
    </div>
);
}

export default Login

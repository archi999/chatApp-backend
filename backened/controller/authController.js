import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Function to generate JWT token
const generateToken = (user) => {
    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login endpoint
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.time('Login Time');
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            console.timeEnd('Login Time');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.timeEnd('Login Time');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);
        console.timeEnd('Login Time');
        res.status(200).json({ token ,user}); // Return token as JSON object
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).send('Server error');
    }
};

// Signup endpoint
const signup = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        console.time('Signup Time');

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.timeEnd('Signup Time');
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, password, isAdmin: isAdmin === 'true' });

        // Hash password
        user.password = await bcrypt.hash(password, 10);

        // Save user
        await user.save();

        // Generate token
        const token = generateToken(user);
        console.timeEnd('Signup Time');
        console.log('User signed up successfully:', user); // Log user creation for debugging
        res.status(200).json({ token,user }); // Return token as JSON object
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).json({ error: error.message }); // Send error message in response
    }
};




export { login, signup };

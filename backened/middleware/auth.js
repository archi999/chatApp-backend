import express from 'express';
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({
            status: 'failed',
            message: 'No token, authorization denied'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure process.env.JWT_SECRET is defined
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

export default auth;

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend's origin
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/message', messageRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGroup', (groupId) => {
        socket.join(groupId);
        console.log(`User joined group ${groupId}`);
    });

    socket.on('sendMessage', (groupId, message) => {
        io.to(groupId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Connect to MongoDB and Start Server
connectDB()
    .then(() => {
        server.listen(8080, () => {
            console.log('Server started on port 8080');
        });
    })
    .catch((error) => {
        console.error('Error starting server:', error);
    });

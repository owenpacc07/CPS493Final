import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness_tracker')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', () => {}); // To be implemented
app.use('/api/friends', () => {}); // To be implemented

// Base route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Fitness Tracker API',
        endpoints: [
            '/api/users',
            '/api/activities',
            '/api/friends'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

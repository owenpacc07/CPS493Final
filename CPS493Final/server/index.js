import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import friendRoutes from './routes/friend.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_tracker', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Only start server after DB connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/friends', friendRoutes);

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

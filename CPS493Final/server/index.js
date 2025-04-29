import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import friendRoutes from './routes/friend.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://fitness-tracker.onrender.com', 'https://fitness-tracker-api.onrender.com']
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// First, setup all API routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/friends', friendRoutes);

// Then handle static files and SPA routing for production
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    
    // This should be the last route
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_tracker', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB');
    console.log('Connection URI:', process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//<credentials>@'));
    // Only start server after DB connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error details:', {
        message: err.message,
        reason: err.reason,
        code: err.code
    });
    process.exit(1);
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
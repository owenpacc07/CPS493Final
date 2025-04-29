import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import friendRoutes from './routes/friend.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';  // Add this import

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add security middleware before other middleware
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    next();
});

// Add debug logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// API Routes should come before static file serving
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/friends', friendRoutes);

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
    
    // Serve static files from the dist directory
    const distPath = path.join(__dirname, '..', 'dist');
    console.log('Static file path:', distPath);
    
    app.use(express.static(distPath));
    
    // Serve index.html for all other routes
    app.get('*', (req, res) => {
        console.log('Serving index.html for path:', req.path);
        const indexPath = path.join(distPath, 'index.html');
        
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            console.error('Error: index.html not found');
            res.status(404).send('Frontend files not found');
        }
    });
}

// Database Connection
console.log('Attempting MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
console.log('Environment:', process.env.NODE_ENV);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_tracker', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('\n=== MongoDB Connection Success ===');
    console.log('Connected to database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('==============================\n');
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`MongoDB URI: ${process.env.MONGODB_URI?.split('@')[1]}`); // Safe logging
    });
})
.catch(err => {
    console.error('\n=== MongoDB Connection Error ===');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Full Error:', err);
    console.error('==============================\n');
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
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        console.log('Found user:', user ? 'yes' : 'no');
        
        if (!user) {
            console.log('User not found:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await user.comparePassword(password);
        console.log('Password validation:', { username, isValid });

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = await User.create({
            username,
            password,
            email,
            name
        });
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        console.log('Login successful:', { username, role: user.role });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log('Registration request body:', req.body);
        const { username, password, email, name, role } = req.body;
        
        // Detailed validation logging
        const missingFields = [];
        if (!username) missingFields.push('username');
        if (!password) missingFields.push('password');
        if (!email) missingFields.push('email');
        if (!name) missingFields.push('name');
        
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            const field = existingUser.username === username ? 'username' : 'email';
            console.log(`${field} already exists:`, existingUser);
            return res.status(400).json({ 
                message: `${field} already exists` 
            });
        }

        // Create new user
        console.log('Creating new user with data:', {
            username,
            email,
            name,
            role: role || 'user'
        });

        const user = await User.create({
            username,
            password,
            email,
            name,
            role: role || 'user'
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        console.log('User created successfully:', {
            id: user._id,
            username: user.username,
            role: user.role
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: error.message,
            details: error.toString()
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

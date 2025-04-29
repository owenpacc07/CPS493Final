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

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt for username:', username);
        
        if (!username || !password) {
            console.log('Missing credentials');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        console.log('Database query result:', user ? 'User found' : 'User not found');
        
        if (!user) {
            console.log('No user found with username:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Comparing passwords for user:', username);
        const isValid = await user.comparePassword(password);
        console.log('Password comparison result:', isValid);

        if (!isValid) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

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

export const register = async (req, res) => {
    try {
        console.log('Registration request body:', req.body);
        const { username, password, email, name } = req.body;
        
        if (!username || !password || !email || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = await User.create({
            username,
            password,
            email,
            name,
            role: 'user'
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                name: newUser.name,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
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

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.json([]);
        }

        const users = await User.find({
            username: { $regex: query, $options: 'i' },
            _id: { $ne: req.user.id }
        }, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

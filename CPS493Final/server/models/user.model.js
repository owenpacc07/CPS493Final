import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'],
        default: 'user' 
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            console.log('Hashing password...');
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            console.log('Password hashed:', this.password);
        }
        next();
    } catch (error) {
        console.error('Password hashing error:', error);
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('Comparing passwords');
        console.log('Candidate password length:', candidatePassword.length);
        console.log('Stored hash length:', this.password.length);
        
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Password match result:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Password comparison error:', error);
        throw error;
    }
};

export default mongoose.model('User', userSchema);

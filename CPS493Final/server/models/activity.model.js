import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: String
}, {
    timestamps: true
});

export default mongoose.model('Activity', activitySchema);

import Activity from '../models/activity.model.js';
import User from '../models/user.model.js';

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createActivity = async (req, res) => {
    try {
        const activity = new Activity({
            ...req.body,
            userId: req.user.id
        });
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findOne({ _id: req.params.id, userId: req.user.id });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        Object.assign(activity, req.body);
        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFriendActivities = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends');
        const friendIds = user.friends.map(friend => friend._id);
        const activities = await Activity.find({ userId: { $in: friendIds } })
            .populate('userId', 'name');
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

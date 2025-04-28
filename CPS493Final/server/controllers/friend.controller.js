import User from '../models/user.model.js';

export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', '-password');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const user = await User.findById(req.user.id);
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Already friends' });
        }

        user.friends.push(friendId);
        friend.friends.push(user._id);

        await Promise.all([user.save(), friend.save()]);
        res.json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.params;
        const user = await User.findById(req.user.id);
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== req.user.id);

        await Promise.all([user.save(), friend.save()]);
        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

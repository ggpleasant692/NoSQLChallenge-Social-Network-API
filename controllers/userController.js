const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req,res) {
        try {
            const users = await User.find({}); 
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res){
        try{
            const user = await User.findById(req.params.userId);
            if (!user) return res.status(404).json({ message: 'No User Found'});
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res){
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async updateUser(req,res){
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true});
            if(!user) return res.status(404).json ({ message: 'No User Found'});
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteUser(req,res){
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) return res.status(404).json({ message: 'No User Found'});
            await Thought.deleteMany({username: user.username });
            res.json({ message: 'User and Thoughts deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend (req,res){
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId, {
                    $addToSet: {friends: req.params.friendId}
                },
                {new: true}
            );
            if(!user) return res.status(404).json({ message: 'No User Found'});
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req,res){
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$pull: { friends: req.params.friendId}},
                {new:true}
            );
            if (!user) return res.status(404).json({ message: 'No User Found'});
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

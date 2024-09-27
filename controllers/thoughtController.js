const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById(req,res){
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) return res.status(404).json({ message: 'No Thought Found'});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id}});
            if (!thought) return res.status(404).json({message: 'No Thought Found'});
            res.json(thought);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async updateThought(req,res){
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {new:true});
            if (!thought) return res.status(404).json({message: 'No Thought Found'});
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteThought(req,res){
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if(!thought) return res.status(404).json({ message: 'No Thought Found to Delete'});
            res.json({message: 'Thought has been Deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req,res){
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$addToSet: {
                    reactions: req.body
                }},
                {new: true}
            );
            if (!thought) return res.status(404).json({ message: 'No Thought Found'});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$pull: {reactions: {reactionId: req.body.reactionId}}},
                {new: true}
            );
            if (!thought) return res.status(404).json({message: 'No Thought Found'});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};



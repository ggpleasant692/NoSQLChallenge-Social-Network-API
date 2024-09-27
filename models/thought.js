const { Schema, model } = require('mongoose');
const Reaction = require('./reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (v) => new Date(v).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
},{
    toJSON: {
      getters: true,
    },
    id: false,
  });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;

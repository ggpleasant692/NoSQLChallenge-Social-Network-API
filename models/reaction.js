const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (v) => new Date(v).toLocaleString(),
    },
}, {
    toJSON: {
        getters:true,
    },
    id: false,
});

// thoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });
module.exports = reactionSchema;
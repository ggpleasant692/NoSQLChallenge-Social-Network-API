const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/.+\@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
const User = model('user', userSchema);
module.exports = User;

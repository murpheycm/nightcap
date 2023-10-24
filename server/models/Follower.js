const { Schema, model } = require('mongoose');

const followerSchema = new Schema({
    follower_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    following_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = followerSchema;
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    plants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Plant'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ],
    dislikedPosts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ],
    crops: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Crop'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
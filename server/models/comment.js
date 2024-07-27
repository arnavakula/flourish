const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Commment', CommentSchema);
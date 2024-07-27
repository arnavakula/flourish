const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tag: {
        type: String,
        enum: ['Question', 'Advice', 'Discussion', 'Help Needed']
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

module.exports = mongoose.model('Post', PostSchema);
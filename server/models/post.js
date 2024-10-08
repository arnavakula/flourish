const mongoose = require('mongoose');
const Comment = require('./comment');


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    tag: {
        type: String,
        enum: ['None', 'Question', 'Advice', 'Discussion', 'Help Needed']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

PostSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Comment.deleteMany({_id: {$in: doc.comments}});
    }
})

module.exports = mongoose.model('Post', PostSchema);
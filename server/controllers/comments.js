const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

//upload comment
//delete comment
module.exports.uploadComment = async (req, res) => {
    const { userId, postId, text } = req.body;

    const author = await User.findById(userId);
    const post = await Post.findById(postId);

    const comment = new Comment({ author, text });
    await comment.save();

    post.comments.push(comment);

    await post.save();

    res.json({ comment });
}

module.exports.deleteComment = async (req, res) => {
    const { commentId, postId } = req.body;

    await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: 'deleted successfully!' });
}
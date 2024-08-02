const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

//upload comment
//delete comment
module.exports.uploadComment = async (req, res) => {
    const { userId, postId, text } = req.body;

    const author = await User.findById(userId);
    const post = await Post.findById(postId);

    const comment = new Comment({ author, post, text });
    await comment.save();

    author.comments.push(comment);
    post.comments.push(comment);

    await author.save();
    await post.save();

    res.json({ comment });
}
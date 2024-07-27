const Post = require('../models/post');
const User = require('../models/user');

//upload post
//delete post
//edit post

module.exports.uploadPost = async (req, res) => {
    const { text, tag = 'None' } = req.body;
    const user = await User.findById(req.body.user);

    const post = new Post({ text, tag, user });
    await post.save();

    user.posts.push(post);
    await user.save();

    res.json({message: 'uploaded post'})
}

module.exports.deletePost = async (req, res) => {
    const user = await User.findById(req.body.user);

    req.json({message: 'deleted post'})
}
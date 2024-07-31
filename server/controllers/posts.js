const Post = require('../models/post');
const User = require('../models/user');

module.exports.getPosts = async (req, res) => {
    const posts = await Post.find({}).populate('author');
    res.json({'posts': posts, message: 'returning plants'});
}

module.exports.uploadPost = async (req, res) => {
    const { title, text, tag = 'None' } = req.body;
    const author = await User.findById(req.body.user);

    const post = new Post({ title, text, tag, author});
    await post.save();

    author.posts.push(post);
    await author.save();

    res.json({message: 'uploaded post'})
}

module.exports.deletePost = async (req, res) => {
    const user = await User.findById(req.body.user);

    req.json({message: 'deleted post'})
}
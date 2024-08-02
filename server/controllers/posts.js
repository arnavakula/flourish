const Post = require('../models/post');
const User = require('../models/user');

module.exports.getPosts = async (req, res) => {
    const posts = await Post.find({}).populate('author');
    res.json({'posts': posts, message: 'returning plants'});
}

module.exports.getSinglePost = async (req, res) => {
    const post = await Post.findById(req.params.postId).populate('author').populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    });
    res.json({ post })
}

module.exports.uploadPost = async (req, res) => {
    const { title, text, tag = 'None' } = req.body;
    const author = await User.findById(req.body.user);

    const post = new Post({ title, text, tag, author});
    await post.save();

    author.posts.push(post);
    await author.save();

    res.json({'postId': post._id, message: 'uploaded post'})
}

module.exports.deletePost = async (req, res) => {
    const user = await User.findById(req.body.user);

    req.json({message: 'deleted post'})
}

module.exports.toggleVote = async (req, res) => {
    const { userId, postId, voteType } = req.body;
    const user = await User.findById(userId);


    
    const post = await Post.findById(postId);
    
    if(voteType === 'like'){
        //clicked on like button
        if(!user.likedPosts.includes(postId)){
            user.likedPosts.push(post);
            post.likes.push(user);

            if(user.dislikedPosts.includes(postId)){
                await User.findByIdAndUpdate(userId, {$pull: {dislikedPosts: postId}});
                await Post.findByIdAndUpdate(postId, {$pull: {dislikes: userId}})
            }

            await user.save();
            await post.save();

            res.json({liked: true, message: 'Successfully liked post'});
        } 
        //unlike if already liked OR if disliking
        else {
            await User.findByIdAndUpdate(userId, {$pull: {likedPosts: postId}});
            await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}});

            res.json({liked: false, message: 'Successfully unliked post'});
        }
        
    } else if(voteType === 'dislike'){
        if(!user.dislikedPosts.includes(postId)){
            user.dislikedPosts.push(post);
            post.dislikes.push(user);

            if(user.likedPosts.includes(postId)){
                await User.findByIdAndUpdate(userId, {$pull: {likedPosts: postId}});
                await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}})
            }

            await user.save();
            await post.save();

            res.json({liked: true, message: 'Successfully disliked post'});
        } 
        //unlike if already liked OR if disliking
        else {
            await User.findByIdAndUpdate(userId, {$pull: {dislikedPosts: postId}});
            await Post.findByIdAndUpdate(postId, {$pull: {dislikes: userId}});

            res.json({liked: false, message: 'Successfully undisliked post'});
        }
    } else {
        res.json({ voteType });
    }

}
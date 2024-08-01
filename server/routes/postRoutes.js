const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();

router.route('/')
    .get(posts.getPosts)
    .post(posts.uploadPost)
    .delete(posts.deletePost)

router.route('/:postId')
    .get(posts.getSinglePost)

router.route('/vote')
    .post(posts.toggleVote)

module.exports = router;
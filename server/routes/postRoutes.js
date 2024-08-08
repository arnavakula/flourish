const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();

router.route('/')
    .get(posts.getPosts)
    .post(posts.uploadPost)

router.route('/:postId')
    .get(posts.getSinglePost)
    .delete(posts.deletePost)

router.route('/vote')
    .post(posts.toggleVote)

module.exports = router;
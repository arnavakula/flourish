const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();

router.route('/')
    .post(posts.uploadPost)
    .delete(posts.deletePost)


module.exports = router;
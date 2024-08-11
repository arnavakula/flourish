const express = require('express');
const comments = require('../controllers/comments');

const router = express.Router();

router.route('/')
    .post(comments.uploadComment)
    .patch(comments.deleteComment)

module.exports = router;

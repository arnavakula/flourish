const express = require('express');
const comments = require('../controllers/comments');

const router = express.Router();

router.route('/')
    .post(comments.uploadComment)

module.exports = router;

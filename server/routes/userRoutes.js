const express = require('express');
const User = require('../models/user');
const users = require('../controllers/users');

const router = express.Router();

router.route('/register')
    .post(users.register);

    
module.exports = router;
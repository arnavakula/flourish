const express = require('express');
const User = require('../models/user');
const users = require('../controllers/users');
const passport = require('passport');

const router = express.Router();

router.route('/register')
    .post(users.register);

router.route('/login')
    .post(passport.authenticate('local'), users.login)

    
module.exports = router;
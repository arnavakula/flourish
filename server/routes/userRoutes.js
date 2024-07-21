const express = require('express');
const users = require('../controllers/users');
const passport = require('passport');

const router = express.Router();

router.route('/register')
    .post(users.register)

router.route('/login')
    .post(passport.authenticate('local'), users.login)

router.route('/logout')
    .get(users.logout)

router.route('/status')
    .get(users.status)

module.exports = router;
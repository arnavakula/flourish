const express = require('express');
const plants = require('../controllers/plants');
const upload = require('../aws/index');
const { isLoggedIn } = require('../middleware/users');

const router = express.Router();

router.route('/upload')
    // .post(upload.single('image'), plants.addPlant)
    .post(upload.single('image'), plants.addPlant);

module.exports = router;
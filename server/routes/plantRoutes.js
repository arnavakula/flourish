const express = require('express');
const plants = require('../controllers/plants');
const upload = require('../aws/index');

const router = express.Router();

router.route('/upload')
    .post(upload.single('image'), plants.addPlant)

module.exports = router;
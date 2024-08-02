const express = require('express');
const crops = require('../controllers/crops');

const router = express.Router();

router.route('/')
    .get(crops.getAllCrops)
    .post(crops.addCrop)

    
module.exports = router;

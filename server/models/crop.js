const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {strict: false})

module.exports = mongoose.model('Crop', CropSchema);
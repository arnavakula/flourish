const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    location: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Plant', PlantSchema);
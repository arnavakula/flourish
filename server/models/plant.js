const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    location: String,
    author: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
    }
})

module.exports = mongoose.model('Plant', PlantSchema);
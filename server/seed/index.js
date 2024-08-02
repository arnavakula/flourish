const mongoose = require('mongoose');
const Crop = require('../models/crop');
const data = require('./seed.json');

const dbUrl ='mongodb://127.0.0.1:27017/plantDisease';

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});


const seedPlants = async () => {
    await Crop.deleteMany({});
    for(let name of Object.keys(data)){
        const crop = new Crop({name});
        await crop.save();
        await Crop.findByIdAndUpdate(crop._id, data[name]);
    }
}

seedPlants().then(() => mongoose.connection.close());

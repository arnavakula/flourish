require('dotenv').config();

const mongoose = require('mongoose');
const Crop = require('../models/crop');
const data = require('./seed.json');

const dbUrl = 'mongodb+srv://akulaarnav:GnPlzy1EHffR3TZr@flourish-cluster.i5huq.mongodb.net/?retryWrites=true&w=majority&appName=flourish-cluster';



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

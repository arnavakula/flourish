const Plant = require('../models/plant');
const User = require('../models/user');
const upload = require('../aws/index');

//create plant
//delete plant

module.exports.addPlant = async (req, res) => {
    try {
        const user = await User.findById(req.body.user);
        const plant = new Plant({ location: req.file.location, author: req.body.user });
        await plant.save();
        
        user.plants.push(plant);
        await user.save();

        res.status(200).json({message: 'add plant success'})
    } catch(err) {
        res.json({error: err});
    }
}

module.exports.getAllPlants = async (req, res) => {
    const plants = await Plant.find({});
    res.json({'plants': plants});
}


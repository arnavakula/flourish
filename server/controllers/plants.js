const Plant = require('../models/plant');
const upload = require('../aws/index');

//create plant
//delete plant

module.exports.addPlant = async (req, res) => {
    try {
        const plant = new Plant({ location: req.file.location, author: JSON.parse(req.body.user) });
        await plant.save();
        res.status(200).json({message: 'add plant success'})
    } catch(err) {
        res.json({error: err});
    }
}

module.exports.getUserPlants = async (req, res) => {

}


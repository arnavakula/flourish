const Plant = require('../models/plant');
const upload = require('../aws/index');

//create plant
//delete plant

module.exports.addPlant = async (req, res) => {
    try {
        const plant = new Plant({ location: req.file.location, author: req.session.user });
        await plant.save();
        console.log(req.file.location);
        res.status(200).json({message: 'success'})
    } catch(err) {
        res.json({error: err});
    }
}



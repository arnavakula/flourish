const Crop = require('../models/crop');
const User = require('../models/user');

module.exports.getAllCrops = async (req, res) => {
    const crops = await Crop.find({});
    res.json({ crops });
}   

module.exports.addCrop = async (req, res) => {
    const { userId, cropId } = req.body;

    const crop = await Crop.findById(cropId);
    const user = await User.findById(userId);
    
    user.crops.push(crop);
    await user.save();

    res.json({});
}
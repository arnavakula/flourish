const Crop = require('../models/crop');
const User = require('../models/user');

module.exports.getAllCrops = async (req, res) => {
    const crops = await Crop.find({});
    res.json({ crops });
}   

module.exports.addCrop = async (req, res) => {
    const { userId, cropId, quantity } = req.body;

    await User.findByIdAndUpdate(userId, { $push: {crops: { 'crop': cropId, quantity }}})

    res.json({});
}

module.exports.getUserCrops = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('crops.crop');
    
    res.json({ crops: user.crops });
}
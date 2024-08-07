const Crop = require('../models/crop');
const User = require('../models/user');
const OpenAI = require("openai");
const fs = require('fs');

module.exports.getAllCrops = async (req, res) => {
    const crops = await Crop.find({});
    res.json({ crops });
}

module.exports.addCrop = async (req, res) => {
    const { userId, cropId, quantity, color, date } = req.body;

    const crop = await Crop.findOne({ _id: cropId }, { content: 0 })

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a knowledgeable gardening assistant." },
            {
                role: 'user',
                content: `I need a gardening schedule based on the following crop information and location. 
                Crop information: ${JSON.stringify(crop)}. 
                I want to plant starting from ${date}. Location: zip code ${`78641`}. 
                Please provide a schedule with detailed steps. I want this schedule in an object format.
                Create an object such that the keys are the steps, and for each key the value describes the step.
                Each key should have a start date (called start_date), end date (called end_date), and a very detailed description of what to do (called end_date).
                Only return a String that contains the object (first character is { and last character is })
                Here are some example keys: germination, growing, harvesting.
                All time units are given in days unless otherwise specified. Make sure to emphasize the crop information.
                `
            }
        ],
        model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);
    console.log(completion.choices[0].message.content);

    const match = completion.choices[0].message.content.match(/{[\s\S]*}/);

    if (match) {
        const schedule = JSON.parse(match);
        await User.findByIdAndUpdate(userId, { $push: { crops: { 'crop': cropId, quantity, color, schedule } } });
        res.json({ 'success': 'added crop!' });
    } else {
        res.json({ 'error': 'no schedule' })
    }
}

module.exports.getUserCrops = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('crops.crop');

    res.json({ crops: user.crops });
}


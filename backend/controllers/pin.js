const Pin = require('../models/pinSchema');




//create a Pin.....

const createPin = async (req, res, next) => {
    try {
        const newPin = new Pin(req.body);
        const savedPin = await newPin.save();
        res.status(200).json(savedPin)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}






//get All pins........


const getAllPin = async (req, res, next) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}




module.exports = { createPin, getAllPin }
const { createPin, getAllPin } = require('../controllers/pin');

const router = require('express').Router();




router.post('/new-pin', createPin);
router.get('/', getAllPin);







module.exports = router;
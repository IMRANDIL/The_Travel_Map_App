const { registerUser, loginUser } = require('../controllers/user');

const router = require('express').Router();


router.post('/register', registerUser);

router.post('/login', loginUser)




module.exports = router;
const User = require('../models/userSchema');

const bcrypt = require('bcrypt')




//register ...........

const registerUser = async (req, res, next) => {
    try {

        //generate new password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        //create new user....
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        })

        //save user to the database

        const user = await newUser.save();

        res.status(200).json(user)
        next()

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}








//long.......

const loginUser = async (req, res, next) => {
    try {
        //find user.....

        const user = await User.findOne({ userName: req.body.userName });
        !user && res.status(400).json("Wrong userName Or Password!")


        //validate password...
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        !validPassword && res.status(400).json("Wrong userName Or Password!")



        //send successfull response....

        res.status(200).json({ _id: user._id, userName: user.userName })

        next()


    } catch (error) {
        res.status(500).json(error)
    }
}




module.exports = { registerUser, loginUser }
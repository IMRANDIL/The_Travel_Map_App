const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log(`Database Connected🤩`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDb;
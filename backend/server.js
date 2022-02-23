require('dotenv').config();

const express = require('express');
const connectdb = require('./db/connnection')


const app = express();

const router = require('./routes/Router')










const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is listening on port : ${PORT}😃`);
    connectdb()
})
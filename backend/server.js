require('dotenv').config();

const express = require('express');
const connectdb = require('./db/connnection')


const app = express();
const cors = require('cors')



const router = require('./routes/Router');
const Userrouter = require('./routes/userRouter')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', Userrouter)
app.use('/api/pins', router)


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is listening on port : ${PORT}😃`);
    connectdb()
})
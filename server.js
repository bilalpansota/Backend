
//dotEnv to import from env file
const dotEnv = require('dotenv')
//Express app
const express = require('express')
//Mongoose
const mongoose = require('mongoose')
//Routes
const workoutRoutes = require('./routes/workouts')
const app = express()
//Env configuration
dotEnv.config()

//importing PORT from env
const port = process.env.PORT || 3000

//middleWare

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)


//connect to db

mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        //for listening on port
        app.listen(port, () => {
            console.log(`Listening to Port ${port}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })


//Basic get Api
app.get('/', (req, res) => {
    res.json({ msg: 'Get all Data' })
})
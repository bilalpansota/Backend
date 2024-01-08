const express = require('express')
const {createWorkout,getWorkout,getSingleWorkout, deleteWorkout, UpdateWorkout} = require('../controllers/workoutController')
const routes = express.Router()

routes.get('/', getWorkout)

routes.get('/:id',getSingleWorkout)

routes.post('/', createWorkout)

routes.delete('/:id', deleteWorkout)

routes.patch('/:id',UpdateWorkout)



module.exports = routes
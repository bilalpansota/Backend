const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json({ status: 'true', workout })
    } catch (error) {
        res.status(400).json({ status: 'false', message: error.message })
    }
}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'false', message: 'Invalid Workout ID' });
    }
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ status: 'false', message: 'No Workout Found' });
        }
        res.status(200).json({ status: 'true', message: 'Workout Found Successfully', workout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'false', message: 'Internal Server Error' });
    }
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'false', message: 'Invalid Workout ID' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ status: 'false', message: 'No Workout Found' });
        }
        res.status(200).json({ status: 'true', message: 'Workout Deleted Successfully', workout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'false', message: 'Internal Server Error' });
    }
};

const UpdateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'false', message: 'Invalid Workout ID' });
    }
    try {
        const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
        if (!workout) {
            return res.status(404).json({ status: 'false', message: 'No Workout Found' });
        }
        res.status(200).json({ status: 'true', message: 'Workout Updated Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'false', message: 'Internal Server Error' });
    }
};

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json({ status: 'true', message: 'Workout Added Successfully', workout })
    } catch (error) {
        res.status(400).json({ status: 'false', message: error.message })
    }
}

module.exports = { createWorkout, getWorkout, getSingleWorkout, deleteWorkout, UpdateWorkout }
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET single workout
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findById(req.params.id);
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout_1.default(req.body);
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findByIdAndDelete(req.params.id);
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.json({ message: 'Workout deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;

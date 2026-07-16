"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// GET all activities
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('user', '-password');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET single activity
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id).populate('user', '-password');
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// POST create activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity_1.default(req.body);
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
// PUT update activity
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndDelete(req.params.id);
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json({ message: 'Activity deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
// GET leaderboard (sorted by score desc)
router.get('/', async (_req, res) => {
    try {
        const entries = await Leaderboard_1.default.find()
            .populate('user', '-password')
            .sort({ score: -1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET single leaderboard entry
router.get('/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findById(req.params.id).populate('user', '-password');
        if (!entry)
            return res.status(404).json({ error: 'Leaderboard entry not found' });
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
// POST create leaderboard entry
router.post('/', async (req, res) => {
    try {
        const entry = new Leaderboard_1.default(req.body);
        await entry.save();
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
// PUT update leaderboard entry
router.put('/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
        if (!entry)
            return res.status(404).json({ error: 'Leaderboard entry not found' });
        res.json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update leaderboard entry' });
    }
});
// DELETE leaderboard entry
router.delete('/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findByIdAndDelete(req.params.id);
        if (!entry)
            return res.status(404).json({ error: 'Leaderboard entry not found' });
        res.json({ message: 'Leaderboard entry deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete leaderboard entry' });
    }
});
exports.default = router;

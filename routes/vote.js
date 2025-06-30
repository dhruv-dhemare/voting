const express = require('express');
const router = express.Router();
const Candidate = require('./../models/candidate');
const User = require('./../models/user');
const { jwtAuthMiddleware } = require('./../jwt');

router.put('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (user.role === "admin") {
            return res.status(403).json({ error: "Admins are not allowed to vote." });
        }

        if (user.isVoted) {
            return res.status(403).json({ error: "You have already voted." });
        }

        const { candidateId } = req.body;
        if (!candidateId) {
            return res.status(400).json({ error: "Candidate ID is required." });
        }

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate does not exist." });
        }

        candidate.voteCount++;
        candidate.votes.push({ user: userId });
        user.isVoted = true;

        await candidate.save();
        await user.save();

        return res.status(200).json({ message: "Vote recorded successfully" });

    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/count', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: -1 });
        return res.status(200).json(candidates);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch candidates' });
    }
});


module.exports = router;

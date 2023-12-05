const express = require('express');
const playerRoutes = require('../routes/PlayerRoutes');
const teamRoutes = require('../routes/TeamRoutes');
const matchRoutes = require('../routes/MatchRoutes');
const userRoutes = require('../routes/UserRoutes');

const router = express.Router();

router.use('/players', playerRoutes);
router.use('/teams', teamRoutes);
router.use('/matches', matchRoutes);
router.use('/users', userRoutes);

module.exports = router;
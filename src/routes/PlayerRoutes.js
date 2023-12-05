// /src/routes/PlayerRoutes.js
const express = require('express');
const playerController = require('../controllers/PlayerController');

const authenticateToken = require('../config/middleware');

const router = express.Router();

// CREATE - Adicionar um novo jogador
router.post('/players',authenticateToken, (req, res) => {
  playerController.addPlayer(req, res);
});

// READ - Obter todos os jogadores
router.get('/players', (req, res) => {
  playerController.getAllPlayers(req, res);
});

// READ - Obter informações de um jogador específico
router.get('/players/:id', (req, res) => {
  playerController.getPlayer(req, res);
});

// UPDATE - Atualizar informações de um jogador
router.put('/players/:id',authenticateToken, (req, res) => {
  playerController.updatePlayer(req, res);
});

// DELETE - Excluir um jogador
router.delete('/players/:id',authenticateToken, (req, res) => {
  playerController.deletePlayer(req, res);
});

module.exports = router;

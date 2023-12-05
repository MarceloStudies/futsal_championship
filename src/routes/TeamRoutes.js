// /src/routes/PlayerRoutes.js
const express = require('express');
const teamsController = require('../controllers/TeamController');

const authenticateToken = require('../config/middleware');

const router = express.Router();

// CREATE - Adicionar um novo jogador
router.post('/teams',authenticateToken ,(req, res) => {
  teamsController.addTeam(req, res);
});

// READ - Obter todos os jogadores
router.get('/teams', (req, res) => {
  teamsController.getAllTeams(req, res);
});

// READ - Obter informações de um jogador específico
router.get('/teams/:id', (req, res) => {
  teamsController.getTeam(req, res);
});

// UPDATE - Atualizar informações de um jogador
router.put('/teams/:id',authenticateToken , (req, res) => {
  teamsController.updateTeam(req, res);
});

// DELETE - Excluir um jogador
router.delete('/teams/:id', authenticateToken, (req, res) => {
  teamsController.deleteTeam(req, res);
});

module.exports = router;

const express = require('express');
const authenticateToken = require('../config/middleware');
const matchController = require('../controllers/MatchController');

  
const router = express.Router();

// CREATE - Adicionar uma nova partida
router.post('/matches',authenticateToken, (req, res) => {
  matchController.addMatch(req, res);
});

// READ - Obter todas as partidas
router.get('/matches', (req, res) => {
  matchController.getAllMatches(req, res);
});

// READ - Obter informações de uma partida específica
router.get('/matches/:id', (req, res) => {
  matchController.getMatch(req, res);
});

// UPDATE - Atualizar informações de uma partida
router.put('/matches/:id', authenticateToken,(req, res) => {
  matchController.updateMatch(req, res);
});

// DELETE - Excluir uma partida
router.delete('/matches/:id',authenticateToken ,(req, res) => {
  matchController.deleteMatch(req, res);
});

router.get('/classifications', (req, res) => {
  matchController.getClassification(req, res);
});


module.exports = router;
// /src/controllers/PlayerController.js
const Player = require('../models/Player');

class PlayerController {
  addPlayer(req, res) {
    const { name, shirtNumber, team_id } = req.body;

    Player.createPlayer(name, shirtNumber, team_id, (error, results) => {
      if (error) {
        console.error('Erro ao adicionar jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(201).json({ message: 'Jogador adicionado com sucesso', playerId: results.insertId });
      }
    });
  }

  getAllPlayers(req, res) {
    Player.getAllPlayers((error, results) => {
      if (error) {
        console.error('Erro ao obter jogadores:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  getPlayer(req, res) {
    const playerId = req.params.id;

    Player.getPlayerById(playerId, (error, results) => {
      if (error) {
        console.error('Erro ao obter jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ error: 'Jogador não encontrado' });
        }
      }
    });
  }

  updatePlayer(req, res) {
    const playerId = req.params.id;
    const { name, shirtNumber, team_id } = req.body;

    Player.updatePlayer(playerId, name, shirtNumber, team_id, (error) => {
      if (error) {
        console.error('Erro ao atualizar jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json({ message: 'Jogador atualizado com sucesso' });
      }
    });
  }

  deletePlayer(req, res) {
    const playerId = req.params.id;

    Player.deletePlayer(playerId, (error) => {
      if (error) {
        console.error('Erro ao excluir jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json({ message: 'Jogador excluído com sucesso' });
      }
    });
  }

  deleteTeam(req, res) {
    const teamId = req.params.id;

    Player.deleteTeam(teamId, (error) => {
      if (error) {
        console.error('Erro ao excluir jogador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json({ message: 'Jogadores excluídos com sucesso' });
      }
    });
  }
}

module.exports = new PlayerController();

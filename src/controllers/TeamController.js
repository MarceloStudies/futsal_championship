// /src/controllers/PlayerController.js
const Team = require('../models/Team');

class TeamController {
  addTeam(req, res) {
    const { name } = req.body;

    Team.createTeam( name,  (error, results) => {
      if (error) {
        console.error('Erro ao adicionar equipe:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(201).json({ message: 'Equipe adicionada com sucesso', teamId: results.insertId });
      }
    });
  }

  getAllTeams(req, res) {
    Team.getAllTeams((error, results) => {
      if (error) {
        console.error('Erro ao obter equipes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json(results);
      }
    });
  }
  getTeam(req, res) {
    const teamId = req.params.id;

    Team.getTeamById(teamId, (error, results) => {
      if (error) {
        console.error('Erro ao obter equipe:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ error: 'Equipe não encontrado' });
        }
      }
    });
  }

  updateTeam(req, res) {
    const teamId = req.params.id;
    const { name } = req.body;

    Team.updateTeam(teamId, name, (error) => {
      if (error) {
        console.error('Erro ao atualizar a equipe:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json({ message: 'Equipe atualizado com sucesso' });
      }
    });
  }

  deleteTeam(req, res) {
    const teamId = req.params.id;

    Team.deleteTeam(teamId, (error) => {
      if (error) {
        console.error('Erro ao excluir a equipe:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(200).json({ message: 'Equipe excluída com sucesso' });
      }
    });
  }
}

module.exports = new TeamController();

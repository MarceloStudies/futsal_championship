const Match = require("../models/Match");

class MatchController {
  addMatch(req, res) {
    const { date, startTime, endTime, team1, team2, score1, score2 } = req.body;

    Match.createMatch(
      date,
      startTime,
      endTime,
      team1,
      team2,
      score1,
      score2,
      (error, results) => {
        if (error) {
          console.error("Erro ao adicionar partida:", error);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else {
          res
            .status(201)
            .json({
              message: "Partida adicionada com sucesso",
              matchId: results.insertId,
            });
        }
      }
    );
  }

  getAllMatches(req, res) {
    Match.getAllMatches((error, results) => {
      if (error) {
        console.error("Erro ao obter partidas:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  }

  getMatch(req, res) {
    const matchId = req.params.id;

    Match.getMatchById(matchId, (error, results) => {
      if (error) {
        console.error("Erro ao obter partida:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ error: "Partida não encontrada" });
        }
      }
    });
  }

  updateMatch(req, res) {
    const matchId = req.params.id;
    const { date, startTime, endTime, team1, team2, score1, score2 } = req.body;

    Match.updateMatch(
      matchId,
      date,
      startTime,
      endTime,
      team1,
      team2,
      score1,
      score2,
      (error) => {
        if (error) {
          console.error("Erro ao atualizar a partida:", error);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else {
          res.status(200).json({ message: "Partida atualizada com sucesso" });
        }
      }
    );
  }

  deleteMatch(req, res) {
    const matchId = req.params.id;

    Match.deleteMatch(matchId, (error) => {
      if (error) {
        console.error("Erro ao excluir a partida:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json({ message: "Partida excluída com sucesso" });
      }
    });
  }

  getClassification(req, res) {
    Match.getClassificacao((error, results) => {
      if (error) {
        console.error("Erro ao obter classificação:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  }
}

module.exports = new MatchController();

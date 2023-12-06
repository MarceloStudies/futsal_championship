const database = require("../config/db");

class Match {
  constructor(date, startTime, endTime, team1_id, team2_id, score1, score2) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.team1 = team1_id;
    this.team2 = team2_id;
    this.score1 = score1;
    this.score2 = score2;
  }

  static createMatch(
    date,
    startTime,
    endTime,
    team1_id,
    team2_id,
    score1,
    score2,
    callback
  ) {
    const query =
      "INSERT INTO matches ( date, startTime, endTime, team1_id ,team2_id, score1, score2) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      date,
      startTime,
      endTime,
      team1_id,
      team2_id,
      score1,
      score2,
    ];

    database.query(query, values, callback);
  }

  static getAllMatches(callback) {
    const query = "SELECT * FROM matches";
    database.query(query, callback);
  }

  static getMatchById(matchId, callback) {
    const query = "SELECT * FROM matches WHERE id = ?";
    database.query(query, [matchId], callback);
  }

  static updateMatch(
    matchId,
    date,
    startTime,
    endTime,
    team1_id,
    team2_id,
    score1,
    score2,
    callback
  ) {
    let query = "UPDATE matches SET ";
    let values = [];

    if (date) {
      query += "date = ?, ";
      values.push(date);
    }

    if (startTime) {
      query += "startTime = ?, ";
      values.push(startTime);
    }

    if (endTime) {
      query += "endTime = ?, ";
      values.push(endTime);
    }

    if (team1_id) {
      query += "team1_id = ?, ";
      values.push(team1_id);
    }

    if (team2_id) {
      query += "team2_id = ?, ";
      values.push(team2_id);
    }

    if (score1) {
      query += "score1 = ?, ";
      values.push(score1);
    }

    if (score2) {
      query += "score2 = ?, ";
      values.push(score1);
    }

    // remove a ultima virgula e o ultimo espaço
    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(matchId);

    database.query(query, values, callback);
  }

  static deleteMatch(matchId, callback) {
    const query = "DELETE FROM matches WHERE id = ?";
    database.query(query, [matchId], callback);
  }

  static getClassificacao(callback) {
    const query = `
    SELECT teams.name,
    SUM(points) as points,
    SUM(goals) as goals
  FROM (
      SELECT team1_id as team,
        CASE
          WHEN score1 > score2 THEN 3
          WHEN score1 = score2 THEN 1
          ELSE 0
        END as points,
        score1 as goals
      FROM matches
      UNION ALL
      SELECT team2_id as team,
        CASE
          WHEN score2 > score1 THEN 3
          WHEN score1 = score2 THEN 1
          ELSE 0
        END as points,
        score2 as goals
      FROM matches
    ) as subquery
    INNER JOIN teams  ON subquery.team = teams.id
  GROUP BY team
  ORDER BY points DESC,
    goals DESC;
    `;
    database.query(query, callback);
  }
}

module.exports = Match;

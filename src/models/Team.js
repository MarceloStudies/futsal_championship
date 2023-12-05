
const database = require('../config/db');

class Team {
  constructor(name) {
    this.name = name;
  }

  static createTeam(name, callback) {
    const query = 'INSERT INTO teams (name) VALUES (?)';
    const values = [name];

    database.query(query, values, callback);
  }

  static getAllTeams(callback) {
    const query = 'SELECT * FROM teams';
    database.query(query, callback);
  }

  static getTeamById(teamId, callback) {
    const query = 'SELECT * FROM teams WHERE id = ?';
    database.query(query, [teamId], callback);
  }

  static updateTeam(teamId, name, callback) {
    const query = 'UPDATE teams SET name = ? WHERE id = ?';
    const values = [name,playerId];

    database.query(query, values, callback);
  }

  static deletePlayer(teamId, callback) {
    const query = 'DELETE FROM teams WHERE id = ?';
    database.query(query, [teamId], callback);
  }
}

module.exports = Team;

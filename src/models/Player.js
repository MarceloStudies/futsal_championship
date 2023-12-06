
const database = require('../config/db');

class Player {
  constructor(name, shirtNumber, team_id) {
    this.name = name;
    this.shirtNumber = shirtNumber;
    this.team_id = team_id;
  }

  static createPlayer(name, shirtNumber, team_id, callback) {
    const query = 'INSERT INTO players (name, shirt_number, team_id) VALUES (?, ?, ?)';
    const values = [name, shirtNumber, team_id];

    database.query(query, values, callback);
  }

  static getAllPlayers(callback) {
    const query = 'SELECT P.name, P.shirt_number, T.name as team FROM players P INNER JOIN teams T ON P.team_id = T.id ';
    database.query(query, callback);
  }

  static getPlayerById(playerId, callback) {
    const query = 'SELECT P.name, P.shirt_number, T.name FROM players P INNER JOIN teams T ON P.team_id = T.id WHERE P.id = ?';
    database.query(query, [playerId], callback);
  }

  static updatePlayer(playerId, name, shirtNumber, team_id, callback) {
    let query = 'UPDATE players SET ';
    let values = [];
  
    if (name) {
      query += 'name = ?, ';
      values.push(name);
    }
  
    if (shirtNumber) {
      query += 'shirt_number = ?, ';
      values.push(shirtNumber);
    }
  
    if (team_id) {
      query += 'team_id = ?, ';
      values.push(team_id);
    }
  
    // remove a ultima virgula e o ultimo espaço
    query = query.slice(0, -2);
  
    query += ' WHERE id = ?';
    values.push(playerId);
  
    database.query(query, values, callback);
  }

  static deletePlayer(playerId, callback) {
    const query = 'DELETE FROM players WHERE id = ?';
    database.query(query, [playerId], callback);
  }

  static deleteTeam(teamId, callback) {
    const query = 'DELETE FROM players WHERE team_id = ?';
    database.query(query, [teamId], callback);
  }
}

module.exports = Player;

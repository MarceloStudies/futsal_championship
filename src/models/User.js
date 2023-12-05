const database = require("../config/db");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static createUser(name, email, password, callback) {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    database.query(query, values, callback);
  }

  static getAllUsers(callback) {
    const query = "SELECT * FROM users";
    database.query(query, callback);
  }

  static getUserById(userId, callback) {
    const query = "SELECT * FROM users WHERE id = ?";
    database.query(query, [userId], callback);
  }

  static updateUser(userId, name, email, password, callback) {
    let query = "UPDATE users SET ";
    let values = [];

    if (name) {
      query += "name = ?, ";
      values.push(name);
    }

    if (email) {
      query += "email = ?, ";
      values.push(email);
    }

    if (password) {
      query += "password = ?, ";
      values.push(password);
    }

    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(userId);

    database.query(query, values, callback);
  }

  static deleteUser(userId, callback) {
    const query = "DELETE FROM users WHERE id = ?";
    database.query(query, [userId], callback);
  }

  static getLoginUser(email, password) {
    const query = "SELECT id FROM users WHERE email = ? AND password = ?";
    const values = [email, password];

    return new Promise((resolve, reject) => {
      database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = User;

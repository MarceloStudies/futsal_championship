// /src/config/database.js

const mysql = require('mysql');

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: "mysql",
    user: "dev",
    password: "admin",
    database: "futsal_championship",
  });

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      setTimeout(handleDisconnect, 15000); 
    } else {
      console.log('Conexão bem-sucedida ao banco de dados!');
    }
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Conexão com o banco de dados perdida. Tentando reconectar...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;

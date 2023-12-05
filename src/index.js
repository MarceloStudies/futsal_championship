// /src/index.js
const express = require('express');
const bodyParser = require('body-parser');

const playerRoutes = require('./routes/PlayerRoutes');
const teamRoutes = require('./routes/TeamRoutes');
const matchRoutes = require('./routes/MatchRoutes');
const userRoutes = require('./routes/UserRoutes');

const database = require('./config/db');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas relacionadas aos jogadores
app.use('/api', playerRoutes);
app.use('/api', teamRoutes);
app.use('/api', matchRoutes);
app.use('/api', userRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
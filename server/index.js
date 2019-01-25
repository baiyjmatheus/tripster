require('dotenv').config();

const express = require('express');
const PORT = 8080;
const app = express();
const ENV = process.env.ENV || "development";

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');

const path = require('path');

app.use(knexLogger(knex));
app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/login', (req, res) => {
  res.redirect('http://localhost:3000');
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
require('dotenv').config();

const express = require('express');
const PORT = 8080;
const app = express();
const ENV = process.env.ENV || "development";

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const path = require('path'); //added this package b/c matt said it wouldnt work otherwise

app.use(knexLogger(knex));

app.get("/", (req, res) => {
  res.send('Hello server');
});

app.get("/summary", (req, res) => {
  res.sendFile(path.join(__dirname + '/summary.html'))
})

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
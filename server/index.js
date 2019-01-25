require('dotenv').config();

const express = require('express');
const PORT = 8080;
const app = express();
const ENV = process.env.ENV || "development";

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');

app.use(knexLogger(knex));

app.get("/", (req, res) => {
  res.send('Hello server');
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
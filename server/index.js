require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 8080;
const ENV = process.env.ENV || "development";

const io = require('socket.io')(app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
}));

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');

app.use(knexLogger(knex));

app.get("/", (req, res) => {
  res.send('Hello server');
});

io.on('connection', socket => {
	console.log('user connected');

  socket.on('test', msg => {
    console.log('server revcieved msg: ', msg);
    io.sockets.emit('test', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});

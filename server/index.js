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

const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(knexLogger(knex));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['final']
}));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/login', (req, res) => {
  const { email, name } = req.body;
  knex.select('id','email', 'name').from('users').where('email', email)
    .then((existingUser) => {
      if (existingUser.length === 0) {
        knex('users').returning('id').insert({email, name})
        .then((newUserId) => {
          req.session.id = newUserId[0];
        });
      } else {
        req.session.id = existingUser.id;
      }
      res.redirect('http://localhost:3000');
    })
  
  
});

// on client connect/disconnect, socket is created/destroyed
io.on('connection', socket => {
	console.log('user connect', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnect', socket.id);
  });
});

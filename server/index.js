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
const cors = require('cors');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(knexLogger(knex));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['final']
}));

app.use(cors());

// Create new user and set session cookie
app.post('/login', (req, res) => {
  const { email, name } = req.body;
  knex.select('id','email', 'name').from('users').where('email', email)
    .then((existingUser) => {
      if (existingUser.length === 0) {
        knex('users').returning('id').insert({email, name})
        .then((newUserId) => {
          res.send({id: newUserId[0]});
        });
      } else {
        res.send({id: existingUser[0].id});
      }
        
    });
});

// Create new trip (adds trip to DB)
app.post('/trips/create', (req, res) => {
  const newTrip = req.body;

  knex('trips')
    .returning('id')
    .insert({
      name: 'Amazing Trip',
      origin: newTrip.origin,
      destination: newTrip.destination,
      start_date: newTrip.start_date,
      end_date: newTrip.end_date
    })
    .then((tripId) => {
      res.send({id: tripId[0]});
    });
});

// join trip - queries DB to see if trip exists and returns true or false to client
app.post('/trips/join', (req, res) => {

 const tripCode = req.body.trip_id

  knex('trips')
    .where('id', tripCode)
    .then((response) =>{
      if(response.length){
        res.send({exists: true})
      } else {
        res.send({exists:false})
      }
    })

});


// on client connect/disconnect, socket is created/destroyed
io.on('connection', socket => {
	console.log('new socket established', io.nsps['/'].server);
  socket.on('new user', userId => {
    knex('users').returning('*').where('id', userId).then(user => {
      const userData = {
        id: user[0].id,
        name: user[0].name,
        color: setUserColor(socket.conn.server.clientsCount % 3)
      }
      socket.emit('new user', userData)
      // colorsIncrement == 2 ? colorsIncrement = 0 : colorsIncrement++
    })
  })
  // console.log('session:', session)
  // emit to current user, broadcast to all others (broadcast does not send to current)
  socket.on('new message', msg => {
  	io.emit('new message', msg)
  })

  socket.on('startReady', startReady => {
    socket.startReady = socket.startReady ? !socket.startReady: startReady;
    const socketsId = Object.keys(io.sockets.sockets);
    let startReadyCounter = 0;
    socketsId.forEach((socketId) => {
      if (io.sockets.sockets[socketId].startReady) {
        startReadyCounter++;
      }
    });

    if (startReadyCounter === socketsId.length) {
      io.emit('next step', 'flights');
    }
  });
  
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});


const setUserColor = (num) => {
  const colors = ['tomato', 'greenyellow', 'yellow'];
  return colors[num]
}
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
          req.session.id = newUserId[0];
        });
      } else {
        req.session.id = existingUser.id;
      }
      res.redirect('http://localhost:3000');
    });
});

// Create new trip
app.post('/trips/create', (req, res) => {
  const newTrip = req.body;

  console.log("trip created")

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

// join trip
app.post('/trips/join', (req, res) => {
 // const tripCode = req.params
 const tripCode = req.body

 console.log( "trip join", tripCode )

 // console.log("request sent")

  // knex('trips')
  //   .where('id', tripCode)
  //   .then((res) =>{
  //   // .then((trips) => {
  //   //   if (.length !== 0){
  //       // res.send(res)
  //       console.log(res)
  //   //   } else {
  //   //     res.send({exists: false})
  //     })
    // })
});


// on client connect/disconnect, socket is created/destroyed
io.on('connection', socket => {
	console.log('user connect', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnect', socket.id);
  });
});

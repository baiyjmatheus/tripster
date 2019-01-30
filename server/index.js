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
const moment = require('moment');

moment.locale('br');

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

<<<<<<< HEAD
// app.get('/trips/:trip_id/events', (req, res) => {
//   console.log(ENV.EVENTBRITE_API_TOKEN)
//   request(
//     `https://www.eventbriteapi.com/v3/events/search?location.address=TORONTO&location.within=5km&expand=venue&token=${process.env.EVENTBRITE_API_TOKEN}`, 
//     (error, response, body) => {
//     res.send(body)
//   })
// })

// on client connect/disconnect, socket is created/destroyed
io.on('connection', socket => {
	// console.log('new socket established', io.nsps['/'].server);
=======
// on client connect/disconnect, socket is created/destroyed
io.on('connection', socket => {
  socket.on('new user', userId => {
    knex('users').returning('*').where('id', userId).then(user => {
      const userData = {
        id: user[0].id,
        name: user[0].name,
        color: setUserColor(socket.conn.server.clientsCount % 3)
      }
      socket.emit('new user', userData)
    })
  })
<<<<<<< HEAD

  socket.on('events request', () => {
    socket.eventReady = true;
    const socketsId = Object.keys(io.sockets.sockets);
    let eventReadyCounter = 0;
    socketsId.forEach((socketId) => {
      if (io.sockets.sockets[socketId].eventReady) {
        eventReadyCounter++;
      }
    });

    if (eventReadyCounter === socketsId.length) {
    request(
      `https://www.eventbriteapi.com/v3/events/search?location.address=TORONTO&location.within=5km&expand=venue&token=${process.env.EVENTBRITE_API_TOKEN}`, 
      (error, response, body) => {
        parsedBody = JSON.parse(body)
        // console.log(parsedBody)
        const eventsData = parsedBody.events.map(event => {
          const img = event.logo ? event.logo.url : 'http://www.eventelephant.com/wp-content/uploads/2019/01/What-Makes-Xsaga-Different.jpg'
          const rating = Math.floor((Math.random() * 5) * 10) / 10
          const price = Math.floor((Math.random() * 250) * 100) / 100 
          return { 
            name: event.name.text, 
            description: event.description.text, 
            start_time: event.start.local, 
            end_time: event.end.local,
            img: img,
            address: event.venue.address.address1,
            rating: rating,
            price: price
          }
        })
        console.log(eventsData)
        io.emit('events data', eventsData)
      })
    }
  })
  // console.log('session:', session)

  // emit to current user, broadcast to all others (broadcast does not send to current)
  socket.on('new message', msg => {
    io.emit('new message', msg);
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

  socket.on('flightReady', (tripId) => {
    socket.flightReady = true;
    const socketsId = Object.keys(io.sockets.sockets);
    let flightReadyCounter = 0;
    socketsId.forEach((socketId) => {
      if (io.sockets.sockets[socketId].startReady) {
        flightReadyCounter++;
      }
    });

    if (flightReadyCounter === socketsId.length) {
      knex('trips')
      .where('id', tripId)
      .then((dbTrip) => {
        const [trip] = dbTrip;

        if (trip) {
        // Get flights from flight API
          request(`https://api.skypicker.com/flights?flyFrom=${trip.origin}&to=${trip.destination}&dateFrom=${moment(trip.start_date).format('L')}&dateTo=${moment(trip.end_date).format('L')}&curr=CAD&limit=9&partner=picky`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              const flights = JSON.parse(body).data.map((flight) => {
                return {
                  route: flight.route,
                  quality: flight.quality,
                  flyFrom: flight.flyFrom,
                  flyTo: flight.flyTo,
                  price: flight.price
                }
              });
              io.emit('flights', flights);
            }
          });
        }
      });
    }
  }); 

});





const setUserColor = (num) => {
  const colors = ['tomato', 'greenyellow', 'yellow'];
  return colors[num]
}
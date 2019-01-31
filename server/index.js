require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 8080;
const ENV = process.env.ENV || "development";
const tripsRoutes = require('./routes/trips');


const GOOGLE_PLACE_KEY= process.env.GOOGLE_PLACE_KEY



const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const request = require('request');
const moment = require('moment');

const io = require('socket.io')(app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(knexLogger(knex));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['final']
}));
app.use(cors());
moment.locale('br');

app.use('/trips', tripsRoutes);

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

// on client connect/disconnect, socket is created/destroyed
	// console.log('new socket established', io.nsps['/'].server);
// on client connect/disconnect, socket is created/destroyed

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
	// console.log('new socket established', io.nsps['/'].server);

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

  // emit to current user, broadcast to all others (broadcast does not send to current)
  socket.on('new message', msg => {
    io.emit('new message', msg);
  });

  // broadcast flights whenever all participants are ready
  socket.on('startReady', startReady => {
    socket.startReady = socket.startReady ? !socket.startReady: startReady;
    if (readyCounter('startReady')) {
      io.emit('next step', 'flights');
    }
  });

//socket to handle broadcasting data from hotel api
  socket.on('hotels request', () => {
  console.log("hotel socket active")
  socket.hotelReady = true;

  //getting info from the api and processing
    if (readyCounter('hotelReady')){
      request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=25000&type=lodging&keyword=hotel&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
        const hotelResults = JSON.parse(body).results;
        const hotelData = hotelResults.map(hotel => {
          return {
            name: hotel.name,
            rating: hotel.rating,
            location: hotel.geometry.location,
            address: hotel.vicinity,
            img: getPhoto(hotel.photos[0].photo_reference),
            price:(Math.random()*(2000-200)+200).toFixed(2)
          }
        })
        io.emit('hotel data', hotelData)
      })
    }
  });

  //socket to handle broadcasting data from attraction api
  socket.on('attractions request', () => {
  console.log("attractions socket active")
  socket.attractionReady = true;

  //getting info from the api and processing

    if (readyCounter('attractionReady')){
      request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Sydney+point+of+interest&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
        const attractionResults = JSON.parse(body).results;

        const attractionData = attractionResults.map(attraction => {
          if(attraction.photos){
            const attractionPhoto = getPhoto(attraction.photos[0].photo_reference)
            return returnObject(attraction, "point_of_interest", attractionPhoto )
          } else {
            return OBJ2 = returnObject(attraction, "point_of_interest", attraction.icon )
          }
        })


       io.emit('attractions data', attractionData, attractionData)
      })

      //api request for amusement parks
       request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Sydney+amusement+park&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
            const attractionResultsAM = JSON.parse(body).results;

            const attractionDataAM = attractionResultsAM.map(attractionAM => {
              if(attractionAM.photos){
                const attractionPhotoAM = getPhoto(attractionAM.photos[0].photo_reference)
                return returnObject(attractionAM, "amusement_park", attractionPhotoAM )
              } else {
                return OBJ2 = returnObject(attractionAM, "amusement_park", attractionAM.icon )
              }
            })

            io.emit('attractions Data amusement', attractionDataAM)
        })

       //api request for aquarium
        request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Sydney+aquarium&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
            const attractionResultsAquarium = JSON.parse(body).results;

            const attractionDataAquarium = attractionResultsAquarium.map(attractionAquarium => {
              if(attractionAquarium.photos){
                const attractionPhotoAquarium = getPhoto(attractionAquarium.photos[0].photo_reference)
                return returnObject(attractionAquarium, "aquarium", attractionPhotoAquarium )
              } else {
                return OBJ2 = returnObject(attractionAquarium, "aquarium", attractionAquarium.icon )
              }
            })

            io.emit('attractions Data aquarium', attractionDataAquarium)
        })
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });

  socket.on('flightReady', (tripId) => {
    socket.flightReady = true;
    if (readyCounter('flightReady')) {
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

  socket.on('events request', () => {
    socket.eventReady = true;
    if (readyCounter('eventReady')) {
    request(
      `https://www.eventbriteapi.com/v3/events/search?location.address=TORONTO&location.within=5km&expand=venue&token=${process.env.EVENTBRITE_API_TOKEN}`,
      (error, response, body) => {
        parsedBody = JSON.parse(body)
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

        io.emit('events data', eventsData)
      })
    }
  })


});

const readyCounter = (step) => {
  const socketsId = Object.keys(io.sockets.sockets);
  let counter = 0;
  socketsId.forEach((socketId) => {
    if (io.sockets.sockets[socketId][step]) {
      counter++;
    }
  });

  return counter === socketsId.length;
}

const setUserColor = (num) => {
  const colors = ['tomato', 'greenyellow', 'yellow'];
  return colors[num]
}

const getPhoto = (photo_reference_id) => {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photo_reference_id}&key=${GOOGLE_PLACE_KEY}`

  return photoUrl
}

 const returnObject = (singleAttraction,type, photo) =>{
  const OBJ = {
          name: singleAttraction.name,
          rating: singleAttraction.rating,
          location: singleAttraction.geometry.location,
          address: singleAttraction.formatted_address,
          img: photo,
          price:(Math.random()*(50-10)+10).toFixed(2),
          type: type
        }
    return OBJ
  }

 const returnObjectURL = (singleAttraction,type, photo) =>{
        return {
          name: singleAttraction.name,
          rating: singleAttraction.rating,
          location: singleAttraction.geometry.location,
          address: singleAttraction.formatted_address,
          img: getPhoto(photo),
          price:(Math.random()*(50-10)+10).toFixed(2),
          type: singleAttraction.types
        }
      }
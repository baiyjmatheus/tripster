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
        color: setUserColor(socket.conn.server.clientsCount % 3),
        socketId: socket.id
      }
      socket.emit('new user', userData)
    })
  });
  // broadcast chat messages
  socket.on('new message', msg => {
    io.emit('new message', msg);
  });

  // broadcast flights whenever all participants are ready
  socket.on('start', startState => {
    socket.startReady = !startState;
    if (readyCounter('startReady')) {
      io.emit('next', ['start', 'flights']);
    }
  });

// socket to handle broadcasting data from hotel api
  socket.on('hotels request', () => {

    socket.hotelReady = true;

    if (readyCounter('hotelReady')){
      request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=25000&type=lodging&keyword=hotel&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
        let count = 0;
        const hotelResults = JSON.parse(body).results;
        const hotelData = hotelResults.map(hotel => {
          // obj for handling selection on a per socket basis
          let socketIds = {}
          Object.keys(io.sockets.sockets).forEach(id => {
            socketIds[id] = { selected: false, color: null }
          })
          count++
          return {
            id: count,
            name: hotel.name,
            rating: hotel.rating,
            location: hotel.geometry.location,
            address: hotel.vicinity,
            latt: hotel.geometry.location.lat,
            long: hotel.geometry.location.lng,
            img: hotel.icon, // use getPhoto(hotel.photos[0].photo_reference) for actual api picture,
            price:(Math.random()*(2000-200)+200).toFixed(2),
            socketIds
          }
        })
        io.emit('hotel data', hotelData)
      })
    }
  });

  // socket.hotelReady = true;

  //getting info from the api and processing

    // if (readyCounter('hotelReady')){
      //COMMENTED OUT API CALL DO NOT DELETE !!!! ///
      // request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=25000&type=lodging&keyword=hotel&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {
      //   const hotelResults = JSON.parse(body).results;
      //   const hotelData = hotelResults.map(hotel => {
      //     return {
      //       name: hotel.name,
      //       rating: hotel.rating,
      //       location: hotel.geometry.location,
      //       address: hotel.vicinity,
      //       img: getPhoto(hotel.photos[0].photo_reference),
      //       price:(Math.random()*(2000-200)+200).toFixed(2)
      //     }
      //   })
      //   io.emit('hotel data', hotelData)
      // })

//***** COMMENTED OUT TO LIMIT API CALLS , TEST DATA IN PACKGAE JSON !!! *****//
  //socket to handle broadcasting data from attraction api
  socket.on('attractions request', (tripId) => {
  console.log("attractions socket active")
  socket.attractionReady = true;

  const city = 'Sydney'

  // //getting info from the api and processing

    if (readyCounter('attractionReady')){

     FindAttractions('point_of_interest', city ,'attractions data')
     FindAttractions('amusement_park', city,'attractions Data amusement')
     // FindAttractions('aquarium', city,'attractions Data aquarium')
     // FindAttractions('art_gallery', city,'attractions Data ArtGallery')
     // FindAttractions('casino', city,'attractions Data Casino')
     // FindAttractions('museum', city,'attractions Data Museum')
     // FindAttractions('park', city,'attractions Data Parks')
     // FindAttractions('restaurant', city,'attractions Data Restaurant')
     // FindAttractions('stadium', city,'attractions Data Stadium')
     // FindAttractions('spa', city, 'attractions Data Spa')
     // FindAttractions('shopping_mall', city,'attractions Data ShoppingMall')
     // FindAttractions('zoo', city, 'attractions Data Zoo')

    }
  });

  socket.on('hotel selection', hotel => {
    console.log(hotel)
    io.emit('hotel selection', hotel)
  });

  socket.on('hotels final selections', data => {
    knex('hotels')
      .returning('*')
      .where('trip_id', data.tripId)
      .then( hotels => {
        console.log(hotels)
        if (hotels.length === 0) {
          data.data.forEach(hotel => {
            knex('hotels')
              .insert({
                name: hotel.name,
                rating: hotel.rating,
                price: hotel.price,
                trip_id: data.tripId,
                latt: hotel.latt,
                long: hotel.long
              })
              .then()
          })
        }
      })
  })

  // Socket disconnects

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });

  // Broadcast flight suggestions
  socket.on('flightReady', (tripId) => {
    socket.flightReady = true;
    if (readyCounter('flightReady')) {
      knex('trips')
      .where('id', tripId)
      .then((dbTrip) => {
        const [trip] = dbTrip;
        let count = 0
        if (trip) {
        // Get flights from flight API
          request(`https://api.skypicker.com/flights?flyFrom=${trip.origin}&to=${trip.destination}&dateFrom=${moment(trip.start_date).format('L')}&dateTo=${moment(trip.end_date).format('L')}&curr=CAD&limit=9&partner=picky`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              console.log(body);
              const flights = JSON.parse(body).data.map((flight) => {
                let socketIds = {}
                Object.keys(io.sockets.sockets).forEach(id => {
                  socketIds[id] = { selected: false, color: null}
                })
                count++
                console.log(flight.route)
                return {
                  id: count,
                  route: flight.route,
                  quality: flight.quality,
                  flyFrom: flight.flyFrom,
                  flyTo: flight.flyTo,
                  price: flight.price,
                  socketIds
                }
              });
              io.emit('flights', flights);
            }
          });
        }
      });
    }
  });

  socket.on('flight selection', flight => {
    io.emit('flight selection', flight)
  })

  socket.on('flights final selections', data => {
    console.log(data)
    knex('flights')
      .returning('*')
      .where('trip_id', data.tripId)
      .then( flights => {
        if (flights.length === 0) {
          data.data.forEach(flight => {
            flight.route = JSON.stringify(flight.route)
            knex('flights')
              .insert({
                quality: flight.quality,
                price: flight.price,
                trip_id: data.tripId,
                route: flight.route
              })
              .then()
          })
        }
      })
  })


  // Checks if redirecting to events
  socket.on('flights', (flightState) => {
    socket.flights = !flightState;
    if (readyCounter('flights')) {
      io.emit('next', ['flights', 'hotels']);
    }
  });

  // Checks if redirecting to events
  socket.on('hotels', (hotelState) => {
    socket.hotels = !hotelState;
    if (readyCounter('hotels')) {
      io.emit('next', ['hotels', 'events']);
    }
  });

  // Checks if redirecting to attractions
  socket.on('events', (eventState) => {
    socket.events = !eventState;
    if (readyCounter('events')) {
      io.emit('next', ['events' ,'attractions']);
    }
  });

  // Checks if redirecting to attractions
  socket.on('attractions', (attractionState) => {
    socket.attractions = !attractionState;
    if (readyCounter('attractions')) {
      io.emit('next', ['attractions', 'summary']);
    }
  });

  // Broadcast events
  socket.on('events request', (tripId) => {
    socket.eventReady = true;
    if (readyCounter('eventReady')) {

      knex('trips')
        .returning('trip')
        .where('id', tripId)
        .then(trip => {
          // fetch events from eventbrite with trip data from DB
          request(
            `https://www.eventbriteapi.com/v3/events/search?location.address=${trip[0].destination}&location.within=10km&expand=venue&start_date.range_start=${moment(trip[0].start_date).format('YYYY-MM-DDTHH:mm:ss')}Z&start_date.range_end=${moment(trip[0].end_date).format('YYYY-MM-DDTHH:mm:ss')}Z&token=${process.env.EVENTBRITE_API_TOKEN}`, (error, response, body) => {
              if (error) {
                return error
              }
              parsedBody = JSON.parse(body)
              let count = 0
              const eventsData = parsedBody.events.map(event => {
                // if event does not have img, insert generic img
                const img = event.logo ? event.logo.url : 'http://www.eventelephant.com/wp-content/uploads/2019/01/What-Makes-Xsaga-Different.jpg'
                // generate random price & rating
                const rating = Math.floor((Math.random() * 5) * 10) / 10
                const price = Math.floor((Math.random() * 250) * 100) / 100
                // temp event id counter
                count++
                /* -each event contains data + selections obj in the form of socketIds
                   -socketIds contains an object for each connected socket
                   -each id obj contains that sockets selection status + their color(pulled from currentUser) */
                let socketIds = {}
                Object.keys(io.sockets.sockets).forEach(id => {
                  socketIds[id] = { selected: false, color: null}
                })
                //return event obj for each
                return {
                  id: count,
                  name: event.name.text,
                  description: event.description.text,
                  start_time: event.start.local,
                  end_time: event.end.local,
                  img: img,
                  address: event.venue.address.address_1,
                  rating: rating,
                  price: price,
                  latt: event.venue.address.latitude,
                  long: event.venue.address.longitude,
                  socketIds
                }
              });
              // broadcast arr of event objs
              io.emit('events data', eventsData)
          });
      });
    }
  });
  // recieves new selection and broadcasts it to all
  socket.on('event selection', event => {
    io.emit('event selection', event)
  })

  socket.on('events final selections', data => {
    knex('events')
    .returning('*')
    .where('trip_id', data.tripId)
    .then( events => {
      if (events.length === 0) {
        data.data.forEach(event => {
          event.venue = JSON.stringify(event.venue)
          knex('events')
          .insert({
            name: event.name,
            start_time: event.start_time,
            end_time: event.end_time,
            url: event.url,
            latt: event.latt,
            long: event.long,
            rating: event.rating,
            price: event.price,
            trip_id: data.tripId,
            venue: event.venue
          })
          .then()
        })
      }
    })
  })
});

// Check the counter of sockets ready
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

// Give each user a color
const setUserColor = (num) => {
  const colors = ['tomato', 'greenyellow', 'yellow'];
  return colors[num]
}

//
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

  const FindAttractions = (type, city, socketEventName) => {

    const formattedCityName = city.replace(/\s/g,"+")
    const formattedType = type.replace(/[\W_]+/g,"+")

    request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${formattedCityName}+${formattedType}&key=${GOOGLE_PLACE_KEY}`, function (error, response, body){
      const attractionType = type
      const APIresults = JSON.parse(body).results;
      const APIdata = APIresults.map(result => {
        if (result.photos){
          const resultPhoto = getPhoto(result.photos[0].photo_reference)
          return returnObject(result, type, result.icon) //replace result.icon with resultPhoto to get imgs from api
        } else {
           return returnObject(result, type , result.icon )
        }
      })

      io.emit(socketEventName, APIdata)
    })
  }

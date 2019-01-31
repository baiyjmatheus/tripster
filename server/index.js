require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 8080;
const ENV = process.env.ENV || "development";

const GOOGLE_PLACE_KEY= process.env.GOOGLE_PLACE_KEY

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

//api call to get hotel information
// app.get('/trips/:trip_id/hotel', (req, res) => {

//   request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=25000&type=lodging&keyword=hotel&key=${GOOGLE_PLACE_KEY}`, function (error, response, body) {

//     const hotelResults = JSON.parse(body);
//     console.log('api request made:');
//     // console.log(hotelResults)
//     // console.log(body)
//     res.send({hotelData: hotelResults.results, key: GOOGLE_PLACE_KEY})

//     // return hotelResults
//   });

//   // res.send(GOOGLE_PLACE_KEY)
//   // console.log ("get insert working")

// });


// using socket io


// socket.on('events request', () => {
//     socket.eventReady = true;
//     const socketsId = Object.keys(io.sockets.sockets);
//     let eventReadyCounter = 0;
//     socketsId.forEach((socketId) => {
//       if (io.sockets.sockets[socketId].eventReady) {
//         eventReadyCounter++;
//       }


//     const hotelResults = JSON.parse(body);
//     console.log('api request made:');
//     // console.log(hotelResults)
//     // console.log(body)
//     res.send({hotelData: hotelResults.results, key: GOOGLE_PLACE_KEY})
// //     });

//     if (eventReadyCounter === socketsId.length) {
//     request(
//       `https://www.eventbriteapi.com/v3/events/search?location.address=TORONTO&location.within=5km&expand=venue&token=${process.env.EVENTBRITE_API_TOKEN}`,
//       (error, response, body) => {
//         parsedBody = JSON.parse(body)
//         // console.log(parsedBody)
//         const eventsData = parsedBody.events.map(event => {
//           const img = event.logo ? event.logo.url : 'http://www.eventelephant.com/wp-content/uploads/2019/01/What-Makes-Xsaga-Different.jpg'
//           const rating = Math.floor((Math.random() * 5) * 10) / 10
//           const price = Math.floor((Math.random() * 250) * 100) / 100
//           return {
//             name: event.name.text,
//             description: event.description.text,
//             start_time: event.start.local,
//             end_time: event.end.local,
//             img: img,
//             address: event.venue.address.address1,
//             rating: rating,
//             price: price
//           }
//         })
//         console.log(eventsData)
//         io.emit('events data', eventsData)
//       })
//     }
//   })



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

  socket.on('hotels request', () => {
  console.log("hotel socket active")
  socket.hotelReady = true;
  const socketsId = Object.keys(io.sockets.sockets);
  let hotelReadyCounter = 0;

  socketsId.forEach((socketId) => {
    if (io.sockets.sockets[socketId].hotelReady){
      hotelReadyCounter++;
      console.log("here!")
    }
  })

    if (hotelReadyCounter === socketsId.length){
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

           // console.log(hotelData);

            console.log('api request made:', hotelData);
            console.log("hotel data test")
            io.emit('hotel data', hotelData)

        })


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

function getPhoto(photo_reference_id){
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photo_reference_id}&key=${GOOGLE_PLACE_KEY}`

  return photoUrl
}


//commented out crap


// //     const hotelResults = JSON.parse(body);
//           console.log('api request made:');

//         })
// //     // console.log(hotelResults)
// //     // console.log(body)
// //     res.send({hotelData: hotelResults.results, key: GOOGLE_PLACE_KEY})

// //     // return hotelResults
//   // });
//   //     request (`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=25000&type=lodging&keyword=hotel&key=${GOOGLE_PLACE_KEY}`), function(error, response, body){ console.log(body)

//       }

//       //   console.log(hotelResults)
//       //      const hotelData = hotelResults.results.map(hotel => {
//       //       return {
//       //         name: hotel.name,
//       //         rating: hotel.rating,
//       //         location: hotel.location,
//       //         address: hotel.vicinity,
//       //         img: getPhoto(hotel.photos[0].photo_reference),
//       //         price:(Math.random()*(2000-200)+200).toFixed(2)
//       //       }
//       //      })

//            // console.log(hotelData);
//            console.log("hotel data test")
//            io.emit('hotel data', "test data")
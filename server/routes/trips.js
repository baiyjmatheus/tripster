const express = require('express');
const router = express.Router();
const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const request = require('request');


// Create new trip (adds trip to DB)
router.post('/create', (req, res) => {
  const newTrip = req.body;

  knex('trips')
    .returning('id')
    .insert({
      name: newTrip.title,
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
router.post('/join', (req, res) => {

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

router.get('/:trip_id/summary', (req, res) => {
  let data = {}
  const tripId = req.params.trip_id
  // pull all data for trip from db
  knex('trips')
    .returning('*')
    .where('id', tripId)
    .then(trip => {
      request(`https://api.opencagedata.com/geocode/v1/json?q=${trip[0].destination}&key=${process.env.GEOCODE_KEY}`, (err, resp, body) => {
        let parsedBody = JSON.parse(body)
        trip[0].latt = parsedBody.results[0].geometry.lat
        trip[0].long = parsedBody.results[0].geometry.lng
        data.trip = trip;
        knex('flights')
          .returning('*')
          .where('trip_id', tripId)
          .then(flights => {
            data.flights = flights;
            knex('hotels')
              .returning('*')
              .where('trip_id', tripId)
              .then(hotels => {
                data.hotels = hotels;
                knex('events')
                  .returning('*')
                  .where('trip_id', tripId)
                  .then(events => {
                    data.events = events;
                    knex('attractions')
                      .returning('*')
                      .where('trip_id', tripId)
                      .then(attractions => {
                        data.attractions = attractions;
                        res.send(data)
                      })
                  })
              })
          })
      })
    })
})

// router.get('/:trip_id/summary', (req, res) => {
//   console.log(req.params)
//   const tripId = req.params.trip_id
//   knex('trips')
//     .returning('*')
//     .where('id', tripId)
//     .then(trip => {
//       res.send(data)
//     })
// })

module.exports = router;
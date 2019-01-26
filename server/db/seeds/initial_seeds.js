exports.seed = function(knex, Promise) {

  function deleteUsersTrips() {
    return knex('users_trips').del()
  }

  function deleteAttractions() {
    return knex('attractions').del()
  }

  function deleteEvents() {
    return knex('events').del()
  }

  function deleteTrips() {
    return knex('trips').del()
  }

    function deleteHotels() {
    return knex('hotels').del()
  }

    function deleteFlights() {
    return knex('flights').del()
  }

    function deleteUsers() {
    return knex('users').del()
  }

  function insertUsers() {
    return knex('users').insert([
      {name: 'Mariam', email: 'mariam@email.com'},
      {name: 'Matt', email: 'matt@email.com'},
      {name: 'Mike', email: 'mike@email.com'},
      {name: 'John', email: 'john@email.com'},
      {name: 'Peter', email: 'peter@email.com'},
      {name: 'Ashley', email: 'ashley@email.com'},
      {name: 'Julia', email: 'julia@email.com'},
      {name: 'Mark', email: 'mark@email.com'},
      {name: 'Lucy', email: 'lucy@email.com'},
      {name: 'Gerald', email: 'gerald@email.com'}
    ]).returning('*');
  }

  function insertFlights() {
    return knex('flights').insert([
      {quality: 778.532437, price: 694.0, route: {[
        {'cityTo':'BEL', 'cityFrom':'GRU', 'dTime':'1551792000', 'aTime':'1551804600'},
        {'cityTo':'FLL', 'cityFrom':'BEL', 'dTime':'1551886800', 'aTime':'1551903300'},
        {'cityTo':'YYZ', 'cityFrom':'FLL', 'dTime':'1551911400', 'aTime':'1551922740'}
      ]}},
      {quality: 874.065699, price: 734.0, route: {[
        {'cityTo':'BOG', 'cityFrom':'GRU', 'dTime':'1551886800', 'aTime':'1551901500'},
        {'cityTo':'BOS', 'cityFrom':'BOG', 'dTime':'1551964620', 'aTime':'1551986460'},
        {'cityTo':'YYZ', 'cityFrom':'BOS', 'dTime':'1552040700', 'aTime':'1552048380'}
      ]}},
      {quality: 778.532437, price: 694.0, route: {[
        {'cityTo':'YYZ', 'cityFrom':'GRU', 'dTime':'1551792000', 'aTime':'1551903300'}
      ]}}
    ]).returning('*');
  }

  function insertHotels() {
    return knex('hotels').insert([
      {
        name: 'Sheraton Centre', 
        latt: 43.6511, 
        long: -79.3843, 
        rating: 4.3, 
        address: '123 Queen St W', 
        photo_reference: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Downtown_toronto.jpg/240px-Downtown_toronto.jpg'
      },
      {
        name: 'Chelsea Hotel', 
        latt: 43.6585, 
        long: -79.3831, 
        rating: 3.9, 
        address: '33 Gerrard St W', 
        photo_reference: 'http://www.cfmedia.vfmleonardo.com/imageRepo/2/0/67/391/865/Chelsea_Hotel_Exterior_S.jpg'
      },
      {
        name: 'The Ritz-Carlton', 
        latt: 43.6455, 
        long: -79.3872, 
        rating: 4.6, 
        address: '181 Wellington St W', 
        photo_reference: 'https://ritzcarlton-h.assetsadobe.com/is/image/content/dam/the-ritz-carlton/hotels/usa-and-canada/ontario/toronto/property/282614_extracted.png'
      }
    ]).returning('*');
  }

  function insertTrips() {
    return knex('trips').insert([
      {
        name: 'Awesome Trip to YYZ from GRU', 
        origin: 'Sao Paulo', 
        destination: 'Toronto', 
        start_date: '2019-02-10', 
        end_date: '2019-02-30', 
        flight_id: 2, 
        hotel_id: 3
      }
    ]).returning('*');
  }

  function insertEvents() {
    return knex('events').insert([
      {
        name: 'event1', 
        description: 'description event1', 
        url: 'https://www.eventbrite.com', 
        start_time: '2019-02-12', 
        end_time: '2019-02-12', 
        price: 90,
        venue:  {"name": "Sheraton Centre Toronto Hotel",
                  "latitude": "43.6511753",
                  "longitude": "-79.38423769999997"
        },
        trip_id: 1
      },
      {
        name: 'event2', 
        description: 'description event2', 
        url: 'https://www.eventbrite.com', 
        start_time: '2019-02-20', 
        end_time: '2019-02-20', 
        price: '',
        venue:  {"name": "Ralph Thornton Community Centre",
                  "latitude": "43.659115",
                  "longitude": "-79.34754499999997"
        }, 
        trip_id: 1
      },
      {
        name: 'event3', 
        description: 'description event3', 
        url: 'https://www.eventbrite.com', 
        start_time: '2019-02-30', 
        end_time: '2019-02-15', 
        price: 482.29,
        venue:  { "name": "Ralph Thornton Community Centre",
                  "latitude": "43.659115",
                  "longitude": "-79.34754499999997"
        }, 
        trip_id: 1
      },
      {
        name: 'event4', 
        description: 'This Black History Month, Historica Canada is proud to host a special evening of storytelling and music', 
        url: 'https://www.eventbrite.ca/e/raising-our-voices-sharing-black-canadian-stories-tickets-54710607901?aff=ebapi', 
        start_time: '2019-02-14', 
        end_time: '2019-02-14', 
        price: 111.04, 
        venue: {"name": "This is an Online Event",
                "latitude": "43.653226",
                "longitude": "-79.38318429999998"
        }, 
        trip_id: 1
      }
    ]).returning('*');
  }

  function insertAttractions() {
    return knex('attractions').insert([
      {
        name: 'Brickworks', 
        latt: 43.6847, 
        long: -79.3654, 
        rating: 9.0, 
        trip_id: 1
      },
      {
        name: 'CN Tower', 
        latt: 43.6426, 
        long: -79.3871, 
        rating: 5.5, 
        trip_id: 1
      },
      {
        name: 'Ripley\'s Aquarium', 
        latt: 43.6424, 
        long: -79.3860, 
        rating: 6.3, 
        trip_id: 1
      },
      {
        name: 'Roger\'s Centre', 
        latt: 43.6414, 
        long: 79.3894, 
        rating: 4.3, 
        trip_id: 1
      }
    ]).returning('*');
  }

  function insertUserTrips() {
    return knex('users_trips').insert([
      {user_id: 1, trip_id: 1},
      {user_id: 2, trip_id: 1},
      {user_id: 3, trip_id: 1},
      {user_id: 4, trip_id: 1},
      {user_id: 5, trip_id: 1},
      {user_id: 6, trip_id: 1},
      {user_id: 7, trip_id: 1},
      {user_id: 8, trip_id: 1}
    ]).returning('*');
  }

  return deleteUsersTrips()
    .then(deleteAttractions)
    .then(deleteEvents)
    .then(deleteTrips)
    .then(deleteHotels)
    .then(deleteFlights)
    .then(deleteUsers)

    .then(insertUsers)
    .then(insertFlights)
    .then(insertHotels)
    .then(insertTrips)
    .then(insertEvents)
    .then(insertAttractions)
    .then(insertUsersTrips)
};


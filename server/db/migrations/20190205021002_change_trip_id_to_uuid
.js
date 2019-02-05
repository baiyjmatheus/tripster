
exports.up = function(knex, Promise) {
  return dropUsersTrips()
    .then(dropFlights)
    .then(dropHotels)
    .then(dropEvents)
    .then(dropAttractions)
    .then(dropUsers)
    .then(dropTrips)
    .then(createUsersTable)
    .then(createTripsTable)
  	.then(createFlightsTable)
  	.then(createHotelsTable)
  	.then(createEventsTable)
  	.then(createAttractionsTable)
  	.then(createUsersTripsTable);


  function dropUsersTrips() {
    return knex.schema.dropTable('users_trips')
  }

  function dropFlights() {
    return knex.schema.dropTable('flights')
  }

  function dropHotels() {
    return knex.schema.dropTable('hotels')
  }

  function dropEvents() {
    return knex.schema.dropTable('events')
  }

  function dropAttractions() {
    return knex.schema.dropTable('attractions')
  }

  function dropTrips() {
    return knex.schema.dropTable('trips')
  }

  function dropUsers() {
    return knex.schema.dropTable('users')
  }

  function createUsersTable() {
  	return knex.schema.createTable('users', table => {
  	  table.increments();
      table.string('name');
      table.string('email');
  	});
  }

  function createFlightsTable() {
    return knex.schema.createTable('flights', table => {
      table.increments();
      table.float('quality');
      table.float('price');
      table.json('route');
      table.uuid('trip_id').references('id').inTable('trips');
    });
  }

  function createHotelsTable() {
    return knex.schema.createTable('hotels', table => {
      table.increments();
      table.string('name');
      table.float('latt');
      table.float('long');
      table.float('rating');
      table.float('price');
      table.string('address');
      table.string('photo_reference');
      table.uuid('trip_id').references('id').inTable('trips');
    });
  }

  function createTripsTable() {
    return knex.schema.createTable('trips', table => {
      table.uuid('id').primary();
      table.string('name');
      table.string('origin');
      table.string('destination');
      table.date('start_date');
      table.date('end_date');
    });
  }

  function createEventsTable() {
    return knex.schema.createTable('events', table => {
      table.increments();
      table.string('name');
      table.string('description');
      table.string('url');
      table.date('start_time');
      table.date('end_time');
      table.float('price');
      table.json('venue');
      table.float('rating');
      table.float('latt');
      table.float('long');
      table.uuid('trip_id').references('id').inTable('trips');
    });
  }

  function createAttractionsTable() {
    return knex.schema.createTable('attractions', table => {
      table.increments();
      table.string('name');
      table.float('latt');
      table.float('long');
      table.float('rating');
      table.float('price')
      table.uuid('trip_id').references('id').inTable('trips');
    });
  }

  function createUsersTripsTable() {
    return knex.schema.createTable('users_trips', table => {
      table.integer('user_id').references('id').inTable('users');
      table.uuid('trip_id').references('id').inTable('trips');
    })
  }
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users_trips')
    .dropTable('trips')
    .dropTable('attractions')
    .dropTable('events')
    .dropTable('hotels')
    .dropTable('flights')
    .dropTable('users');
};

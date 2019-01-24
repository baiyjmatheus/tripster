
exports.up = function(knex, Promise) {
  return createUsersTable()
  	.then(createFlightsTable)
  	.then(createHotelsTable)
  	.then(createTripsTable)
  	.then(createEventsTable)
  	.then(createAttractionsTable)
  	.then(createUsersTripsTable);

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
    });
  }

  function createHotelsTable() {
    return knex.schema.createTable('hotels', table => {
      table.increments();
      table.string('name');
      table.float('latt');
      table.float('long');
      table.float('rating');
      table.string('address');
      table.string('photo_reference');
    });
  }

  function createTripsTable() {
    return knex.schema.createTable('trips', table => {
      table.increments();
      table.string('name');
      table.string('origin');
      table.string('destination');
      table.date('start_date');
      table.date('end_date');
      table.integer('flight_id').references('id').inTable('flights');
      table.integer('hotel_id').references('id').inTable('hotels');
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
      table.integer('trip_id').references('id').inTable('trips');
    });
  }

  function createAttractionsTable() {
    return knex.schema.createTable('attractions', table => {
      table.increments();
      table.string('name');
      table.float('latt');
      table.float('long');
      table.float('rating');
      table.integer('trip_id').references('id').inTable('trips');
    });
  }

  function createUsersTripsTable() {
    return knex.schema.createTable('users_trips', table => {
      table.integer('user_id').references('id').inTable('users');
      table.integer('trip_id').references('id').inTable('trips');
    })
  }
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users_trips')
    .dropTable('attractions')
    .dropTable('events')
    .dropTable('trips')
    .dropTable('hotels')
    .dropTable('flights')
    .dropTable('users');
};

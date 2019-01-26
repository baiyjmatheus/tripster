
exports.up = function(knex, Promise) {
  return updateTripsTable()
  	.then(updateFlightsTable)
  	.then(updateHotelsTable)


  function updateTripsTable() {
  	return knex.schema.table('trips', table => {
  		table.dropColumn('flight_id');
  		table.dropColumn('hotel_id');
  	})
  }

  function updateFlightsTable() {
  	return knex.schema.table('flights', table => {
  		table.integer('trip_id').references('id').inTable('trips');
  	})
  }

  function updateHotelsTable() {
    return knex.schema.table('hotels', table => {
      table.integer('trip_id').references('id').inTable('trips')
    })
  }
};

exports.down = function(knex, Promise) {
  return revertHotelsTable()
    .then(revertFlightsTable)
    .then(revertTripsTable)

  function revertHotelsTable() {
    return knex.schema.table('hotels', table => {
      table.dropColumn('trip_id')
    })
  }

  function revertFlightsTable() {
    return knex.schema.table('flights', table => {
      table.dropColumn('trip_id')
    }) 
  }

  function revertTripsTable() {
    return knex.schema.table('trips', table => {
      table.integer('flight_id').references('id').inTable('flights')
      table.integer('hotel_id').references('id').inTable('hotels')
    })
  }
};

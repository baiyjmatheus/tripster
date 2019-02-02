exports.up = function(knex, Promise) {
  return addEventsColumns();

  function addEventsColumns() {
  	return knex.schema.table('events', table => {
  		table.float('latt')
  		table.float('long')
  	})
  }
};

exports.down = function(knex, Promise) {
  return revertEventsColumns();

  function revertEventsColumns() {
  	return knex.schema.table('events', table => {
  		table.dropColumn('latt')
  		table.dropColumn('long')
  	})
  }
};

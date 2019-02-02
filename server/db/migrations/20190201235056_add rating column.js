exports.up = function(knex, Promise) {
  return addEventsColumns();

  function addEventsColumns() {
  	return knex.schema.table('events', table => {
		table.float('rating')
  	})
  }
};

exports.down = function(knex, Promise) {
  return revertEventsColumn();
  
  function revertEventsColumn() {
  	return knex.schema.table('events', table => {
  		table.dropColumn('rating')
  	})
  }
};

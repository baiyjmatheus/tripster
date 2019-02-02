exports.up = function(knex, Promise) {
  return addHotelsColumns();

  function addHotelsColumns() {
  	return knex.schema.table('hotels', table => {
		table.float('price')
  	})
  }
};

exports.down = function(knex, Promise) {
  return revertHotelsColumn();
  
  function revertHotelsColumn() {
  	return knex.schema.table('hotels', table => {
  		table.dropColumn('price')
  	})
  }
};

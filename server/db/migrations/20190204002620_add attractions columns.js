exports.up = function(knex, Promise) {
  return addAttractionsColumns();

  function addAttractionsColumns() {
  	return knex.schema.table('attractions', table => {
		  table.float('price')
  	})
  }
};

exports.down = function(knex, Promise) {
  return revertAttractionsColumn();
  
  function revertAttractionsColumn() {
  	return knex.schema.table('attractions', table => {
  		table.dropColumn('price')
  	})
  }
};
App.config(function($provide) {

	$provide.factory('Database', function() {
		var schema = {
		  stores: []
		};

		schema.stores.push({
			name: 'PersonalRecord',
			autoIncrement: true
		});

		schema.stores.push({
			name: 'Maxes',
			autoIncrement: true
		});

		var databaseInstance = new ydn.db.Storage('ajpaz531', schema);
		return databaseInstance;
	});
}).config(function($provide) {
   /* $provide.factory('Database', function() {*/
		//var schema = {
		  //stores: []
		//};

		//schema.stores.push({
			//name: 'PersonalRecord',
			//autoIncrement: true
		//});

		//schema.stores.push({
			//name: 'Maxes',
			//autoIncrement: true
		//});

		//var databaseInstance = new ydn.db.Storage('ajpaz531', schema);
		//return databaseInstance;
	/*});*/
});

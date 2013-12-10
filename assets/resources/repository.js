App.config(function($provide) {

	$provide.factory('MaxesValidator', function() {
		function MaxesValidator() {
			this.validate = function(entity) {
			};
		}

		var instance = new MaxesValidator();
		return instance;
	});

	$provide.factory('Database', function() {
		var schema = {
		  stores: []
		};

		schema.stores.push({
			name: 'PersonalRecord',
			keyPath: 'date',
			  Sync: {
				format: 's3',
				transport: gapi.client
			  }
		});

		schema.stores.push({
			name: 'Maxes',
			keyPath: 'date',
			indexes: [
				{
					keyPath: 'press',
					type: 'INTEGER'
				},
				{
					keyPath: 'date',
					unique: true,
					type: 'DATE'
				},  
			]
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

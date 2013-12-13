App.config(function($provide) {

	$provide.factory('DatastoreSync', function($http, Database) {
		function DatastoreSync() {
			this.sync = function() {
				Database.values('Maxes').done(function(records) {
					var postData = {
						list: {
							"Maxes": records,
						}
					};
					$http.post('/rest/Maxes', postData)
				});
			};
		}

		var instance = new DatastoreSync();
		return instance;
	});

	$provide.factory('Schema', function() {
	});

	$provide.factory('Database', function(Schema) {
		var schema = {
		  stores: []
		};

		function Derp() {
		}
		Derp.prototype.request = function(args) {
			console.info('apaz(database)', arguments);
		};

		schema.stores.push({
			name: 'PersonalRecord',
			keyPath: 'date',
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

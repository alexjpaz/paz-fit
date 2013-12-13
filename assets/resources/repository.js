App.config(function($provide) {

	$provide.factory('DatastoreSync', function($http, Database, Schema) {
		function DatastoreSync() {
			var stores = ['PersonalRecord','Maxes'];
			
			this.refresh = function() {
				angular.forEach(stores, function(store) {
					var postUrl = '/rest/'+store;
					var postData = {};
					postData.list = {};
					postData[store] = records;

					$http.get(postUrl, postData).success(function(data) {
						Database.put(store, data.list[store]); 
					});
				});
			};

			this.sync = function() {
				angular.forEach(stores, this.__iter_stores, this);
			};

			this.__iter_stores = function(store) {
				Database.values(store).done(function(records) {
					var postUrl = '/rest/'+store+'?type=full';
					var postData = {};
					postData.list = {};
					postData[store] = records;

					$http.post(postUrl, postData).success(function(data) {

					});
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

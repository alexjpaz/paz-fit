App.config(function($provide) {

	$provide.factory('DatastoreSync', function($http, Database, Schema) {
		function DatastoreSync() {
			var stores = Schema.stores;
			
			this.refresh = function() {
				angular.forEach(stores, function(store) {
					//TODO gather etags from metadata database
					console.log(store);
					var config = {
						method: 'GET',
						url: '/rest/PersonalRecord',
						headers: {
							"If-None-Match": "*",
						}
					};

					var promise = $http(config);
					
					promise.success(function(data) {
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
		instance.refresh();
		return instance;
	});

	$provide.factory('Schema', function() {
		function Schema() {
			this.stores = [];
		}

		function SchemaBuilder() {
		}

		var instance = new Schema();

		instance.stores.push({
			name: '_metadata',
			indexes: [
				{keyPath: 'store'},
				{keyPath: 'modified'},
			]
		});

		instance.stores.push({
			name: 'PersonalRecord',
			keyPath: 'date',
		});

		instance.stores.push({
			name: 'Max',
			keyPath: 'date',
			indexes: [
				{keyPath: 'press',type: 'INTEGER'},
				{keyPath: 'deadlift',type: 'INTEGER'},
				{keyPath: 'bench',type: 'INTEGER'},
				{keyPath: 'squat',type: 'INTEGER'},
				{
					keyPath: 'date',
					unique: true,
					type: 'DATE'
				},  
			]
		});

		return instance;
	});

	$provide.factory('Database', function(Schema) {
		var databaseInstance = new ydn.db.Storage('ajpaz531', Schema);
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

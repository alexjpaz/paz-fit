angular.module('app').config(function($provide) {

	$provide.factory('DatastoreSync', function($http, Database, SchemaManager) {
		function DatastoreSync() {
			this.refresh = function() {
				angular.forEach(SchemaManager.getPublicStores(), function(store) {
					//TODO gather etags from metadata database
					var config = {
						method: 'GET',
						url: '/rest/'+store.name,
						headers: {
							"If-None-Match": "*",
						}
					};

					var promise = $http(config);
					
					promise.success(function(data) {
						var putData = data.list;
						Database.put(store, putData); 
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

	$provide.provider('SchemaManager', function SchemaManagerProvider() {
		function Schema() {
			this.stores = [];
		}

		this.schema = new Schema();
		this.publicStores = [];

		this.addStore = function(store) {
			this.schema.stores.push(store);
			if(!(/^_/).test(store.name)) {
				this.publicStores.push(store);
			}
		};

		this.getPublicStores = function() {
			return this.publicStores;
		};

		this.$get = function() {
			return this;
		};
	});

	$provide.factory('Database', function(SchemaManager) {
		var databaseInstance = new ydn.db.Storage('ajpaz531', SchemaManager.schema);
		return databaseInstance;
	});
})

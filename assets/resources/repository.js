angular.module('app').config(function($provide) {

	$provide.factory('Database', function(SchemaManager) {
		var databaseInstance = new ydn.db.Storage('ajpaz531', SchemaManager.schema);
		return databaseInstance;
	});

	$provide.factory('DatastoreSync', function($http, $rootScope, $q, Database, SchemaManager) {
		function DatastoreSync() {

			this.pull = function() {
				var deferred = $q.defer();

				this.iterateStores(function(store) {
					//TODO gather etags from metadata database
					var config = {
						method: 'GET',
						url: '/rest/'+store.name,
						headers: {
							"If-None-Match": "*",
						}
					};

					var cb = {
						success: function(response) {
							var putData = response.data.list[store.name];
							Database.put(store, putData); 
						},
						failure: function(data) {
							console.error(arguments);
						}
					};

					var promise = $http(config);
					var chainedPromise =  promise.then(cb.success, cb.failure);
					return chainedPromise;
				});

				return deferred.promise;
			};

			this.push = function() {
				var promises = [];

				this.iterateStores(function(store) {
					var deffered = $q.defer();
					promises.push(deffered.promise);

					var dbPromise = Database.values(store.name);

					var dbDeffered = $q.defer();

					dbPromise.done(function(records) {
						$rootScope.$apply(function() {
							dbDeffered.resolve(records);
						});
					});

					dbDeffered.promise.then(function(records) {
						var config = {
							method: 'POST',
							url: '/rest/'+store.name,
							data: {},
							headers: {
								"ETag": "*",
							}
						};
						var postData = {};
						config.data.list = {};
						config.data.list[store.name] = records;

						var cb = {
							success: function(response) {
								console.log('post success');
								deffered.resolve();
							},
							failure: function(data) {
								deffered.resolve();
							}
						};

						var promise = $http(config);
						promise.then(cb.success, cb.failure);
					});
				});

				return $q.all(promises); 
			};

			this.iterateStores = function(callback) {

				var stores = SchemaManager.getPublicStores();
				angular.forEach(stores, callback);
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



})

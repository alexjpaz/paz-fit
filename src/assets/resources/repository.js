/*
 * Module: helper
 *
 */
angular.module('resources',[])
.config(function(){})
angular.module('resources').config(function($provide) {

	$provide.factory('DaoFactory', function($http, $q) {
		function Dao(storeName) {
			this.storeName = storeName
			this.httpConfigDefaults = {
				url: '/rest/'+storeName,
			};
		}

		Dao.prototype.fetchList = function() {
		};

		Dao.prototype._http = function(httpConfig) {
			var resultHttpConfig = {};
			angular.extend(resultHttpConfig, this.httpConfigDefaults, httpConfig);
			var httpPromise = $http(resultHttpConfig);

			return httpPromise;
		};

		Dao.prototype.findSingle = function(key) {
		};

		Dao.prototype.find = function(params) {
			var deffered = $q.defer();
			var httpConfig = {
				method: 'GET',
				params: params
			};

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				var records = response.data.list[_this.storeName];
				if(angular.isUndefined(records)) {
					records = [];
				}
				deffered.resolve(records);
			});

			return deffered.promise;
		};

		Dao.prototype.fetchFromDateRange = function(beginDate, endDate) {
			var params = {
				'fge_date': beginDate,
				'fle_date': endDate,
			};

			return this.find(params);
		};

		Dao.prototype.save = function(data) {
			var httpConfig = {
				method: 'POST',
				data: {}
			};

			httpConfig.data.list = {};
			var dataRef = httpConfig.data.list[this.storeName] = [];

			if(angular.isArray(data)) {
				dataRef.concat(data);
			} else {
				dataRef.push(data);
			}

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				deffered.resolve(response);
			});

			return deffered.promise;
		};

		Dao.prototype.remove = function(entity) {
			var deffered = $q.defer();
			var httpConfig = {
				url: '/rest/'+this.storeName+'/'+entity.key,
				method: 'DELETE',
			};

			var httpPromise = this._http(httpConfig);

			var deffered = $q.defer();

			var _this = this;
			httpPromise.then(function(response) {
				deffered.resolve(response);
			});

			return deffered.promise;

		};

		function DaoFactory(storeName, extendo) {
			var dao = new Dao(storeName);
			return dao; 
		}

		return DaoFactory;
	});

	$provide.factory('MaxesDao', function($http, $q, DaoFactory, Database, moment) {
		var MaxesDao = DaoFactory('Maxes');
		MaxesDao.findLatest = function() {
			var params = {
				"flt_date": moment().format('YYYY-MM-DD'),
				"ordering": "-date",
				"page_size": 1
			};

			return this.find(params);
		};
		return MaxesDao;
	});

	$provide.factory('PersonalRecordDao', function($http, $q, Database, DaoFactory) {
		var PersonalRecordDao = DaoFactory('PersonalRecord');
		PersonalRecordDao.findLatest = function(fromDate) {
			var date = fromDate || moment().format('YYYY-MM-DD');
			var params = {
				"flt_date": date,
				"ordering": "-date",
				"page_size": 1
			};
			return this.find(params);
		};
		PersonalRecordDao.findPrevious = function(date, lift) {
			var params = {
				"flt_date": date,
				"feq_lift": lift,
				"ordering": "-date",
				"page_size": 1
			};

			return this.find(params);
		};
		PersonalRecordDao.findLastAttempt = function(lift, weight, date) {
			var params = {
				"flt_date": date || moment().format('YYYY-MM-DD'),
				"feq_lift": lift,
				"feq_weight": weight,
				"ordering": "-date",
				"page_size": 1
			};

			console.debug(params)



			return this.find(params);
		};
		return PersonalRecordDao;
	});

	$provide.factory('Database', function(SchemaManager, $rootScope) {
		var databaseInstance = new ydn.db.Storage('ajpaz531', SchemaManager.schema);

		angular.forEach(['error','updated','created','ready','fail'], function(type) {
			databaseInstance.addEventListener(type, function(event) {
				var name = 'Database'+(type.charAt(0).toUpperCase() + type.slice(1));
				$rootScope.$broadcast(name, event.name, event);
			});
		});

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
						//headers: {
						//	"If-None-Match": "*",
						//}
					};

					var cb = {
						success: function(response) {
							if(angular.isUndefined(response.data.list)) {
								throw "Malformed response. Expected one list element";
							}

							var elements = response.data.list[store.name];

							if(angular.isUndefined(elements)) {
								console.debug("No new elements to add");
							} else {
								Database.put(store.name, elements).then(function() { 
									$rootScope.$apply();
								});
							}
						},
						failure: function(error) {
							if(error.status == 304) {
								console.debug('Not Modified recieved for '+store.name);
							} else {
								throw "Erorr during Datastore pull" + error;
							}
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
								console.debug('Successfully pushed datastore', store.name);
								deffered.resolve();
							},
							failure: function(data) {
								console.error('Could not push datastore',store.name);
								throw "Datastore Sync Error "+store.name;
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
			store.dispatchEvents = 'canAnythingGoHere';
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

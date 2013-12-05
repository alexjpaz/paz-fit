App.config(function($provide) {
	$provide.factory('Storage', function() {
		function Storage() {
			this.localStorage = null;
			try {
				var supported = 'localStorage' in window && window['localStorage'] !== null;
				this.localStorage = window.localStorage;
			} catch (e) {
				console.warn('localStorage is not available!');
				return false;
			}

			this.remove = function(key) {
				delete this.localStorage[key];
			};

			this.set = function(key, data) {
				if(!angular.isUndefined(data)) {
					this.localStorage[key] = JSON.stringify(data);
				}
			};

			this.get = function(key) {
				var ent = this.localStorage[key];
				if(!angular.isUndefined(ent)) {
					ent = JSON.parse(ent);
				}

				return ent;
			};
		}

		var instance = new Storage();

		return instance;
	});


	$provide.factory('RestRepository', function(Storage, Resource, $q, $rootScope) {
		function RestRepository() {

			function RepositoryResponse() {
			}

			this.refreshAll = function() {
				var resources=['Max','PersonalRecord'];
				angular.foreach(resources, function(resource) {
					this.refresh(resource);
				},this);
			};

			this.refresh = function(entityName) {
				Storage.set(entityName, undefined);
				var promise = this.fetch(entityName).then(function(entity) {
					Storage.set(entityName,entity); 
				});
				return promise;
			};

			this.fetch = function(entityName) {
				var getParams = {
					model: entityName
				};
				return Resource.get(getParams).$promise;
			};

			this.commit = function() {
				throw "Not yet implemented";
			};

			this.find = function(entityName) {
				var deferred = $q.defer();
				var response = new RepositoryResponse();

				var entity = Storage.get(entityName);

				if(angular.isUndefined(entity)) {
					this.refresh(entityName).then(function(entity) {
						deferred.resolve(entity);
					});
				} else {
					deferred.resolve(entity);
				}

				return deferred.promise;
			};

			this.save = function(entityName, entityData) {
				//TODO some validation
				return Storage.set(entityName, entityData);
			};
		}
		var instance = new RestRepository();
		return instance;
	});

	$provide.provider('RepositoryFactory', function() {
		function RepositoryFactory() {
			this.build = function(repositoryName) {

			};
		}

		this.$get = function() {

		};
	});
});

App.config(function($provide) {
	$provide.factory('Storage', function() {
		function Storage() {
			this.localStorage = null;
			try {
				this.localStorage = 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
				console.warn('localStorage is not available!');
				return false;
			}

			this.get = function(key) {
			};

			this.sync = function() {
			};
		}

		var instance = new Storage();

		return instance;
	});


	$provide.factory('GenericRepository', function(Storage) {
		function GenericRepository() {
		}

		GenericRepository.prototype.find = function(query) {

		};

		GenericRepository.prototype.findSingle = function(query, entity) {

		};

		GenericRepository.prototype.save = function(entity) {
		};

		return GenericRepository;
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

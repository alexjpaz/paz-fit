App.config(function($provide) {
	$provide.factory('GenericRepository', function() {
		function GenericRepository() {
		}

		GenericRepository.prototype.find = function(query) {

		};

		GenericRepository.prototype.findSingle = function(query) {

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

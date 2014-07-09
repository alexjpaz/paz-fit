angular.module('app').config(function(ScreenProvider) {
	ScreenProvider.register('screen-watcher-detail', {
			controller: function($scope, Watcher, $location, $routeParams, BioBrokerEndpoint) {
				var getParams = {
					name: $routeParams.name
				};

				Watcher.get(getParams, function(watcher) {
					$scope.w = watcher;
				});

				BioBrokerEndpoint.query(function(endpoints) {
					$scope.endpoints = endpoints;
				});

				$scope.save = function(w) {
					Watcher.save(w, function(w) {
						$scope.watchers = w;
						$location.path('/watcher');
					});
				};

				$scope.start = function() {
					Watcher.get({method:'START', name:'_agent'});
				};

				$scope.stop = function() {
					Watcher.get({method:'STOP', name:'_agent'});
				};
			}
	});
});

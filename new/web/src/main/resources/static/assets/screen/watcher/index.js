angular.module('app').config(function(ScreenProvider) {
	ScreenProvider.register('screen-watcher-index', {
			controller: function($scope, Watcher, $timeout) {
				var tickInterval = 1000;
				var timerId = null;

				function updateWatchers() {
					Watcher.query(function(watchers) {
						$scope.watchers = watchers;
					});

				}

				function tick() {
					updateWatchers();
					timerId = $timeout(tick, tickInterval);
				}

				tick('START');

				$scope.refresh = function(w) {
					Watcher.save([w]);
				};

				$scope.$on('$routeChangeStart', function() {
					$timeout.cancel(timerId);
				});
			}
	});
});

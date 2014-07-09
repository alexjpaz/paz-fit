angular.module('app').config(function(ScreenProvider) {
	ScreenProvider.register('screen-dashboard', {
			controller: function($scope, Event, $upload, $timeout) {
				var timerId = null;

				$scope.showDetails = function(eId) {
					if($scope.showDetailsId === eId) {
						$scope.showDetailsId = null;
					} else {
						$scope.showDetailsId = eId;
					}
				};

				function updateEvents() {
					Event.query(function(events) {
						$scope.events = events;
						timerId = $timeout(updateEvents, 1000);
					});
				}

				updateEvents();

				$scope.$on('$routeChangeStart', function() {
					$timeout.cancel(timerId);
				});
			}
	});
});

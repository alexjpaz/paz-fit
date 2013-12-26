angular.module('app').lazy.ScreenFactory('screen-profile-maxes-edit', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 

	$scope.getMaxes  = function() {
		var promise = Database.get('Maxes', $scope.date)
		
		promise.done(function(record) {
			if(angular.isDefined(record)) {
				$scope.record = record;
			} else {
				$scope.record = {
					date: $scope.date
				};
			}
			$scope.$apply();
		});
	};

	$scope.saveChanges = function() {
		var promise = Database.put('Maxes', $scope.record).done(function() {
			DatastoreSync.push();
		});
	};

	$scope.getMaxes();

	$scope.$on('MaxForm', function() {
		console.debug(arguments);
	});
});

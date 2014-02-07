angular.module('app').lazy.ScreenFactory('screen-profile-maxes-edit', function($scope, $injector, $routeParams, $location, Database, DatastoreSync) {
	var MaxesDao = $injector.get('MaxesDao');

	$scope.date = $routeParams.date; 

	$scope.getMaxes  = function() {
		var params = {"feq_date": $scope.date};
		MaxesDao.find(params).then(function(records) {
			var Maxes = records[0];

			if(angular.isDefined(Maxes)) {
				$scope.record = Maxes;
			} else {
				$scope.record = {
					date: $scope.date
				};
			}
		});
	};

	$scope.saveChanges = function() {
		var promise = MaxesDao.save($scope.record);
		$scope.saveStatus = null;

		$scope.saveStatus = 'saving';

		promise.then(function() {
			$scope.saveStatus = 'saved';
		}, function() {
			$scope.saveStatus = 'error';
		});
	};

	$scope.getMaxes();

});

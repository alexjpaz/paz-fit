angular.module('app').lazy.ScreenFactory('screen-profile-maxes-edit', function($scope, $injector, $routeParams, Database, DatastoreSync) {
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
		MaxesDao.save($scope.record).then();
	};

	$scope.getMaxes();

});

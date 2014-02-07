angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-list', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location) {
	$scope.date = $routeParams.date || moment().format('YYYY-MM-DD'); 
	$scope.isNew = $routeParams.isNew;

	$scope.dto = {
		date: $scope.date,
		reps: 5
	};

	$scope.params = {}

	angular.forEach($location.search(), function(value, key) {
		$scope.params[key] = value;
	});

	$scope.getPersonalRecords  = function(params) {
		PersonalRecordDao.find(params).then(function(records) {
			$scope.records = records;
		});
	};

	$scope.$watch('params', $scope.getPersonalRecords, true);
	$scope.$watch('params', function(params) {
		angular.forEach(params, function(value, key) {
			$location.search(key, value);
		});
	}, true);
});

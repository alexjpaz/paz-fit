angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-list', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator) {
	$scope.date = $routeParams.date || moment().format('YYYY-MM-DD'); 
	$scope.isNew = $routeParams.isNew;

	$scope.dto = {
		date: $scope.date,
		reps: 5
	};

	$scope.params = {}

	$scope.getPersonalRecords  = function(params) {
		console.debug('params',params);
		PersonalRecordDao.find(params).then(function(records) {
			console.debug('records', records);
			$scope.records = records;
		});
	};

	$scope.$watch('params', $scope.getPersonalRecords, true);
});

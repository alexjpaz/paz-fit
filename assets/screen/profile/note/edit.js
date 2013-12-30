angular.module('app').lazy.ScreenFactory('screen-profile-note-edit', function($scope, $routeParams, $injector) {
	var PersonalRecordDao = $injector.get('PersonalRecordDao');
	var MaxesDao = $injector.get('MaxesDao');

	$scope.date = $routeParams.date; 

	$scope.mdl = {};

	var params = {"feq_date": $scope.date};
	PersonalRecordDao.find(params).then(function(records) {
		$scope.mdl.PersonalRecord = records[0];
	});
	
	MaxesDao.find(params).then(function(records) {
		$scope.mdl.Maxes = records[0];
	});
});

angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-edit', function($scope, $routeParams, Database) {
	$scope.date = $routeParams.date; 

	Database.get('PersonalRecord', $scope.date).done(function(record) {
		$scope.record = record;
		$scope.$apply();
	});
});

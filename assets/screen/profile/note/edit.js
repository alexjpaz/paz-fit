angular.module('app').lazy.ScreenFactory('screen-profile-note-edit', function($scope, $routeParams, $injector, FiveThreeOneCalculator) {
	var PersonalRecordDao = $injector.get('PersonalRecordDao');
	var MaxesDao = $injector.get('MaxesDao');

	$scope.date = $routeParams.date; 

	$scope.mdl = {};

	var params = {"feq_date": $scope.date,"ordering": '-'+$scope.date};
	PersonalRecordDao.find(params).then(function(records) {
		$scope.mdl.PersonalRecord = records[0];
	});
	
	params = {"fle_date": $scope.date,"ordering": '-'+$scope.date};
	MaxesDao.find(params).then(function(records) {
		$scope.mdl.Maxes = records[0];
	});

	$scope.$watch('mdl', function() {
		if(angular.isUndefined($scope.mdl.PersonalRecord)) return;
		if(angular.isUndefined($scope.mdl.Maxes)) return;

		var liftMax = $scope.mdl.Maxes[$scope.mdl.PersonalRecord.lift];
		var liftWeight = $scope.mdl.PersonalRecord.weight;
		var liftReps = $scope.mdl.PersonalRecord.reps;

		$scope.reptarget = FiveThreeOneCalculator.repgoal(liftMax, liftWeight);
		$scope.estMax = FiveThreeOneCalculator.max(liftWeight, liftReps);
	}, true);
});

angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-edit', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator) {
	$scope.date = $routeParams.date || moment().format('YYYY-MM-DD'); 
	$scope.isNew = $routeParams.isNew;

	$scope.dto = {
		date: $scope.date,
		reps: 5
	};

	$scope.getPersonalRecord  = function() {
		var params = {"feq_date": $scope.date};
		PersonalRecordDao.find(params).then(function(records) {
			var PersonalRecord = records[0];

			if(angular.isDefined(PersonalRecord)) {
				$scope.dto = PersonalRecord;
			} else {
				$scope.record = {
					date: $scope.date
				};
			}
		});
	};

	$scope.saveChanges = function() {
		var promise = PersonalRecordDao.save($scope.dto);

		$scope.saveStatus = null;

		$scope.saveStatus = 'saving';

		promise.then(function() {
			$scope.saveStatus = 'saved';
		}, function() {
			$scope.saveStatus = 'error';
		});

	};

	if(!$scope.isNew) {
		$scope.getPersonalRecord();
	}
});

angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-personal-record-edit', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $window, $location) {
		$scope.key = $routeParams.key;
		$scope.isNew = $routeParams.isNew;
		$scope.$loading = true;
		var r = $scope.r = $routeParams;

		$scope.dto = {
			date: $scope.date,
			reps: 5
		};

		$scope.getPersonalRecord  = function() {
			var params = {"feq_key": $scope.key};
			PersonalRecordDao.find(params).then(function(records) {
				$scope.$loading = false;
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

		$scope.$watch('dto', function(dto) {
			$scope.estMax = FiveThreeOneCalculator.max(dto.weight, dto.reps);
		}, true);

		$scope.saveChanges = function() {
			if(angular.isUndefined($scope.dto.key)) {
				$scope.dto.date = $scope.r.date;
			}

			var promise = PersonalRecordDao.save($scope.dto);

			$scope.saveStatus = null;

			$scope.saveStatus = 'saving';

			promise.then(function() {
				$scope.saveStatus = 'saved';
			}, function() {
				$scope.saveStatus = 'error';
			});

		};

		$scope.remove = function() {
			var remove = $window.confirm('Are you sure you want to remove this Entity?');
			if(!remove) return;

			var promise = PersonalRecordDao.remove($scope.dto);

			promise.then(function() {
				$location.path('/');
			}, function() {
				$window.alert('error deleting');
			});
		};

		if(angular.isDefined($scope.key)) {
			$scope.getPersonalRecord();
		}
	});

});

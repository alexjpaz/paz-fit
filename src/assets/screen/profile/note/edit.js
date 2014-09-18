angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-note-edit', function($scope, $routeParams, $injector, FiveThreeOneCalculator) {
		$scope.loaded = {};

		var PersonalRecordDao = $injector.get('PersonalRecordDao');
		var MaxesDao = $injector.get('MaxesDao');

		$scope.date = $routeParams.date; 

		$scope.mdl = {};

		$scope.calc = {};

		var params = {"feq_date": $scope.date,"ordering": '-date'};
		PersonalRecordDao.find(params).then(function(records) {
			$scope.mdl.PersonalRecord = records[0];
			$scope.loaded.pr = true;
		});

		params = {"fle_date": $scope.date,"ordering": '-date'};
		MaxesDao.find(params).then(function(records) {
			$scope.mdl.Maxes = records[0];
			$scope.loaded.maxes = true;
		});

		$scope.FiveThreeOneCalculator = FiveThreeOneCalculator;

		$scope.classCompare = function(actual, target) {
			var clazz = "warning";

			if(actual > target) {
				clazz = "success";
			}

			if(actual < target) {
				clazz = "danger";
			}

			return clazz;
		};

		$scope.$watch('mdl', function() {
			if(angular.isUndefined($scope.mdl.PersonalRecord)) return;
			if(angular.isUndefined($scope.mdl.Maxes)) return;

			var liftMax = $scope.mdl.Maxes[$scope.mdl.PersonalRecord.lift];
			var liftWeight = $scope.mdl.PersonalRecord.weight;
			var liftReps = $scope.mdl.PersonalRecord.reps;

			var calc = {};
			calc.liftMax =  liftMax;
			calc.liftWeight = liftWeight;
			calc.liftReps = liftReps;
			calc.reptarget = FiveThreeOneCalculator.repgoal(liftMax, liftWeight);
			calc.actualEstMax = FiveThreeOneCalculator.max(liftWeight, liftReps);
			calc.targetEstMax = FiveThreeOneCalculator.max(liftWeight, calc.reptarget);

			$scope.calc = calc;

		}, true);
	});

});

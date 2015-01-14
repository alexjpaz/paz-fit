angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-personal-record-edit', function($scope, $routeParams, PersonalRecordDao, MaxesDao, moment, FiveThreeOneCalculator, $window, $location, $q) {
		$scope.key = $routeParams.key;
		$scope.isNew = $routeParams.isNew;
		var r = $scope.r = $routeParams;

		$scope.dto = {
			date: $scope.date,
			reps: 5
		};

		var progressionMap =  {
			0.85: 0.90,
			0.90: 0.95,
			0.95: 0.85,
			0.6: 0.85
		};

		var liftProgressionChain = ['press','deadlift','bench','squat'];

		var previousPersonalRecord = {};
		var latestPersonalRecord = {};
		
		var calculateValues = function() {

			if(!$scope.key && latestPersonalRecord && !$scope.prEditForm.lift) {
				var previousLiftIndex = liftProgressionChain.indexOf(latestPersonalRecord.lift);	

				var newLift = liftProgressionChain[(previousLiftIndex + 1) % liftProgressionChain.length];
				$scope.dto.lift = newLift;
			}

			if(!$scope.key && !$scope.prEditForm.weight.$dirty && !!$scope.effectiveMax && previousPersonalRecord) {

				var pct = previousPersonalRecord.weight / $scope.effectiveMax[$scope.dto.lift];


				var newPct = progressionMap[pct] || pct;

				$scope.dto.weight = $scope.effectiveMax[$scope.dto.lift] * newPct;
			}

			if(!!$scope.dto.weight && !!$scope.dto.reps) {
				$scope.estMax = FiveThreeOneCalculator.max($scope.dto.weight, $scope.dto.reps);
			}

			if(!!$scope.effectiveMax && !!$scope.dto.weight && !!$scope.dto.lift) {
				$scope.targetReps = FiveThreeOneCalculator.repgoal($scope.effectiveMax[$scope.dto.lift], $scope.dto.weight);

				if(!$scope.key && !$scope.prEditForm.reps.$dirty) {
					$scope.dto.reps = $scope.targetReps;
				}
			}
		};

		var getPreviousPersonalRecord = function(date, lift) {
			var promises = {};
			
			promises.previousRecord = PersonalRecordDao.findPrevious(date, lift).then(function(records) {
				previousPersonalRecord = records[0];
			});

			promises.latestRecord = PersonalRecordDao.findLatest().then(function(records) {
				latestPersonalRecord = records[0];
			});

			$q.all(promises).then(function() {
				calculateValues();
			});
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


				getPreviousPersonalRecord(PersonalRecord.date, PersonalRecord.lift);
			});
		};

	
		$scope.getEffectiveMax = function() {
			MaxesDao.findLatest().then(function(records) {
				$scope.effectiveMax = records[0];

			});
		};

		$scope.$watch('dto.reps', function(dto) {
			if(angular.isUndefined(dto)) return;
			calculateValues();
		}, true);

		$scope.$watch('dto.weight', function(dto) {
			if(angular.isUndefined(dto)) return;
			calculateValues();
		}, true);

		$scope.$watch('dto.lift', function(lift) {
			if(angular.isUndefined(lift)) return;
			calculateValues();
			getPreviousPersonalRecord($scope.dto.date, lift);
		});

		$scope.saveChanges = function() {
			if(angular.isUndefined($scope.dto.key)) {
				$scope.dto.date = $scope.r.date;
			}

			var promise = PersonalRecordDao.save($scope.dto);

			$scope.saveStatus = 'saving';

			promise.then(function(rsp) {
				var key = rsp.data;
				$scope.$loading = true;
				$location.search('key', key);
				$scope.key = key;
				$scope.getPersonalRecord();
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

		(function init() {
			if(angular.isDefined($scope.key)) {
				$scope.$loading = true;
				$scope.getPersonalRecord();
			} else {
				var date = moment(r.date,'YYYY-MM-DD');

				if(!date.isValid()) {
					date = moment();
				}

				formattedDate = date.format('YYYY-MM-DD');

				$scope.dto.date = formattedDate;
				$scope.date = formattedDate;
				getPreviousPersonalRecord();
			}



			$scope.getEffectiveMax();
		})();

	});

});

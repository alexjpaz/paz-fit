angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-profile-personal-record-edit', function($scope, $routeParams, PersonalRecordDao, MaxesDao, moment, FiveThreeOneCalculator, $window, $location, $q, LiftProgressionChain) {
		var isNew = (!!$routeParams.key);
		var key = $scope.key = $routeParams.key;
		$scope.isNew = $routeParams.isNew;
		var r = $scope.r = $routeParams;
		$scope.loading = {};

		$scope.dto = {
			date: $scope.date,
			reps: 5,
		};

		var getPreviousPersonalRecord = function() {
			var deffered = $q.defer();

			var date = $scope.date;

			var data = {};

			PersonalRecordDao.findLatest(date).then(function(records) {
				data.latest = records[0];

				var nextLift = LiftProgressionChain.next(data.latest.lift);

				PersonalRecordDao.findPrevious(date, nextLift).then(function(records) {
					data.previous = records[0];
					deffered.resolve(data);
				});
			});

			return deffered.promise;
		};
	
		var getExistingPersonalRecord = function() {
			if(!key) return false;

			$scope.loading.existingPersonalRecord = true;
			var params = {"feq_key": $scope.key};
			PersonalRecordDao.find(params).then(function(records) {
				$scope.loading.existingPersonalRecord = false;
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

		var generateNewPersonalRecordDto = function() {
			var date = moment(r.date,'YYYY-MM-DD');

			if(!date.isValid()) {
				date = moment();
			}

			formattedDate = date.format('YYYY-MM-DD');

			$scope.dto.date = formattedDate;
			$scope.date = formattedDate;

			getEffectiveMax();
		};

		var getEffectiveMax = function() {
			MaxesDao.findLatest().then(function(records) {
				$scope.effectiveMax = records[0];

			});
		};

		var progressionMap =  {
			0.85: 0.90,
			0.90: 0.95,
			0.95: 0.85,
			0.6: 0.85
		};

		var PercentageProgressionMap = (function () {
			var steps = [0.85,0.9,0.95];

			self = {};
			self.next = function(currentStep) {
				var step = null;
				for(var i=0;i<steps.length;i++) {
					if(currentStep >= steps[i]) {
						step = steps[(i+1)%steps.length];
					}
				}
				return step;
			};

			return self;
		})();

		var liftProgressionChain = ['press','deadlift','bench','squat'];

		var previousPersonalRecord = {};
		var latestPersonalRecord = {};

		var CalculatedValues = {
			lift: function(data) {
				if(!$scope.key && data.latest.lift && !$scope.prEditForm.lift) {
					var nextLift = LiftProgressionChain.next(data.latest.lift);
					$scope.dto.lift = nextLift;
				}
			},
			weight: function(data) {
				if(!$scope.key && !$scope.prEditForm.weight.$dirty && !!$scope.effectiveMax && data.previous) {
					
					var pct = data.previous.weight / $scope.effectiveMax[$scope.dto.lift];

					var nextPct = PercentageProgressionMap.next(pct);

					$scope.dto.weight = $scope.effectiveMax[$scope.dto.lift] * nextPct;
				}
			},
			reps: function(data) {
				if(!$scope.key && !$scope.prEditForm.reps.$dirty) {
					$scope.dto.reps = FiveThreeOneCalculator.repgoal($scope.effectiveMax[$scope.dto.lift], $scope.dto.weight);
				}
			},
			estimatedMax: function(data) {
				if(!!$scope.dto.weight && !!$scope.dto.reps) {
					$scope.estMax = FiveThreeOneCalculator.max($scope.dto.weight, $scope.dto.reps);
				}
			},
			targetReps: function(data) {
				if(!!$scope.effectiveMax && !!$scope.dto.weight && !!$scope.dto.lift) {
					$scope.targetReps = FiveThreeOneCalculator.repgoal($scope.effectiveMax[$scope.dto.lift], $scope.dto.weight);
				}
			}
		};

		$scope.fillInFormFromPreviousData = function(date, life) {
			getPreviousPersonalRecord().then(function(data) {
				CalculatedValues.lift(data);
				CalculatedValues.weight(data);
				CalculatedValues.reps(data);
			});
		};

		$scope.$watch('dto.reps', function(dto) {
			if(angular.isUndefined(dto)) return;
			CalculatedValues.estimatedMax();
		}, true);

		$scope.$watch('dto.weight', function(dto) {
			if(angular.isUndefined(dto)) return;
			CalculatedValues.targetReps();
		}, true);

		$scope.$watch('dto.lift', function(lift) {
			if(angular.isUndefined(lift)) return;
			CalculatedValues.estimatedMax();
			CalculatedValues.targetReps();
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
			if(isNew) {
				getExistingPersonalRecord();
			} else {
				generateNewPersonalRecordDto();
			}
		})();

	});

});

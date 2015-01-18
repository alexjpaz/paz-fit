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

				var nextLiftPromises = [];

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

			getEffectiveMax();
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
			var steps = [85,90,95];

			self = {};
			self.next = function(currentStep) {
				currentStep = Math.round((currentStep*100)/5)*5;

				var step = steps[0];
				for(var i=0;i<steps.length;i++) {
					if(currentStep === steps[i]) {
						step = steps[(i+1)%steps.length];
					}
				}
				step /= 100;
				return step;
			};

			return self;
		})();

		var CalculatedValues = {
			lift: function(data) {
				if(!$scope.key && data.latest.lift && !$scope.prEditForm.lift) {
					var nextLift = LiftProgressionChain.next(data.latest.lift);
					$scope.dto.lift = nextLift;
				}
			},
			weight: function(data) {
				if(!$scope.key && !$scope.prEditForm.weight.$dirty && !!$scope.effectiveMax && data.previous) {
					var liftMax = $scope.effectiveMax[data.previous.lift];
					var pct = data.previous.weight / liftMax;

					var nextPct = PercentageProgressionMap.next(pct);

					$scope.dto.weight = FiveThreeOneCalculator.roundTo(liftMax * nextPct, 5);
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
			},
			lastAttempt: function(data) {
				if(!!data) {
				$scope.lastAttempt = data;
				$scope.lastAttemptEstMax = FiveThreeOneCalculator.max(data.weight, data.reps);
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
			
			PersonalRecordDao.findLastAttempt($scope.dto.lift, $scope.dto.weight, dto.date).then(function(records) {
				console.debug('lo', records)
				CalculatedValues.lastAttempt(records[0]);
			});
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

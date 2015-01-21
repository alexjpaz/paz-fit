angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-tools-sheets', function($scope, FiveThreeOneCalculator, PersonalRecordDao, $routeParams, MaxesDao) {

		/** @var m model */
		$scope.m = {};

		var r = $scope.r = $routeParams;

		if(r.latestMax) {

		} else {

		}

		$scope.m = {
			fiveMonths: {
				increment: 5,
				cycles: 5
			},
			cycle: {
				p: +r.p,
				d: +r.d,
				b: +r.b,
				s: +r.s,
				pa: [],
				da: [],
				ba: [],
				sa: [],
			}
		};

		$scope.useMax = function(lift) {
			$scope.m.fiveMonths.max = +$scope.r[lift[0]];
		};

		$scope.$watch('m.fiveMonths', function(fiveMonths) {
			var lifts = {};

			for(var i=0;i<fiveMonths.cycles;i++) {
				lifts['lift'+i] = fiveMonths.max+(fiveMonths.increment*i);
			}

			$scope.projectedMaxes = $.param(lifts);
		}, true);

		$scope.$watch('m.cycle', function(cycle) {
			$scope.cycleParams = $.param(cycle, true);
		},true);
	});
});


angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-tools-sheets', function($scope, FiveThreeOneCalculator, PersonalRecordDao) {
		$scope.m = {
			fiveMonths: {
				increment: 5,
				cycles: 5
			}
		};
		$scope.$watch('m.fiveMonths', function(fiveMonths) {
			var lifts = {};

			for(var i=0;i<5;i++) {
				lifts['lift'+i] = fiveMonths.max+(fiveMonths.increment*i);
			}

			$scope.projectedMaxes = $.param(lifts);
		}, true);
	});
});


angular.module('app').filter('roundTo', function(FiveThreeOneCalculator) {
	return function(input, step) {
		var output;

		try {
			output = FiveThreeOneCalculator.roundTo(input, step);
		} catch(e) {
		}

		return output;
	};
});

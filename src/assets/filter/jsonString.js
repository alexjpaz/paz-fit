angular.module('app').filter('jsonString', function() {
	return function(input) {
		var output;

		try {
			output = JSON.stringify(input);
		} catch(e) {
		}

		return output;
	};
});

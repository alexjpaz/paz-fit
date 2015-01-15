angular.module('app').filter('paramString', function() {
	return function(input) {
		var output;

		try {
			output = $.param(input, true);
		} catch(e) {
		}

		return output;
	};
});

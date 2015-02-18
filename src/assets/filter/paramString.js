angular.module('app').filter('paramString', function() {
	return function(input) {
		var output;

		if(!!input) {
			try {
				output = $.param(input, true);
			} catch(e) {

			}
		}

		return output;
	};
});

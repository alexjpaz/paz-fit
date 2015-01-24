angular.module('app').filter('eachLift', function(ApplicationEnum) {
	return function(input, transclude) {
		if(angular.isUndefined(input)) return;
		var output = null;	

		if(transclude) { 
			output = [];
		} else {
			output = {};
			angular.forEach(ApplicationEnum.LIFT, function(lift) {
				output[lift] = input[lift];
			});
		}
		
		return output;
	};
});

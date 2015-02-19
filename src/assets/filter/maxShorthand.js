angular.module('app').filter('maxShorthand', function(Profile) {
	return function(input) {
		var output;

		try {
			var liftOrder = Profile.get('lift_order');

			var maxes = [];
			angular.forEach(liftOrder, function(lift, i) {
				maxes[i] = input[lift];
			});
			output = maxes.join('-');
		} catch(e) {

		}

		return output;
	};
});

angular.module('app').config(function($filterProvider) {
	$filterProvider.register('BitToTrueFalse', function() {
		function BitToTrueFalse(value) {
			return +value == "1" ? true : false;  
		}
		
		return BitToTrueFalse;
	});
});

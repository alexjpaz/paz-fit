angular.module('app').config(function($filterProvider) {
	$filterProvider.register('naturalIntegerSort', function() {
		var naturalSort = function(array, key) {
			
			var order = '+';
			
			if(/^[+-]/.test(key)) {
				order = key[0];
				key = key.slice(1);
			}
			
			var sortedArray = array.sort(function(a, b) {
				if(order == "+") {
					return +(a[key]) > +(b[key]);
				} else {
					return +(a[key]) < +(b[key]);
				}
			});
			
			return array;
		};
		
		return naturalSort;
	});
});

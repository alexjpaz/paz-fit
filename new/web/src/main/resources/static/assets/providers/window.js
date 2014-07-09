angular.module('app').config(function($provide) {
	$provide.factory('jQuery', function() {
		return window.$;
	});

	$provide.factory('moment', function() {
		return window.moment;
	});

	$provide.factory('d3', function() {
		var d3 = window.d3;	
		return d3;
	});
});

angular.module('app').config(function($provide) {
	$provide.factory('ApplicationEnumResource', function($resource) {
		return $resource('/system/enum');
	});
});


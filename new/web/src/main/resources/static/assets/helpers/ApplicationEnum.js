angular.module('app').config(function($provide) {
	$provide.factory('ApplicationEnum', function(ApplicationEnumResource) {
		var ApplicationEnumSingleton = {};

		ApplicationEnumSingleton = ApplicationEnumResource.get(); 

		return ApplicationEnumSingleton;
	});
});


angular.module('app').config(function($provide, AppConfig) {

	$provide.factory('BioBrokerEndpoint', function($resource) {
		var url = AppConfig.bioBrokerUrl + '/endpoint';
		return $resource(url);
	});
});

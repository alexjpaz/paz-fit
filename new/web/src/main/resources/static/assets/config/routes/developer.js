angular.module('app').config(function(RouteScreenProvider) {
	RouteScreenProvider.when('/developer','developer/index');
	RouteScreenProvider.whenWildcard('/developer/:screen','developer/:screen');
});

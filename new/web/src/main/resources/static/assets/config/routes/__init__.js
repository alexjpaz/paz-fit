angular.module('app').config(function(RouteScreenProvider) {
	RouteScreenProvider.redirect('/','/dashboard');
	RouteScreenProvider.when('/dashboard', 'system/dashboard');
	RouteScreenProvider.when('/error/:errorCode','system/error');
});

angular.module('app').config(function(RouteScreenProvider) {
	RouteScreenProvider.when('/watcher','watcher/index');
	RouteScreenProvider.redirect('/watcher/:name','/watcher/:name/detail');
	RouteScreenProvider.when('/watcher/:name/detail','watcher/detail');
	RouteScreenProvider.when('/watcher/:name/request','watcher/request');
	RouteScreenProvider.when('/watcher/:name/response','watcher/response');
	RouteScreenProvider.whenWildcard('/watcher/:screen','watcher/:screen');
});

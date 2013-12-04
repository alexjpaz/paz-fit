angular.module('app').config(function(RouteBuilderProvider) {
	var RouteBuilder = RouteBuilderProvider.$get();
	RouteBuilder.when('/dashboard', 'dashboard');
	RouteBuilder.when('/tools/plate-calculator', 'tools/plate-calculator');
	RouteBuilder.when('/tools/rep-goal', 'tools/rep-goal');
	RouteBuilder.when('/profile', 'profile/main');
	RouteBuilder.when('/profile/personal-record', 'profile/personal-record');
	RouteBuilder.when('/profile/personal-record/add', 'profile/personal-record-add');
});


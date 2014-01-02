angular.module('app').config(function(RouteBuilderProvider) {
	var RouteBuilder = RouteBuilderProvider.$get();
	RouteBuilder.redirect('/', '/profile');
	RouteBuilder.when('/dashboard', 'dashboard');
	RouteBuilder.when('/tools/plate-calculator', 'tools/plate-calculator');
	RouteBuilder.when('/tools/rep-goal', 'tools/rep-goal');
	RouteBuilder.when('/profile', 'profile/main');
	RouteBuilder.when('/profile/personal-record', 'profile/personal-record/list');
	RouteBuilder.when('/profile/personal-record/add', 'profile/personal-record/add');
	RouteBuilder.when('/profile/personal-record/edit', 'profile/personal-record/edit');
	RouteBuilder.when('/profile/maxes', 'profile/maxes/list');
	RouteBuilder.when('/profile/maxes/edit', 'profile/maxes/edit');
	RouteBuilder.when('/profile/note', 'profile/note/list');
	RouteBuilder.when('/profile/note/edit', 'profile/note/edit');
	RouteBuilder.when('/profile/day/:date', 'profile/day/view');
});


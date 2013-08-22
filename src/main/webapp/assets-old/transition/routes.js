(function(angular) {
	var routes = angular.module('app.routes', ['app.utils.builders']);
		routes.run(function($rootScope, $templateCache) {
					console.warn("Template caching is disabled")
				   $rootScope.$on('$viewContentLoaded', function() {
				      $templateCache.removeAll();
				   });
			});

	routes.config(function(routeBuilderProvider, $locationProvider){
		var RouteBuilder = routeBuilderProvider.getBuilder();
		
	    $locationProvider.html5Mode(false);
//	    $locationProvider.hashPrefix = '!';

	    RouteBuilder.redirect('/','/user');
		
		RouteBuilder.match('/dashboard','dashboard/index');
		
		RouteBuilder.match('/user','user/index');
		RouteBuilder.match('/user/:userId','user/detail');
		RouteBuilder.match('/user/:userId/properties','user/properties');
		
		RouteBuilder.match('/submission','submission/index');
		RouteBuilder.redirect('/submission/:submissionId','/submission/:submissionId/details');
		RouteBuilder.match('/submission/:submissionId/details','submission/details');
		
		RouteBuilder.match('/help','layout/app-help');
		RouteBuilder.match('/error/:errorCode','error/index');
		
		RouteBuilder.otherwise('/error/404');
		
		
	});
	
})(angular);

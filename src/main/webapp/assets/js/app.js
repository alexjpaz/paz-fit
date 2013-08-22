(function(angular){
	
	depend = [];
	depend.push('components/layout');
	depend.push('components/common');
	depend.push('components/user');
	depend.push('components/submission');
	
	depend.push('resources/rest');
	
	depend.push('utils/helpers');
	depend.push('utils/factory');
	
	
	
	var app = angular.module('app', depend);
	
	app.config(function(RouteBuilderProvider) {
		var RouteBuilder = RouteBuilderProvider.$get();
		
//		RouteBuilder.redirect('/','/dashboard');
		
		RouteBuilder.when('/dashboard', 'dashboard');
		
		RouteBuilder.when('/user', 'user');
		RouteBuilder.when('/user/:userId', 'user-detail');
		RouteBuilder.when('/user/:userId/properties','user-properties');
		
		
		RouteBuilder.when('/submission', 'submission');
		RouteBuilder.redirect('/submission/:submissionId','/submission/:submissionId/details');
		RouteBuilder.when('/submission/:submissionId/details','submission-details');
		
		RouteBuilder.when('/error/:errorCode','error/index');
		
//		RouteBuilder.otherwise('/error/404');
		
	});

})(angular);
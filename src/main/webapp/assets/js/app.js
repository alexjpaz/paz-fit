(function(angular){
	
	depend = [];
	depend.push('components/layout');
	depend.push('components/common');
	depend.push('components/cycle');
	
	depend.push('resources/rest');
	
	depend.push('utils/helpers');
	depend.push('utils/factory');
	
	var app = angular.module('app', depend);
	
	app.config(function(RouteBuilderProvider) {
		var RouteBuilder = RouteBuilderProvider.$get();
		
//		RouteBuilder.redirect('/','/dashboard');
		
		RouteBuilder.when('/dashboard', 'dashboard');

		RouteBuilder.when('/error/:errorCode','error/index');
		
//		RouteBuilder.otherwise('/error/404');
		
	});

})(angular);
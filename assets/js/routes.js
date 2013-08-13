(function(angular) {
	var routes = angular.module('routes', []);
	
	routes.constant('ConfigTemplateUtil', {
		resolve: function(turl) {
			return '/assets/partials/'+turl+'.html';
		}
	});
	
	routes.provider('routeBuilder', function($routeProvider, ConfigTemplateUtil) {
		function RouteBuilder() {
			this.match = function(urlPattern, templateUrl, args) {
				turl = ConfigTemplateUtil.resolve(templateUrl);
				$routeProvider.when(urlPattern, { templateUrl: turl, reloadOnSearch: false, controller: angular.noop });
			};
			
			this.redirect = function(urlPattern, redirectTo) {
				$routeProvider.when(urlPattern, {redirectTo:redirectTo});
			};
			
			this.otherwise = function(defaultRoute) {
				$routeProvider.otherwise({redirectTo:defaultRoute});
			};			
		}
		
		this.getBuilder = function() {
			return new RouteBuilder();
		};
		
		this.$get = function() {
			return {};
		};
	});

	routes.config(function(routeBuilderProvider, $locationProvider){
		var RouteBuilder = routeBuilderProvider.getBuilder();
		$locationProvider.html5Mode(false);
		
		RouteBuilder.redirect('/','/dashboard');
		
		RouteBuilder.match('/dashboard','dashboard/index');
		
		RouteBuilder.match('/day','day/index');
		
		RouteBuilder.otherwise('/error/404');
	});
	

	
})(angular);

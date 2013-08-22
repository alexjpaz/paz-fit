(function(angular){
	var debug = angular.module('debug', ['app.utils.builders']);
	
	debug.config(function(routeBuilderProvider, componentBuilderProvider) {
		var RouteBuilder = routeBuilderProvider.getBuilder();
		var ComponentBuilder = componentBuilderProvider.getBuilder();
		
		RouteBuilder.match('/debug', 'debug/index');
		RouteBuilder.match('/debug/:page', 'debug/index');
		
		ComponentBuilder.directive('cDebugView', function() {
			return {
				controller: function($scope, $element, $compile, $routeParams) {
					var el = $compile("<c-debug-"+$routeParams.page+'>')($scope);
					$element.append(el);
				}
			}
		});
		
		ComponentBuilder.component('cDebugUser', 'debug/c-debug-user', function($scope, SecurityResource) {
			$scope.lol = SecurityResource.get();
		});
		
	});
	
})(angular);
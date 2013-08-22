(function(angular){
	var factory = angular.module('utils/factory', ['utils/helpers','utils/factory-resource']);
	
	factory.provider('componentFactory', function($compileProvider, StringUtilProvider) {
		var StringUtil = StringUtilProvider.$get();
		
		function ComponentFactory(component_name, controllerFn) {
			
			this.config = {
				templateUrlBase: 'components'
			};
			
			this.build = function(component_name, controllerFn) {
				var componentTemplateUrl =  this.config.templateUrlBase+"/"+component_name;
				
				var componentDirectiveFactory = function(TemplateUtil) {
					var componentDirectiveObj = {
						restrict: 'EA',
						scope: true,
						templateUrl: TemplateUtil.resolve(componentTemplateUrl),
						replace: true,
						controller: controllerFn
					};
					
					return componentDirectiveObj;
				}

				var componentName = StringUtil.toCamelCase(component_name);
				$compileProvider.directive(componentName, componentDirectiveFactory);
			};
		}
		
		this.$get = function() {
			return new ComponentFactory();
		};
	});
	
	factory.provider('RouteBuilder', function($routeProvider, TemplateUtilProvider) {
		var TemplateUtil = TemplateUtilProvider.$get();
		
		function RouteBuilder() {
			this.config = {
				templateUrlBase: 'screen'
			};
			
			this.when = function(urlPattern, templateUrl) {
				templateUrl = TemplateUtil.resolve(this.config.templateUrlBase+"/"+templateUrl);
				$routeProvider.when(urlPattern, {
					templateUrl: templateUrl,
					reloadOnSearch: false
				});
			};
			
			this.redirect = function(urlPattern, redirectUrl) {
				$routeProvider.when(urlPattern, {redirectTo: redirectUrl});
			};
			
			this.otherwise = function(redirectUrl) {
				$routeProvider.otherwise({redirectTo: redirectUrl});
			}
		}
		
		this.$get = function() {
			return new RouteBuilder();
		}
	});
	
	var resourceFactory = angular.module('utils/factory-resource', ['ngResource']);
	
	factory.provider('resourceFactory', function($provide) {
		function ResourceBuilder ($provide) {
			this.build = function(name, resourceUrl) {
				function resourceFactory($resource) {
					return $resource('rest'+resourceUrl);
				}
				
				$provide.factory(name, resourceFactory);
			}
		}
		
		this.$get = function() {
			return new ResourceBuilder($provide);
		};
	});
	
})(angular);
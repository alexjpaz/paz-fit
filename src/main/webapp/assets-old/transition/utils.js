(function(angular, $) {
	var utils = angular.module('app.utils', ['app.utils','app.utils.exceptions','app.utils.builders']);
	
	utils.constant('ConfigTemplateUtil', {
		resolve: function(turl) {
			return 'assets/partials/'+turl+'.html';
		}
	});
	
	utils.service('TemplateUtil', function(ConfigTemplateUtil) {
		this.resolve = ConfigTemplateUtil.resolve;
	});
	
	utils.service('BioappsUtil', function() {
		function checkAbisObj(abis) {
			if(abis === undefined || abis.systems === undefined) {
				throw Error('InvalidAbisObj:  check the bioapp data');
			}
		}
		
		this.eachHost = function(abis, eachFn) {
			checkAbisObj(abis);
			
			angular.forEach(abis.systems, function (system) {
				angular.forEach(system.assemblies, function(assembly) {
					angular.forEach(assembly.hosts, function(host) {
						eachFn(system, assembly, host);
					});
				});
			});
		}
		
		this.eachAssembly = function(abis, mapFn) {
			checkAbisObj(abis);
			
			angular.forEach(abis.systems, function (system) {
				angular.forEach(system.assemblies, function(assembly) {
					mapFn(system, assembly);
				});
			});
		};
		
		this.eachSystem = function(abis, mapFn) {
			checkAbisObj(abis);
			
			angular.forEach(abis.systems, function (system) {
					mapFn(system);
			});
		};
	});
	
	utils.service('StringUtil', function() {
		this.toDash = function(string) {
			return string.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
		}
	});
	
	utils.factory('Enum', function() {
		function Enum() {
			for(index in arguments) {
				this[arguments[index]] = arguments[index];
			}
		}
		
		return Enum;
	});
	
	var builders = angular.module('app.utils.builders', ['app.utils','ngResource']); 
	
	builders.provider('componentBuilder', function($compileProvider) {
		function ComponentBuilder(compileProvider) {
			var __ = {
				$cp: compileProvider,
				extend: angular.extend
			}
			
			function checkTemplateUrl(templateUrl) {
				if(!typeof templateUrl == 'string' || !templateUrl instanceof String) {
					throw Error("Invalid Argument: templateUrl is not a string.")
				}
				
				return true;
			};
			
			this.component = function(componentName, componentTemplateUrl, componentControllerFn, componentScopeObj, directiveFactoryObj) {
				this.widget(componentName, componentTemplateUrl, {
					controller: componentControllerFn
				});
			};
			
			this.widget = function(widgetName, widgetTemplateUrl, directiveFactoryObj) {
				checkTemplateUrl(widgetTemplateUrl);
				
				widgetTemplateUrl = widgetTemplateUrl || 'widget/'+widgetName;
				
				
				
				var widgetDirectiveFactory = function(TemplateUtil) {
					var widgetDirectiveFactoryObj = {
						restrict: 'EA',
						scope: true,
						replace: true,
						templateUrl: TemplateUtil.resolve(widgetTemplateUrl)
					};
					
					__.extend(widgetDirectiveFactoryObj, directiveFactoryObj);
					
					return widgetDirectiveFactoryObj;
				};
				
				this.directive(widgetName, widgetDirectiveFactory);
			};
			
			this.block = function(blockName, blockTemplateUrl, directiveFactoryObj) {
				checkTemplateUrl(blockTemplateUrl);
				
				var blockDirectiveFactory = function(TemplateUtil) {
					var blockDirectiveFactoryObj = {
						templateUrl: TemplateUtil.resolve(blockTemplateUrl)
					};
					
					__.extend(blockDirectiveFactoryObj, directiveFactoryObj);
					
					return blockDirectiveFactoryObj;
				}
				
				this.directive(blockName, blockDirectiveFactory);
			};
			
			this.directive = function(directiveName, directiveFactory) {
				compileProvider.directive(directiveName, directiveFactory);
			};
		}
		
		this.getBuilder = function() {
			return new ComponentBuilder($compileProvider);
		}
		
		this.$get = function() {
			return {};
		};
	});
	
	builders.provider('routeBuilder', function($routeProvider, ConfigTemplateUtil) {
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
	
	builders.provider('resourceBuilder', function($provide) {
		function ResourceBuilder ($provide) {
			this.path = function(name, resourceUrl) {
				function resourceFactory($resource) {
					return $resource('rest'+resourceUrl);
				}
				
				$provide.factory(name, resourceFactory);
			}
		}
		
		this.getBuilder = function() {
			return new ResourceBuilder($provide);
		};
		
		this.$get = function() {
			
		};
	});
	
	var exceptions = angular.module('app.utils.exceptions', []);
	
	exceptions.factory('ServerMonitorException', function() {
		
	});
	

	
})(angular, $);

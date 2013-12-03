angular.module('app',['ngResource','ngRoute'])
.config(function($provide, $compileProvider, $routeProvider) { 
	$provide.provider('DirectiveFactory', function() {
	  function ComponentFactory() {
		this.build = function(component_name, controllerDef) {

			var componentFactoryObjFn = function() {
				var componentFactoryObj = {
					restrict: 'EA',
					template: '/assets/components/'+component_name+'.html',
					controller: controllerDef,
				};

				return componentFactoryObj;
			};

			var componentName = component_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(componentName, componentFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ComponentFactory();
	  };
	});

	$provide.provider('ComponentFactory', function() {
	  function ComponentFactory() {
		this.build = function(component_name, controllerDef) {

			var componentFactoryObjFn = function() {
				var componentFactoryObj = {
					restrict: 'EA',
					templateUrl: '/assets/components/'+component_name+'.html',
					controller: controllerDef,
					scope: true,
					compile: function() {
						head.load('/assets/components/'+component_name+'.css');
					},
				};

				return componentFactoryObj;
			};

			var componentName = component_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(componentName, componentFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ComponentFactory();
	  };
	});

	$provide.provider('ScreenFactory', function() {
	  function ScreenFactory() {
		this.build = function(screen_name, controllerDef) {

			var screenFactoryObjFn = function() {
				var screenFactoryObj = {
					restrict: 'C',
					controller: controllerDef,
					compile: function() {
						head.load('/assets/components/'+component_name+'.css');
					},
				};

				return screenFactoryObj;
			};

			var screenName = component_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(screenName, screenFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ScreenFactory();
	  };
	});
})
.config(function($provide) {
	$provide.factory('Resource', function($resource) {
		return $resource('/rest/:model/:id');
	});

	$provide.factory('Api', function($resource) {
		return $resource('/api/:path/:subpath');
	});
})
.config(function($routeProvider) {

	$routeProvider.when('/dashboard', { templateUrl: '/assets/screen/dashboard.html' } );
})
.config(function($provide, ComponentFactoryProvider, ScreenFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	var ScreenFactory = ScreenFactoryProvider.$get();

	ComponentFactory.build('app-container', function($scope) {
		$scope.hello = 'world';
	});


	ComponentFactory.build('plate-table', function($scope, Resource, Api) {
		$scope.sets = Api.get({
			path: 'table',
			subpath: 'week',
			max: 500,
			week: 531
		});
	});
	ComponentFactory.build('test-one', function($scope, Resource, Api) {
		$scope.max = Resource.get({
			model: 'Max',
		});

		$scope.pr = Resource.get({
			model: 'PersonalRecord',
		});

		$scope.table = Api.get({
			path: 'table',
			subpath: 'week',
			max: 500,
			week: 531
		});
	});

	ScreenFactory.build('screen-dashboard', function() {
	});
});

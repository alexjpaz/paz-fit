angular.module('app',['ngResource','ngRoute'])
.config(function($provide, $compileProvider) { 
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

})
.config(function($provide) {
	$provide.factory('Resource', function($resource) {
		return $resource('/rest/:model/:id');
	});

	$provide.factory('Api', function($resource) {
		return $resource('/api/:path/:subpath');
	});
})
.config(function($provide, ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('app-container', function($scope) {
		$scope.hello = 'world';
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

});

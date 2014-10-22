

angular.module('app',['ngResource','ngRoute','helper','resources'])
.config(function($provide){
	$provide.factory('App', function($rootScope, ApplicationEnum) {
		function App() {
		}
		$rootScope.ApplicationEnum = ApplicationEnum;
	});
})


.config(function($provide, ComponentFactoryProvider, ScreenFactoryProvider) {

	var ComponentFactory = ComponentFactoryProvider.$get();
	var ScreenFactory = ScreenFactoryProvider.$get();

	ComponentFactory.build('app-container', function($scope) {
		$scope.hello = 'world';
	});
	
	ComponentFactory.build('nav-top', function($scope) {
	});

	ComponentFactory.build('test-one', function($scope, Resource, Api) {

	});

	ScreenFactory.build('screen-dashboard', function() {
	});
})


.config(function($injector, ScreenFactoryProvider, ComponentFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	var ComponentFactory = ComponentFactoryProvider.$get();

	angular.module('app').lazy = {
		ScreenFactory: ScreenFactory.build,
		component: ComponentFactory.build
        //controller: $controllerProvider.register,
        //directive: $compileProvider.directive,
        //filter: $filterProvider.register,
        //factory: $provide.factory,
        //service: $provide.service,
        //animation: $animationProvider.register
    };

})
.run(function($injector) {
	$injector.get('App');
})

.run(function($http, $rootScope) {
	$http.get('/api/env').then(function(rsp) {
		$rootScope.env = rsp.data;
	});
});

/*
 * Module: helper
 *
 */
angular.module('resources',[])
.config(function(){})
.run(function(){})

/*
 * Module: helper
 *
 */
angular.module('helper',[])
.config(function(){})
.run(function(){})

angular.module('app',['ngResource','ngRoute','helper','resources'])
.config(function($provide){
	$provide.factory('App', function($rootScope, ApplicationEnum) {
		function App() {
		}
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
.config(function($provide, SchemaManagerProvider) {
	SchemaManagerProvider.addStore({
		name: '_metadata',
		indexes: [
			{keyPath: 'store'},
			{keyPath: 'modified'},
		]
	});

	SchemaManagerProvider.addStore({
		name: 'PersonalRecord',
		keyPath: 'date',
		indexes: [
			{keyPath: 'reps', type: 'INTEGER'},
			{keyPath: 'weight', type: 'INTEGER'}
		]
	});

	SchemaManagerProvider.addStore({
		name: 'Max',
		keyPath: 'date',
		indexes: [
			{keyPath: 'press',type: 'INTEGER'},
			{keyPath: 'deadlift',type: 'INTEGER'},
			{keyPath: 'bench',type: 'INTEGER'},
			{keyPath: 'squat',type: 'INTEGER'},
			{
				keyPath: 'date',
				unique: true,
				type: 'DATE'
			},  
		]
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
.run(function(App, DatastoreSync, $window){
	DatastoreSync.pull();

	window.onbeforeunload = function() {
		DatastoreSync.push();
		return null;
	}
});

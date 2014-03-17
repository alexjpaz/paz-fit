angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-note-list', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 
});

});


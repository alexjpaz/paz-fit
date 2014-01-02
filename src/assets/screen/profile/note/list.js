angular.module('app').lazy.ScreenFactory('screen-profile-note-list', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 
});


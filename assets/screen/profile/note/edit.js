angular.module('app').lazy.ScreenFactory('screen-profile-note-edit', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 
});

angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-profile-options', function($scope, Profile) {
		$scope.p = Profile.get();
		
		$scope.save = function() {
			Profile.save($scope.p);
		};
	});
});


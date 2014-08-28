angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('a-btn', {
			scope: {'href':'@','i':'@'},
			transclude: true,
			controller: function($scope) {
				$scope.btnMods = $scope.btnMods || 'btn-default';
			}
	});
}); 

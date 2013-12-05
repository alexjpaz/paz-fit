App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, Max) {
		Max.get(function(response) {
			$scope.maxes = response.list.Max[0];
		});
	});
});

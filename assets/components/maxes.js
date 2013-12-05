App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, GenericRepository) {
		Max.get(function(response) {
			$scope.maxes = response.list.Max[0];
		});
	});
});

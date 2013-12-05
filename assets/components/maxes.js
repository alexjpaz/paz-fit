App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, RestRepository) {
		function getMaxes(action) {
			RestRepository[action]('Max').then(function(response) {
				console.log(response);
				$scope.maxes = response.list.Max[0];
			});
		}

		$scope.refresh = function() {
			getMaxes('refresh');
		};

		getMaxes('find');
	});
});

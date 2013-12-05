App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, RestRepository) {
		RestRepository.find('Max').then(function(response) {
			$scope.maxes = response.list.Max[0];
		});

		$scope.refresh = function() {
			RestRepository.refresh('Max').then(function(entity) {
				$scope.dto = entity;
			});
		};

	});
});

App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-add', function($scope, Database) {
		$scope.dto = {};
		$scope.addRecord = function(record) {
			Database.put('PersonalRecord', $scope.dto);
		};
	});
});

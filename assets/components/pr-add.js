App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-add', function($scope, Database) {
		$scope.dto = {
			date: moment().format('YYYY-MM-DD')
		};
		$scope.addRecord = function(record) {
			Database.put('PersonalRecord', $scope.dto);
		};
	});
});

(function(angular){
	var user = angular.module('components/submission', ['utils/factory']);
	
	user.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.config.templateUrlBase = 'components/submission';

		ComponentFactory.build('c-submission-list', function($scope, $routeParams, Submission) {
			$scope.getSubmissions = function(getParams) {
				$scope.submissions = Submission.get();
			};
			
			$scope.getSubmissions($routeParams);
			console.log('hi')
		});
		
		ComponentFactory.build('c-submission', function($scope, $routeParams, Submission) {
			$scope.getSubmissions = function(getParams) {
				$scope.submission = Submission.get(getParams);
			};
			
			$scope.getSubmissions($routeParams);
		});
	});
})(angular);
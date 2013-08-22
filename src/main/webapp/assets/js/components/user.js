(function(angular){
	var user = angular.module('components/user', ['utils/factory']);
	
	user.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.config.templateUrlBase = 'components/user';

		ComponentFactory.build('c-user-search', function($scope, User) {
			$scope.users = User.get();
		});
		
		
		ComponentFactory.build('c-user-detail', function($scope, $routeParams, User) {
			$scope.getUser = function(getParams) {
				$scope.user = User.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUser($routeParams);
		});
		
		ComponentFactory.build('c-user-properties', function($scope, $routeParams, UserProperties) {
			$scope.getUseProperties = function(getParams) {
				$scope.userProperties = UserProperties.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUseProperties($routeParams);
		});
		
		ComponentFactory.build('c-user-aps', function($scope, $routeParams, UserApplicationProfile) {
			$scope.getUserApplicationProfiles = function(getParams) {
				$scope.userApplicationProfiles = UserApplicationProfile.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUserApplicationProfiles($routeParams);
		});

	});
})(angular);
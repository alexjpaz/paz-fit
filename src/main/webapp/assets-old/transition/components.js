(function(angular) {
	var com = angular.module('app.components', ['app.utils.builders']);
	
	com.config(function(componentBuilderProvider) {
		var Builder = new componentBuilderProvider.getBuilder();
		
		Builder.directive('cBlock', function(TemplateUtil) {
			return {
				restrict: 'EA',
				templateUrl: TemplateUtil.resolve('components/c-block'),
				scope: {'title':'@'},
				transclude: true,
			}
		});
		
		Builder.widget('cWatcher', 'layout/app');
		Builder.component('cSidebar', 'layout/sidebar');
		Builder.component('cNavBar','layout/navbar');
		
		Builder.component('cOverlay', 'layout/overlay', function($rootScope, $element) {
			$rootScope.$on('cOverlay.dropdown', function(event, dropdownNameMenuElement) {
				$element.append(dropdownNameMenuElement);
			});
		});
		
		Builder.component('cUserSearch','user/c-user-search', function($scope, User) {
			$scope.users = User.get();
		});
		
		Builder.component('cUserDetail','user/c-user-detail', function($scope, $routeParams, User) {
			$scope.getUser = function(getParams) {
				$scope.user = User.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUser($routeParams);
		});
		
		Builder.component('cUserProperties','user/c-user-properties', function($scope, $routeParams, UserProperties) {
			$scope.getUseProperties = function(getParams) {
				$scope.userProperties = UserProperties.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUseProperties($routeParams);
		});
		
		Builder.component('cUserAps','user/c-user-aps', function($scope, $routeParams, UserApplicationProfile) {
			$scope.getUserApplicationProfiles = function(getParams) {
				$scope.userApplicationProfiles = UserApplicationProfile.get({
					userId: getParams.userId				
				});
			};
			
			$scope.getUserApplicationProfiles($routeParams);
		});
		
		Builder.component('cSystemUser', 'layout/c-system-user', function($scope, SecurityResource) {
			SecurityResource.get();
		});

		
		Builder.component('cSubmissionList','submission/c-submission-list', function($scope, $routeParams, Submission) {
			$scope.getSubmissions = function(getParams) {
				$scope.submissions = Submission.get();
			};
			
			$scope.getSubmissions($routeParams);
		});
		
		Builder.component('cSubmission','submission/c-submission', function($scope, $routeParams, Submission) {
			$scope.getSubmissions = function(getParams) {
				$scope.submission = Submission.get(getParams);
			};
			
			$scope.getSubmissions($routeParams);
		});
		
		Builder.component('cSystemUser', 'layout/c-system-user', function($scope, SecurityResource) {
			SecurityResource.get();
		});
	});
	
})(angular);

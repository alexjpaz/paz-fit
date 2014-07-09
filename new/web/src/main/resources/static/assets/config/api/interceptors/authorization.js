angular.module('app').config(function($provide, $httpProvider) {
	$httpProvider.interceptors.push('authorizationHttpInterceptor');
	$provide.factory('authorizationHttpInterceptor', function($q, $rootScope) {
		function AuthorizationHttpInterceptor() {

			this.responseError = function(rejection) {
				if(rejection.status == 401) {
					$rootScope.$broadcast('Security.unauthorized', rejection);
				}

				return $q.reject(rejection);	
			}

		}

		return new AuthorizationHttpInterceptor();
	});
});

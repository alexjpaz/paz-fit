angular.module('app').config(function($provide, $httpProvider) {
	$httpProvider.interceptors.push('resourceHttpInterceptor');
	$provide.factory('resourceHttpInterceptor', function($q, $rootScope) {
		function ResourceHttpInterceptor() {
			function DeterminBlockingCall(config, isRequest) {
				var isRestAndPost = (/rest\//).test(config.url) && (/POST/).test(config.method);
				
				if(isRequest && isRestAndPost) {
					$rootScope.App.uiBlocked = true;
				} else if(isRestAndPost) {
					$rootScope.App.uiBlocked = false; 
				}
			}

			this.request = function(config) {
				DeterminBlockingCall(config, true);
				
				return config || $q.when(config);
			}
			
			this.response = function(response) {
				DeterminBlockingCall(response.config, false);
				
				return response || $q.when(response);
			}
			
			this.requestError = function(rejection) {
				DeterminBlockingCall(rejection.config, false);
				
				return $q.reject(rejection);
			}
			
			this.responseError = function(rejection) {
				DeterminBlockingCall(rejection.config, false);
				
				return $q.reject(rejection);	
			}
		}
		
		return new ResourceHttpInterceptor();
	});
});

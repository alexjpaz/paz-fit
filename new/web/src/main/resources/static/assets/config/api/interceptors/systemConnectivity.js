angular.module('app').config(function($provide, $httpProvider) {
	$httpProvider.interceptors.push('systemConnectivityHttpInterceptor');
	$provide.factory('systemConnectivityHttpInterceptor', function($q, Session) {
		function SystemConnectivityHttpInterceptor() {

			this.responseError = function(rejection) {
				
				if(rejection.status == 0) {
					Session.activeConnection = false;
				}
				
				return $q.reject(rejection);	
			}
			
			this.response = function(response) {
				Session.lastHearbeat = new Date();
			
				if(!Session.activeConnection && response.status != 0) {
					Session.activeConnection = true;
				}
				
				return response || $q.when(response);
			}
		}
		
		return new SystemConnectivityHttpInterceptor();
	});
});

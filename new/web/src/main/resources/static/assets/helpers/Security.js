angular.module('app').config(function($provide) {
	$provide.factory('Security', function($http, $rootScope) {
		function Security() {
			var _this = this;
			
			this.authenticate = function(credentials) {
				$http.post('rest/system/authenticate').then(function(response) {
					console.log('authenticateResponse',response);
					_this.context = response.data;
				});

				var authenticatedCredentialsObj = {
					username: 'apaz',
					isAuthenticated: true,					
				};

				return authenticatedCredentialsObj;
			};

			this.$reload = function () {
				$http.get('rest/system/security').then(function(response) {
					_this.context = response.data;
				});
			};
			
			this.context = null;
		}
		
		var instance = new Security();
		
		instance.$reload();
		
		return instance;
	});
});
	
	//key.config(function($compileProvider,$injector, directiveFactoryProvider) {
		//var DirectiveFactory = directiveFactoryProvider.$get();
		
		//$compileProvider.directive('secRoleOnly', function(Security) {
			//return {
				//compile: function(element, attrs) {
					//var authorized = false;
					
					//var grantedRole = Security.context.authorities[attrs.secRolesOnly];
					
					//authorized = angular.isDefined(grantedRole);
					
					//if(authorized) {
						//element.remove();
					//}
				//}
			//};
		//});
		
	//});
	
	
	

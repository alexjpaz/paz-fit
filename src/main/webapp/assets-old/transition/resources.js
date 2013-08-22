(function(angular) {
	var resources = angular.module('app.resources', ['app.resources.rest','app.resources.system']);
	
	var rest = angular.module('app.resources.rest', ['app.utils.builders']);
	
	rest.config(function(resourceBuilderProvider) {
		var Builder = resourceBuilderProvider.getBuilder();
		
		Builder.path('User','/user/:userId');
		Builder.path('UserProperties', '/user/:userId/properties');
		Builder.path('UserApplicationProfile', '/user/:userId/application-profiles');
		
		Builder.path('Submission','/submission/:submissionId');
	});
	
	var system =  angular.module('app.resources.system', ['app.utils.builders']);

	system.config(function(resourceBuilderProvider) {
		var Builder = resourceBuilderProvider.getBuilder();
		
		Builder.path('SecurityResource','/system/security');
	});
	
})(angular);



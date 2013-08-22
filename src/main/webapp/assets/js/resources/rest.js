(function(angular) {
	var rest = angular.module('resources/rest', ['utils/factory']);
	
	rest.config(function(resourceFactoryProvider) {
		var ResourceFactory = resourceFactoryProvider.$get();
		
		ResourceFactory.build('User','/user/:userId');
		ResourceFactory.build('UserProperties', '/user/:userId/properties');
		ResourceFactory.build('UserApplicationProfile', '/user/:userId/application-profiles');
		
		ResourceFactory.build('Submission','/submission/:submissionId');
	});
	
})(angular);



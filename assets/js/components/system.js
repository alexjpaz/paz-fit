(function(angular){
	var user = angular.module('components/system', ['utils/factory']);
	
	user.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.config.templateUrlBase = 'components/system';

		ComponentFactory.build('c-system-user', function($scope, SecurityResource) {
				SecurityResource.get();
		});
			
		ComponentFactory.build('c-system-user', function($scope, SecurityResource) {
				SecurityResource.get();
		});
	});
})(angular);




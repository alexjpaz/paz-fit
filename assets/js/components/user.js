(function(angular){
	var user = angular.module('components/user', ['utils/factory']);
	
	user.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.config.templateUrlBase = 'components/user';


	});
})(angular);
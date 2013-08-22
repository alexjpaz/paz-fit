(function(angular){
	var layout = angular.module('components/layout', ['utils/factory']);
	
	layout.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.build('app-portal', function($scope) {
		});
		
	});
	
	layout.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		
		ComponentFactory.config.templateUrlBase = 'components/layout';
		
		ComponentFactory.build('c-sidebar');
		ComponentFactory.build('c-nav-bar');
		
		ComponentFactory.build('c-overlay', function($rootScope, $element) {
			$rootScope.$on('cOverlay.dropdown', function(event, dropdownNameMenuElement) {
				$element.append(dropdownNameMenuElement);
			});
		});
		
	});
	
	layout.config(function($compileProvider) {
	
		$compileProvider.directive('cBlock', function(TemplateUtil) {
			return {
				restrict: 'EA',
				templateUrl: TemplateUtil.resolve('components/layout/c-block'),
				scope: {'title':'@'},
				transclude: true,
			}
		});
	});
	
	layout.config(function(componentFactoryProvider) {
		ComponentFactory = componentFactoryProvider.$get();
		ComponentFactory.config.templateUrlBase = 'components/login';
		
		ComponentFactory.build('login', function($scope) {
			$scope.login = {
				user: 'useruser',
				password: 'password',
			}
		});
	});
	

	
})(angular);
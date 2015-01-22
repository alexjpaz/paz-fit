angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('tab', {
		scope: {'tab':'@'},
		replace: true,
		require: '^navTabs',
		transclude: true,
		link: function(scope, element, attrs, navTabsCtrl) {
			scope.navTabsCtrl = navTabsCtrl;
		}
	});
});
